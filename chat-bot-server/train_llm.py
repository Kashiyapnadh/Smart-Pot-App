import pandas as pd
import torch
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, Trainer, TrainingArguments

# Load your dataset
data = pd.read_csv("DATASET.csv")  # Update the path to your CSV file

label_encoder = LabelEncoder()
data['encoded_response'] = label_encoder.fit_transform(data['response'])


train_texts, val_texts, train_labels, val_labels = train_test_split(data['user_input'], data['encoded_response'], test_size=0.2)


tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=len(label_encoder.classes_))

# Tokenize input
train_encodings = tokenizer(list(train_texts), truncation=True, padding=True)
val_encodings = tokenizer(list(val_texts), truncation=True, padding=True)

# Create PyTorch datasets
class ChatbotDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

train_dataset = ChatbotDataset(train_encodings, train_labels.tolist())
val_dataset = ChatbotDataset(val_encodings, val_labels.tolist())

# Set training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=30,  # Adjust as needed
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    save_steps=500,  # Save every 500 steps
)


# Train the model
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset
)

# Start training
trainer.train()

model_save_path = "./saved_model"
trainer.save_model(model_save_path)
tokenizer.save_pretrained(model_save_path)

import pickle
with open(f"{model_save_path}/label_encoder.pkl", 'wb') as f:
    pickle.dump(label_encoder, f)

print(f"Model, tokenizer, and label encoder saved to {model_save_path}")
