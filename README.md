# 🎯 Random Quotes Generator

A simple and responsive web application that fetches random quotes from an external API. The backend is powered by **Node.js and Express**, which acts as a proxy to securely fetch quotes and serve them to the frontend.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API Source**: [Quotable API](https://github.com/lukePeavey/quotable) *(or any external quote API)*

---

## 🚀 Features

- 📜 Generate new quotes with a click
- 🌐 Backend handles API fetching for better control and security
- 🎨 Clean and minimal UI
- 📱 Responsive design for mobile and desktop
- ⚡ Fast and lightweight

## 📁 Project Structure

```text
random-quotes-generator/
│
├── backend/
│   ├── routes/
│   │   └── quoteRoutes.js         # Handles the API route logic
│   ├── server.js                  # Main Express server file
│
├── public/
│   ├── index.html                 # Frontend UI
│   ├── styles.css                 # Basic styling
│   └── script.js                  # JS logic to fetch/display quotes
│
├── .gitignore                     # Ignore node_modules, etc.
├── package.json                   # NPM project metadata & dependencies
└── README.md                      # Project description and setup instructions
```

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/random-quotes-generator.git
cd random-quotes-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Backend Server
```bash
node backend/server.js
The server will start at: http://localhost:3000
```
