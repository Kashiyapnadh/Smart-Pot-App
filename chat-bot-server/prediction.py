import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import pickle

# Load the saved model, tokenizer, and label encoder
model_save_path = "./saved_model"
model = DistilBertForSequenceClassification.from_pretrained(model_save_path)
tokenizer = DistilBertTokenizer.from_pretrained(model_save_path)

# Load the saved label encoder
with open(f"{model_save_path}/label_encoder.pkl", 'rb') as f:
    label_encoder = pickle.load(f)

# Function to classify new text input
def classify_input(text):
    # Tokenize the input
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    
    # Make predictions using the trained model
    model.eval()  # Set model to evaluation mode
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    
    # Get the predicted class index
    predicted_class_idx = torch.argmax(logits, dim=1).item()
    
    # Decode the predicted class to the original label
    predicted_label = label_encoder.inverse_transform([predicted_class_idx])[0]
    
    return predicted_label

# Define the predict function for the Django view
def predict(user_input):
    return classify_input(user_input)
