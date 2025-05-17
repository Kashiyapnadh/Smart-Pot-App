![Cover Image](Assets/cover.png)

<h1 align="center">Smart Pot : An intelligent Plant Care Assistant </h1>

"here comes the badges"

Smart Pot is an intelligent plant care assistant that uses AI and IoT to help users monitor and interact with their tomato plants. The system combines a YOLOv5-based detection model, ESP32 with environmental sensors, and a mobile app with a built-in chatbot interface.

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🧠 Tech Stack](#-tech-stack)
- [📱 Screenshots](#-screenshots)
- [🛠️ Installation](#️-installation)
  - [🔌 Backend (Flask Server)](#-backend-flask-server)
  - [🔧 ESP32 (Sensor Upload)](#-esp32-sensor-upload)
  - [🍓 Raspberry Pi (YOLOv5 Deployment)](#-raspberry-pi-yolov5-deployment)
  - [📲 Mobile App (React Native)](#-mobile-app-react-native)
- [📊 Project Architecture](#-project-architecture)
- [✅ Testing](#-testing)
  - [LLM Chatbot](#llm-chatbot)
  - [YOLOv5 Model](#yolov5-model)
  - [Watering System](#watering-system)
- [📁 Folder Structure](#-folder-structure)
- [📈 Future Improvements](#-future-improvements)
- [👨‍💻 Authors](#-authors)
- [📜 License](#-license)

## 🚀 Features

- 🔍 **Plant Detection**: Identifies the plant using a YOLOv5 object detection model.
- 🌡️ **Sensor Monitoring**: Collects real-time light and moisture levels using an ESP32 microcontroller and uploads data to Firebase.
- 🤖 **Chatbot Interface**: A natural language chatbot (LLM-based) to interact with the plant and provide care suggestions.
- 📱 **React Native App**: Mobile front-end for users to view sensor data and chat with the Smart Pot.

---

## 🧠 Tech Stack

<table border="1">
  <tr>
    <th>Component</th>
    <th>Technology Used</th>
  </tr>
  <tr>
    <td>Object Detection</td>
    <td>YOLOv5 (PyTorch)</td>
  </tr>
  <tr>
    <td>Microcontroller</td>
    <td>ESP32 with Light & Moisture Sensors</td>
  </tr>
  <tr>
    <td>Cloud Database</td>
    <td>Firebase Realtime Database</td>
  </tr>
  <tr>
    <td>Backend Server</td>
    <td>Python (Fast API)</td>
  </tr>
  <tr>
    <td>Chatbot Model</td>
    <td>LLM via Distilled Bert Model</td>
  </tr>
  <tr>
    <td>Mobile App</td>
    <td>React Native (Expo)</td>
  </tr>
</table>

---

## 📱 Screenshots

"screenshots to be posted here"


## 🛠️ Installation

### 🔌 Backend (Flask Server)
### 🔧 ESP32 (Sensor Upload)
### 🍓 Raspberry Pi (YOLOv5 Deployment)
### 📲 Mobile App (React Native)
```
cd mobile-app
npm install
npx expo start
```

## 📊 Project Architecture
![Architecture Image](Assets/architecture.png)

## ✅ Testing
### LLM ChatBot
<table border="1">
  <tr>
    <th>Test Case</th>
    <th>Input</th>
    <th>Expected Output</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Query plant name</td>
    <td>"What's my plant?"</td>
    <td>"Tomato"</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>Ask moisture</td>
    <td>"Is my plant thirsty?"</td>
    <td>"Yes, soil is dry"</td>
    <td>✅</td>
  </tr>
</table>

### Yolov5 Model
### Watering System

## 📁 Folder Structure

SmartPot/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── esp32/
│   └── esp32_sensor.ino
├── raspberry-pi/
│   ├── detect.py
│   └── yolov5_model/
├── mobile-app/
│   ├── App.js
│   └── components/
├── docs/
│   └── testing.md
├── README.md


## Section 1 setting up the LLM-Model.

option one download pretrained model.
option two train it yourself

 python 3.11 is tested + discsalimer for untested versions
    
    
    create virtual env name chatbotenv
    and activate the virtual env
    navigate to chat-bot-server folder
    install requiremrnts .txt
    then 

option 1:


    run train_llm.py

option 2:

    download the pre trained model by running the script download.py

now the model is downloaded and and ready to use

    start the fast api server that accepts the queries from and forwards to it the llm model which then returns the output.
  // word it better later
  using this command
  uvicorn main:app --host 0.0.0.0 --reload

    now llm model is running in local host.


## Section 2 Mobile Application 
    