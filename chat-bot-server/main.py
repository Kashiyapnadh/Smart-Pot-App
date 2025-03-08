import socket
from fastapi import FastAPI
from prediction import predict  # Ensure correct import

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

@app.get("/run-script")
def run_python_script(sentence: str):
    response = predict(sentence)
    return response

@app.on_event("startup")
async def startup_event():
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    print("\n🚀 FastAPI server is starting...")
    print(f"🌍 Local IP Address: {local_ip}")
    print(f"📡 Access API at: http://{local_ip}:8000\n")
