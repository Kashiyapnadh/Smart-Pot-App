import sys
from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

@app.get("/run-script")
def run_python_script(sentence: str):
    # Use the current Python interpreter from the virtual environment
    result = subprocess.run(
        [sys.executable, 'run_inference.py', '--sentence', sentence],  
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        return {result.stdout}
    else:
        return {"message": "Script execution failed", "error": result.stderr}
