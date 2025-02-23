import sys
import subprocess
import socket
from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

@app.get("/run-script")
def run_python_script(sentence: str):
    result = subprocess.run(
        [sys.executable, 'run_inference.py', '--sentence', sentence],  
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        return {result.stdout}
    else:
        return {"message": "Script execution failed", "error": result.stderr}

# Hook into FastAPI startup event
@app.on_event("startup")
async def startup_event():
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    print("\n🚀 FastAPI server is starting...")
    print(f"🌍 Local IP Address: {local_ip}")
    print(f"📡 Access API at: http://{local_ip}:8000\n")
