# 🎧 Moody-Player

**Moody-Player** is an intelligent, emotion-aware music player that tailors your listening experience based on your real-time facial expressions. Using advanced facial recognition powered by `face-api.js`, the app detects your current mood and fetches a playlist that resonates with your emotions. It's built using the powerful **MERN** stack — MongoDB, Express.js, React, and Node.js — with songs hosted on **ImageKit.io** for optimized media delivery.

---

## 📽️ Live Demo & Screenshots

> **Coming Soon**
>
> * Demo Video
> * UI Screenshots

---

## 📦 Features Overview

| Feature                     | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| 🎭 Real-time Mood Detection | Uses your webcam to detect facial expressions via `face-api.js`            |
| 📡 API-Driven Song Fetching | Sends mood data to backend, retrieves songs from MongoDB                   |
| ☁️ Cloud Media Storage      | Songs and thumbnails hosted securely on [ImageKit.io](https://imagekit.io) |
| 🎵 In-App Music Player      | Responsive audio player with Play/Pause functionality                      |
| 🎨 Clean & Modern UI        | Built using React & Tailwind for performance and responsiveness            |

---

## 🧠 How It Works

1. The user opens the app and clicks the **"Detect Face"** button.
2. The app loads `face-api.js` models and scans the user's face via webcam.
3. Facial expressions are analyzed to classify mood (e.g., happy, sad, angry).
4. The mood is sent to the backend (`/api/songs?mood=happy`) via an API call.
5. The backend queries MongoDB to find songs with the matching `mood` tag.
6. The matched songs are returned to the frontend and rendered on the UI.
7. Users can click **Play** or **Pause** to listen to songs in-app.

---

## 🛠 Tech Stack

### Frontend

* **React.js** — Component-based SPA framework
* **Tailwind CSS** — Utility-first CSS for rapid design
* **face-api.js** — Facial expression detection
* **Axios** — HTTP client for API communication

### Backend

* **Node.js** — JavaScript runtime environment
* **Express.js** — Lightweight API framework
* **MongoDB** — NoSQL database for songs
* **Mongoose** — ODM to define schemas and manage data
* **ImageKit.io** — CDN for storing audio and image assets

---



## ⚙️ Installation & Setup

### ✅ Prerequisites

* Node.js & npm
* MongoDB (Local or Atlas)
* ImageKit.io account

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/Moody-Player.git
cd Moody-Player
```

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

#### 📁 Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id/
```

#### ▶️ Start Backend Server

```bash
npm start
```

Your backend will run on: `http://localhost:5000`

---

### 🔹 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### 📁 Download Face Detection Models

> You can get them here: [face-api.js models](https://github.com/justadudewhohacks/face-api.js-models)

Place all models inside: `public/models/`

#### ▶️ Start React App

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 💾 MongoDB Data Format

```js
{
  title: "Sad Symphony",
  mood: "sad",
  thumbnail: "https://ik.imagekit.io/yourid/thumb.jpg",
  songUrl: "https://ik.imagekit.io/yourid/song.mp3"
}
```

> You can insert songs manually via MongoDB Compass or create an upload admin panel later.

---

## 🌐 Deployment Guide

### For Backend (Express)

* Use platforms like **Render**, **Railway**, or **VPS**
* Add `cors` package and allow frontend origin
* Serve frontend statically after build:

```js
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});
```

### For Frontend (React)

* Run build:

```bash
npm run build
```

* Deploy `dist/` to **Netlify**, **Vercel**, or any static host

---


---

## 🤝 Contributing

Pull requests, suggestions, and issues are most welcome!
Please fork the repo, make changes, and submit a pull request.

---

---

## 🙋‍♂️ Author

Created with ❤️ by **Ashim**
🔗 [LinkedIn](https://linkedin.com/in/ashimdut01)  |  💻 [GitHub](https://github.com/Ashim-Dutta)

---

> “Music is the shorthand of emotion.” – Leo Tolstoy
