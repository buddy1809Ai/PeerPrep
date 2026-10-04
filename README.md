# 👥 PeerPrep - Real-Time Collaborative Coding & Mock Interview Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**PeerPrep** is a high-performance, real-time collaborative coding and mock interview platform designed for software engineering candidates. It replicates FAANG/tier-1 technical interview rounds with zero-latency dual-cursor synchronization, an embedded VS Code Monaco editor, remote multi-language code execution, curated algorithmic problem banks, and live peer feedback.

---

## ⚡ Key Features

- **🔄 Real-Time Bidirectional Code Sync:** Sub-50ms synchronized typing across peers utilizing room-scoped Socket.io WebSockets.
- **💻 VS Code Monaco Editor:** Rich coding experience featuring syntax highlighting, intelligent auto-completion, line numbers, and theme customization (`vs-dark`).
- **🚀 Multi-Language Remote Execution:** Isolated compilation and execution for **JavaScript (Node.js)**, **Python 3**, **Java**, and **C++** powered by the Piston Sandbox API.
- **📚 Curated Algorithmic Problem Bank:** Integrated LeetCode-style problem descriptions, time/space constraints, and pre-populated function boilerplate.
- **⏱️ Standardized 45-Minute Interview Timer:** Real-time interview countdown clock to simulate rigorous technical phone screens.
- **📊 Synchronized Terminal & Test Runner:** Live console outputs, execution timing (ms), and visual celebration confetti triggers on accepted test cases.
- **💬 Real-Time In-Room Chat & Presence:** Live participant roster and persistent in-room chat for technical discussion and feedback.

---

## 🛠️ Architecture & Tech Stack

### System Overview

```mermaid
flowchart TD
    subgraph Client ["Frontend (React 19 + Vite + Tailwind v4)"]
        UI["Collaborative Workspace UI"]
        Monaco["Monaco Code Editor"]
        Timer["45-Min Interview Timer"]
        Chat["In-Room Chat Panel"]
        SocketClient["Socket.io Client"]
    end

    subgraph Server ["Backend (Node.js + Express)"]
        SocketServer["Socket.io WebSocket Engine"]
        RoomManager["In-Memory Room State Manager"]
        ProblemBank["DSA Problem Catalog"]
        ExecProxy["Code Execution Service"]
    end

    subgraph ExecutionSandbox ["Remote Execution Engine"]
        Piston["Piston Code Execution API\n(Python, Java, C++, JS)"]
    end

    UI --> Monaco
    Monaco <--> SocketClient
    SocketClient <==> |WebSockets (ws://)| SocketServer
    SocketServer <--> RoomManager
    SocketServer --> ProblemBank
    SocketClient --> |POST /api/execute| ExecProxy
    ExecProxy <--> |Sandbox Request| Piston
```

### WebSocket Event Protocol

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `join-room` | Client ➔ Server | `{ roomId, username }` | Joins or initializes a collaborative session |
| `room-state` | Server ➔ Client | `{ code, language, problemId, users, messages }` | Synchronizes room state to newly connected peer |
| `code-change` | Client ➔ Server | `{ roomId, code }` | Broadcasts buffer changes to room participants |
| `code-update` | Server ➔ Client | `newCode` | Updates peer's editor model without echo |
| `language-change` | Client ➔ Server | `{ roomId, language }` | Switches compiler language and injects template |
| `problem-change` | Client ➔ Server | `{ roomId, problemId }` | Changes active problem across both screens |
| `send-message` | Client ➔ Server | `{ roomId, message, username }` | Broadcasts peer chat message |
| `code-executed` | Client ➔ Server | `{ roomId, output, isError, executionTimeMs }` | Synchronizes execution console output across peers |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/buddy1809Ai/PeerPrep.git
cd PeerPrep
```

### 2. Setup and Start Backend Server
```bash
cd server
npm install
npm start
```
The server will boot on `http://localhost:5000`.

### 3. Setup and Start Frontend Client
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
The client will be running at `http://localhost:5173`.

### 4. Experience Real-Time Collaboration
1. Open `http://localhost:5173` in your browser.
2. Enter room ID (e.g. `mock-interview-101`) and your name.
3. Open a second browser tab (or Incognito window) at `http://localhost:5173` and join the same room.
4. Type code in one window—watch it stream instantly to the other window!
5. Hit **"Run Code"** to execute your solution and sync the terminal output across both screens.

---

## 📁 Repository Structure

```
PeerPrep/
├── client/                     # Frontend Single Page Application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── assets/             # Images and styles
│   │   ├── App.css             # Monaco & utility styles
│   │   ├── App.jsx             # Main collaborative application component
│   │   ├── index.css           # Tailwind CSS v4 styling & dark theme
│   │   └── main.jsx            # React root mount
│   ├── index.html              # HTML entry template
│   ├── package.json            # Frontend dependencies & scripts
│   └── vite.config.js          # Vite configuration with Tailwind plugin
│
├── server/                     # Backend WebSocket & API Engine
│   ├── server.js               # Express + Socket.io server & Piston proxy
│   └── package.json            # Backend dependencies & scripts
│
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 🔮 Roadmap

- [ ] **WebRTC 1-on-1 Audio/Video Calling:** Built-in video and voice streams directly inside the interview room.
- [ ] **AI Mock Interviewer Evaluation:** Automated code complexity (Big-O time/space) analysis and behavioral feedback.
- [ ] **Custom Room Access Controls:** Password-protected rooms and spectator mode for interview observers.
- [ ] **MongoDB Persistence:** User authentication, historical interview scorecards, and session replay.

---

## 👨‍💻 Author

**Aman Manoj Gajbhiye**
- B.Tech in Artificial Intelligence & Data Science, YCCE Nagpur (CGPA: 9.03)
- GitHub: [@buddy1809Ai](https://github.com/buddy1809Ai)
- LinkedIn: [aman-gajbhiye-218887304](https://www.linkedin.com/in/aman-gajbhiye-218887304)
- Email: [amangajbhiye2806@gmail.com](mailto:amangajbhiye2806@gmail.com)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
