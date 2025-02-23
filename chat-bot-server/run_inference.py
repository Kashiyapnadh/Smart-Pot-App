import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import pickle

import argparse

# Load the saved model, tokenizer, and label encoder
model_save_path = "./saved_model"
tokenizer = DistilBertTokenizer.from_pretrained(model_save_path)
model = DistilBertForSequenceClassification.from_pretrained(model_save_path)

with open(f"{model_save_path}/label_encoder1.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# Set the model to evaluation mode
model.eval()

# Function to generate a response
def generate_response(user_input):
    # Tokenize the input
    inputs = tokenizer(user_input, return_tensors="pt", truncation=True, padding=True)
    
    # Get model predictions
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the predicted label
    predicted_label_idx = torch.argmax(outputs.logits, dim=1).item()
    
    # Decode the label to get the response
    predicted_response = label_encoder.inverse_transform([predicted_label_idx])[0]
    
    return predicted_response

# Create the argument parser
parser = argparse.ArgumentParser(description="Accept and print a sentence from the command line")

# Add the argument to accept a sentence
parser.add_argument("--sentence", type=str, help="The sentence to print", required=True)

# Parse the arguments
args = parser.parse_args()


# Example usage
user_input = args.sentence
response = generate_response(user_input)
print(response)
