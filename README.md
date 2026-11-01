# 👥 PeerPrep — Real-Time Mock Interviews & Collaborative Technical Assessment Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Developer:** Aman Gajbhiye  
**Tech Stack:** React 19, Node.js, Express, WebSockets (Socket.io), Monaco Editor, Tailwind CSS, Native Multi-Language Sandboxing  

**PeerPrep** is an engineering-grade, real-time collaborative coding and mock interview platform designed to replicate FAANG and tier-1 product company technical interview rounds (including **Trilogy Innovations**, Amazon, Google, Meta). It delivers sub-50ms dual-cursor synchronization, an embedded VS Code Monaco editor, an in-house isolated multi-language compiler sandbox, role-based evaluation rubrics (Candidate vs. Interviewer), and automated scorecard exports.

---

## ⚡ Core Features

- **🔄 Sub-50ms Real-Time Code Sync:** Live bidirectional code editing across peers powered by room-scoped Socket.io WebSockets.
- **💻 Embedded VS Code Monaco Editor:** Syntax highlighting, smart bracket matching, customizable keybindings, and automatic layout for JavaScript, Python 3, Java, and C++.
- **🔒 Isolated In-House Execution Engine:** Native sandboxed compiler execution using isolated ephemeral run containers with strict 7-second hard wall-clock timeout protection, memory limits, and automated filesystem reclamation.
- **🏢 Curated Company Tracks (Trilogy Innovations & FAANG):** Pre-populated problem banks with official constraints, examples, and starter templates—featuring high-frequency **Trilogy Innovations** bit-manipulation and logic problems.
- **📋 Structured Interviewer Rubric & Scorecards:** Comprehensive 4-tier rubric evaluation (Problem Formulation, Big-O Complexity, Code Cleanliness, and Communication) with instant composite scoring and one-click `.txt` report export.
- **⏱️ Standardized 45-Minute Interview Timer:** Real-time interview countdown clock to simulate rigorous phone screens.
- **📊 Real-Time Candidate Analytics:** Live tracking of code run attempts, compiler latency (ms), execution history, and session velocity.
- **💬 Persistent In-Room Peer Chat:** Real-time text messaging alongside code editor with timestamps and participant rosters.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Layer (React 19 + Monaco Editor)"]
        UI["Collaborative Workspace UI"]
        Monaco["Monaco Code Editor"]
        Timer["45-Min Interview Countdown"]
        Rubric["Interviewer Evaluation Scorecard"]
        Analytics["Candidate Speed & Run Analytics"]
        SocketClient["Socket.io Client"]
    end

    subgraph Server ["Server Engine (Node.js + Express)"]
        SocketServer["Socket.io WebSocket Engine (Sub-50ms Sync)"]
        RoomManager["In-Memory Room State Manager"]
        ProblemCatalog["Company Problem Catalog (Trilogy / FAANG)"]
        EvalStore["Evaluation & Scorecard Store (/api/evaluations)"]
        ExecEngine["Native Execution Sandbox Manager"]
    end

    subgraph Sandbox ["Isolated Process Isolation"]
        TempRuns["Ephemeral Sandbox (/temp_runs/run_<id>)"]
        Compilers["Native Compilers (g++, javac, python, node)"]
        Timeout["Hard Wall-Clock Killswitch (7s)"]
    end

    UI --> Monaco
    Monaco <--> SocketClient
    SocketClient <==> |WebSockets (ws://)| SocketServer
    SocketServer <--> RoomManager
    SocketServer --> ProblemCatalog
    UI --> |POST /api/evaluations| EvalStore
    UI --> |POST /api/execute| ExecEngine
    ExecEngine --> TempRuns
    TempRuns --> Compilers
    Compilers --> Timeout
```

---

## 📋 WebSocket Event Protocol

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `join-room` | Client ➔ Server | `{ roomId, username, role }` | Joins or initializes a collaborative session with RBAC |
| `room-state` | Server ➔ Client | `{ code, language, problemId, users, messages }` | Synchronizes room state to newly connected peer |
| `code-change` | Client ➔ Server | `{ roomId, code }` | Broadcasts buffer changes to room participants |
| `code-update` | Server ➔ Client | `newCode` | Updates peer's editor model without local echo |
| `language-change` | Client ➔ Server | `{ roomId, language }` | Switches compiler language and injects template |
| `problem-change` | Client ➔ Server | `{ roomId, problemId }` | Changes active problem across both screens |
| `send-message` | Client ➔ Server | `{ roomId, message, username }` | Broadcasts peer chat message |
| `code-executed` | Client ➔ Server | `{ roomId, output, isError, executionTimeMs }` | Synchronizes execution console output across peers |

---

## 🏃 Run Instructions

### 1. Single Command Full-Stack Production Mode
Runs both the compiled React frontend and the Express WebSocket engine together on port 5000:
```bash
cd server
npm install
node server.js
```
Open **`http://localhost:5000`** in your browser.

### 2. Independent Development Mode
Terminal 1 (Backend WebSocket Engine):
```bash
cd server
npm install
npm start
```

Terminal 2 (Frontend with Vite Hot Reload):
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🛡️ Security & Sandbox Architecture
1. **Isolated Execution Contexts:** Each execution compiles inside an ephemeral unique directory (`server/temp_runs/run_<random_id>`) with automated filesystem cleanup.
2. **7-Second Hard Timeout:** Wall-clock process timeouts automatically kill runaway while loops and fork bombs.
3. **RBAC & Interview Integrity:** Distinct Candidate and Interviewer roles preserve interview separation and structured rubric scoring.

---

## 📄 License
MIT License. Engineered by Aman Gajbhiye.
