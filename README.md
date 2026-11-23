# LearnSphere AI
> **AI-Powered Learning, Assessment, and Student Competency Analytics Platform**

LearnSphere AI is a full-stack educational web application that shifts education from mere score calculation to genuine competency measurement across all six revised levels of **Bloom's Taxonomy** (Remember, Understand, Apply, Analyze, Evaluate, Create).

---

## 🌟 Key Features

- **Role-Based Access Control**:
  - **Student**: Course enrollment, course materials, timed examinations with proctoring safeguards, Bloom's level competency analytics, personalized AI study recommendations.
  - **Faculty**: Course management, syllabus parsing, AI-generated Bloom's learning objectives, AI question generator (MCQ, multi-select, short/long answer, coding), evaluation & analytics dashboard.
  - **Admin**: Faculty onboarding verification and platform management.
- **AI-Driven Bloom's Taxonomy Objectives**: Extract text from course materials and automatically generate structured, level-mapped learning objectives.
- **Multi-Format Assessment Engine**: Timed, server-validated examination runner with automatic evaluation for objective questions and AI-assisted rubric evaluation for descriptive questions.
- **Granular Competency Analytics**: Visualizations via Recharts (Radar, Bar, Heatmap) tracking student progress across Bloom's levels and individual learning objectives.
- **Personalized Recommendations**: Gemini-powered targeted study pathways addressing identified conceptual gaps.

---

## 🛠 Tech Stack

- **Frontend**: React 18 / 19, Vite, Tailwind CSS, React Router DOM v6, Framer Motion, Lucide React, Recharts, Axios.
- **Backend**: Node.js, Express.js, Firebase Admin SDK, Google Gemini API (`@google/genai`), Zod, Multer.
- **Database & Auth**: Firebase Authentication & Cloud Firestore.
- **File Storage**: Dual-mode storage adapter (Local file system for rapid local development, switchable to Cloud Object Storage).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Firebase Project with Authentication & Cloud Firestore enabled
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd "AI Session"
   ```

2. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `backend/.env` and update the keys:
     ```bash
     PORT=5000
     GEMINI_API_KEY=your_gemini_api_key
     GEMINI_MODEL=gemini-1.5-flash
     FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json
     ```
   - Copy `frontend/.env.example` to `frontend/.env` with your client Firebase credentials.

4. **Run Development Servers**:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api/v1`
   - API Health Check: `http://localhost:5000/api/v1/health`

---

## 📂 Repository Structure

```text
learnsphere-ai/
├── backend/            # Express.js REST API & AI Calculation Engine
├── frontend/           # React + Vite Single Page Application
├── .env.example        # Environment variable templates
├── .gitignore
├── package.json        # Root scripts
└── README.md
```

---

## 🔒 Security Measures
- Token verification via Firebase Admin SDK.
- Student-facing APIs redact answer keys and evaluation rubrics.
- Server-side deadline enforcement preventing client clock manipulation.
- Untrusted course document text is guarded against prompt injection.
- Untrusted student code is isolated and never executed on the host server.
