

#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Wi-Fi credentials
#define WIFI_SSID "Airtel_airtel_9745205252"
#define WIFI_PASSWORD "20Fleming22"

// Firebase credentials
#define API_KEY "AIzaSyCcsOlEYrnlhSEYH9wF3NWG8j9gBENPbrE"
#define DATABASE_URL "https://smartpot-kashyap-default-rtdb.asia-southeast1.firebasedatabase.app/"

// Pin definitions
#define DHT_PIN 27
#define DS18B20_PIN 32
#define MOISTURE_PIN 34
#define LDR_PIN 35
#define WATER_LEVEL_PIN 33
#define MOTOR_PIN1 25
#define MOTOR_PIN2 26


// Objects and variables
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

DHT dht(DHT_PIN, DHT11);
OneWire oneWire(DS18B20_PIN);
DallasTemperature sensors(&oneWire);

bool signupOK = false;
float moisture_percentage = 0.0;
bool pumpActive = false;

void setup() {
    // Initialize pins
    pinMode(MOTOR_PIN1, OUTPUT);
    pinMode(MOTOR_PIN2, OUTPUT);

    // Start sensors
    sensors.begin();
    dht.begin();

    // Initialize serial communication
    Serial.begin(9600);

    // Connect to Wi-Fi and Firebase
    connect_wifi();
    connect_firebase();
}

void loop() 
{
    if (signupOK) 
    {
        soil_temp();
        atm_temp();
        soil_moisture();
        ldr_value();
        water_level();

        // Check moisture and activate water pump if necessary
        if (moisture_percentage < 30) 
        {
            water_pump();
        }
    }

    delay(5000); // Wait 5 seconds before the next loop
}

// Connect to Wi-Fi
void connect_wifi() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    unsigned long startAttemptTime = millis();

    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000)           // 10 seconds timeout
    { 
        Serial.print(".");
        delay(300);
    }

    if (WiFi.status() == WL_CONNECTED) 
    {
        Serial.println("\nConnected with IP: ");
        Serial.println(WiFi.localIP());
    } 
    else 
    {
        Serial.println("\nFailed to connect to Wi-Fi.");
        while (true);                                      // Halt execution
    }
}

// Connect to Firebase
void connect_firebase() {
    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;

    if (Firebase.signUp(&config, &auth, "", "")) 
    {
        Serial.println("Firebase SignUp successful");
        signupOK = true;
    } else {
        Serial.printf("Firebase SignUp failed: %s\n", config.signer.signupError.message.c_str());
    }

    config.token_status_callback = tokenStatusCallback;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
}

// Update Firebase
void updateFirebase(const char* path, float value) {
    if (!Firebase.RTDB.setFloat(&fbdo, path, value)) {
        Serial.printf("Failed to send data to %s: %s\n", path, fbdo.errorReason().c_str());
    }
}

// Soil temperature sensor
void soil_temp() 
{
  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0);

  if (isnan(temperature)) 
  {
      Serial.println("Failed to read soil temperature");
      return;
  }

    Serial.printf("Soil Temperature: %f °C\n", temperature);
    updateFirebase("/sensors/soil_temperature", temperature);
}

// Atmospheric temperature and humidity sensor
void atm_temp() {
    float t = dht.readTemperature();
    float h = dht.readHumidity();

    if (isnan(t) || isnan(h)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    Serial.printf("Atmospheric Temperature: %.2f °C, Humidity: %.2f%%\n", t, h);
    updateFirebase("/sensors/atm_temperature", t);
    updateFirebase("/sensors/humidity", h);
}

// Soil moisture sensor
void soil_moisture() {
    int sensor_analog = analogRead(MOISTURE_PIN);
    if (sensor_analog < 0 || sensor_analog > 4095) {
        Serial.println("Failed to read soil moisture");
        return;
    }

    moisture_percentage = 100 - ((sensor_analog / 4095.0) * 100);
    Serial.printf("Soil Moisture Percentage: %.2f%%\n", moisture_percentage);
    updateFirebase("/sensors/moisture", moisture_percentage);
}

// Light intensity sensor
void ldr_value() {
    int ldrValue = analogRead(LDR_PIN);
    if (ldrValue < 0 || ldrValue > 4095) {
        Serial.println("Failed to read light intensity");
        return;
    }

    Serial.printf("Sunlight Intensity: %d\n", ldrValue);
    updateFirebase("/sensors/light_intensity", ldrValue);
}

// Water level sensor
void water_level() {
    int waterLevelValue = analogRead(WATER_LEVEL_PIN);
    if (waterLevelValue < 0 || waterLevelValue > 4095) {
        Serial.println("Failed to read water level");
        return;
    }

    Serial.printf("Water Level: %d\n", waterLevelValue);
    String waterStatus = (waterLevelValue < 20) ? "Low" : "Normal";

    Firebase.RTDB.setString(&fbdo, "/sensors/water_level", waterStatus);
}

// Control water pump
void water_pump() {
    if (!pumpActive) {
        pumpActive = true;
        digitalWrite(MOTOR_PIN1, LOW);
        digitalWrite(MOTOR_PIN2, HIGH);
        Serial.println("Water pump activated");

        delay(8000);

        // Stop the pump
        digitalWrite(MOTOR_PIN1, LOW);
        digitalWrite(MOTOR_PIN2, LOW);
        pumpActive = false;
        Serial.println("Water pump deactivated");
    }
}
