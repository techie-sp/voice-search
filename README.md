# 🎤 Voice-to-Text Product Search (React Native)

This project implements a **voice-based product search feature** for an e-commerce app using **React Native**.  
Users can search for products by speaking instead of typing, with real-time transcription, smart query parsing, and analytics tracking.

---

## 🚀 Features

### 🎙️ Voice Recognition
- Implemented using **React Native’s SpeechRecognizer API** (Android).
- Supports **real-time partial transcription** — live updates of recognized text in the search box.
- Handles **multi-language input** (English + Hindi mix).
- Filters **background noise** and avoids false triggers.

### 🔍 Search Flow
1. When the mic icon is tapped:
   - Fetches the full product list from **DummyJSON API** (`https://dummyjson.com/products`).
2. After speech recognition completes:
   - Parses the spoken query into structured parameters like:
     ```ts
     {
       brand?: string;
       color?: string;
       category?: string;
       price?: { operator: '<' | '>' | '='; value: number };
     }
     ```
   - Example:  
     _“Show me black Nike shoes under 5000”_ →  
     `{ brand: "Nike", color: "black", category: "shoes", price: { operator: '<', value: 5000 } }`
3. The parsed query is used with the **DummyJSON Search API**:  
   `https://dummyjson.com/products/search?q=<query>`

### 🤖 Smart Handling
- **Multi-language support** (English + Hindi mix).
- **Fallback suggestions** for no results (e.g., “Did you mean phones?”).
- **Error handling** for no internet, API failure, or speech timeout.

### 📊 Firebase Analytics
- Integrated **Firebase Analytics** to log key user actions:
  - Mic tapped
  - Successful / failed transcription
  - Query success / no results
  - Product clicked

- A **screenshot of logged Firebase events** is included in the repository under `/assets/firebase-logs.png`.

---

## ⚙️ Platform Note
Since this project was developed on a **Windows environment**,  
the implementation is currently **tested and optimized for Android only**.

---

## 📦 Tech Stack

- **React Native** (with TypeScript)
- **Firebase Analytics**
- **DummyJSON API**
- **SpeechRecognizer API (Android)**

---

## 🧪 How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/voice-to-text-product-search.git
   cd voice-to-text-product-search

2️⃣ Install Dependencies
npm install or
yarn install

3️⃣ Run the App on Android
npx react-native run-android

4️⃣ Requirements

Enable microphone permission.

Ensure internet access for API and Firebase calls.

🎥 Demo Video

A demo video of the complete flow is attached in the submission email.
It demonstrates:

Voice recognition in action

Real-time transcription

Product filtering

Firebase Analytics tracking
