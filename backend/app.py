
from flask import Flask, jsonify, request
import json
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rapidfuzz import fuzz, process

app = Flask(__name__)

# Load FAQ data
FAQ_FILE = os.path.join(os.path.dirname(__file__), "faq_data.json")

with open(FAQ_FILE, "r", encoding="utf-8") as file:
    faqs = json.load(file)

# Prepare FAQ questions for AI matching
faq_questions = [faq["question"] for faq in faqs]

synonyms = {
    "sign up": "register",
    "signup": "register",
    "enroll": "register",
    "join": "register",
    "apply": "register"
}

# Convert questions into numerical vectors
vectorizer = TfidfVectorizer(
    stop_words="english",
    ngram_range=(1, 2)
)
faq_vectors = vectorizer.fit_transform(faq_questions)


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to CodeAlpha FAQ Chatbot!",
        "status": "Backend is running successfully",
        "total_faqs": len(faqs)
    })


@app.route("/faqs", methods=["GET"])
def get_faqs():
    return jsonify(faqs)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Please provide a message"}), 400

    user_message = data["message"].strip()

    for word, replacement in synonyms.items():
        user_message = user_message.lower().replace(word, replacement)

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    user_vector = vectorizer.transform([user_message])
    similarities = cosine_similarity(user_vector, faq_vectors)

    best_match_index = similarities.argmax()
    best_score = float(similarities[0][best_match_index])

    fuzzy_match = process.extractOne(
        user_message,
        faq_questions,
        scorer=fuzz.token_set_ratio
    )

    fuzzy_score = fuzzy_match[1] if fuzzy_match else 0

    if best_score < 0.35 and fuzzy_score < 80:
        return jsonify({
            "answer": "Sorry, I couldn't understand your question. Please try asking differently.",
            "confidence": round(best_score, 2)
        })

    if best_score < 0.35 and fuzzy_match:
        best_match_index = faq_questions.index(fuzzy_match[0])
        best_score = fuzzy_score / 100

    return jsonify({
        "answer": faqs[best_match_index]["answer"],
        "confidence": round(best_score, 2)
    })
if __name__ == "__main__":
    app.run(debug=True)