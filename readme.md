![Cover Image](Assets/cover.png)

<h1 align="center">Smart Pot : An intelligent Plant Care Assistant </h1>

<div align="center">

[![OS - Windows](https://img.shields.io/badge/OS-Windows-blue?logo=windows&logoColor=white)](https://www.microsoft.com/ "Go to Microsoft homepage")
<a href="https://www.linux.org/" title="Go to Linux homepage"><img src="https://img.shields.io/badge/OS-Linux-blue?logo=linux&logoColor=white" alt="OS - Linux"></a>

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/binoy-ce/Smart-Pot-App)
<a href="https://python.org" title="Go to Python homepage"><img src="https://img.shields.io/badge/Python-%3E=3.11-blue?logo=python&logoColor=white" alt="Made with Python"></a>
<a href="https://nodejs.org" title="Go to Node.js homepage"><img src="https://img.shields.io/badge/Node.js-%3E=23.8.0-blue?logo=node.js&logoColor=white" alt="Made with Node.js"></a>


</div>


Smart Pot is an intelligent plant care assistant that uses AI and IoT to help users monitor and interact with their tomato plants. The system combines a YOLOv5-based detection model, ESP32 with environmental sensors, and a mobile app with a built-in chatbot interface.

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🧠 Tech Stack](#-tech-stack)
- [📱 Screenshots](#-screenshots)
- [🛠️ Installation](#️-installation)
  - [🔌 Backend (FastAPI Server)](#-FastAPI-Server)
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
>⚠️ **Warning**: This project has been tested with Python 3.11. Functionality with other Python versions is not guaranteed — your mileage may vary.

>💡 **Recommendation**: It is strongly recommended to create a [Python virtual environment](https://docs.python.org/3/library/venv.html) before installing dependencies to avoid version conflicts and maintain a clean setup.

### 💬 FastAPI Server (Chatbot)
The chatbot backend uses FastAPI to serve an LLM-based model. You can either train the model yourself or download a pre-trained version.

#### 🧠 Option 1: Train the Model Yourself
1. Navigate to the `chat-bot-server` directory:
```
cd chat-bot-server
```
2. Install the required dependencies:
```
pip install -r requirements.txt
```
3. Run the training script to generate your own LLM model:
```
python train_llm.py
```
>⏱️ **Note**: Training may take a while depending on your hardware.

#### 📦 Option 2: Download Pre-trained Model
1. Navigate to the `chat-bot-server` directory:
```
cd chat-bot-server
```
2. Install the required dependencies:
```
pip install -r requirements.txt
```
3. Run the download script to fetch a pre-trained model:
```
python download.py
```
#### 🚀 Run the FastAPI Server
Once the model is ready (trained or downloaded), start the FastAPI server:
```
uvicorn main:app --host 0.0.0.0 --reload
```
The API will be available at `http://localhost:8000`.

### 🔧 ESP32 (Sensor Upload)
### 🍓 Raspberry Pi (YOLOv5 Deployment)
### 📲 Mobile App (React Native)
```
cd SmartPot
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

<img src="./Assets/folder strcuture.png" alt="folder structure"  width="200" >

## 📈 Future Improvements

- 🌿 **Fertilizer Recommendations**
Analyze plant growth stages and environmental data to suggest personalized fertilization schedules, improving yield and plant health.

- 🧪 **Nutrient Deficiency Detection**
Use computer vision to detect visual signs of nutrient stress (e.g., yellowing leaves) and alert users with corrective suggestions.

- 🌐 **Multi-Plant Support**
Allow users to manage and monitor multiple smart pots within the same app, each with unique sensor profiles and chat histories.

- 📤 **Data Export and Reports**
Enable users to generate monthly care logs, watering history, and sensor trends in downloadable PDF/CSV formats.

- 🔐 **User Profiles & Authentication**
Implement secure login and personalized dashboards, supporting multiple users per pot (e.g., families or research teams).

## 👨‍💻 Authors
- **Binoy C E** – App Developer
- **Alvis Sajith** - Backend Developer
- **AJ Kashyapnath** - AI/ML Developer
- **Ayush Baiju** - IOT Setup

## 📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it with attribution. :)

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