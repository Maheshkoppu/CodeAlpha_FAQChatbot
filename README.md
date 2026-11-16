# CodeAlpha FAQ Chatbot

## Project Overview

The CodeAlpha FAQ Chatbot is an AI-powered chatbot designed to answer frequently asked questions about CodeAlpha internships and projects.

It uses Natural Language Processing (NLP), TF-IDF, cosine similarity, fuzzy matching, and synonym matching to understand user questions and provide relevant answers.

## Features

- AI-powered FAQ question answering.
- TF-IDF and cosine similarity matching.
- Fuzzy matching to handle spelling mistakes.
- Synonym recognition.
- Suggested questions for users.
- Typing indicator.
- Message timestamps.
- Clear Chat functionality.
- Responsive frontend design.
- Flask REST API integration.

## Technologies Used

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Python
- Flask
- Scikit-learn
- RapidFuzz
- NumPy
- Pandas
- NLTK

## Project Structure

```text
CodeAlpha_FAQChatbot/
│
├── backend/
│   ├── app.py
│   ├── faq_data.json
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the backend folder

```bash
cd CodeAlpha_FAQChatbot/backend
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

For Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the Flask backend

```bash
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5000/
```

### 7. Open the frontend

Open `frontend/index.html` in your browser while the Flask backend is running.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/faqs` | Retrieve FAQ data |
| GET | `/health` | Health check |
| POST | `/chat` | Send a question and receive an answer |

## How It Works

1. The user enters a question.
2. The frontend sends the question to the Flask backend.
3. The backend preprocesses the question and checks synonyms.
4. TF-IDF and cosine similarity identify relevant FAQ questions.
5. RapidFuzz helps identify approximate matches.
6. The chatbot returns the matching answer or a fallback response.

## Future Improvements

- Google Sign-In and user authentication.
- Conversation history.
- User-specific analytics.
- More FAQ categories.
- Advanced NLP and Generative AI integration.

## Author

Mahesh

B.Tech – Artificial Intelligence and Machine Learning

## Internship

CodeAlpha – Artificial Intelligence Internship

Project: Task 2 – FAQ Chatbot
