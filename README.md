# UnIvents

UnIvents is a modern event management platform where **students and admins** can interact seamlessly. Students can register, unregister, and view their events, while admins can create, manage, and track events along with registrations and certificates.

---

## Features Implemented

### Student Features
- **Authentication:** Sign up and Sign in via Email/Password and Google OAuth.
- **Dashboard:**
  - View registered events.
  - View attended events.
- **Event Management:**
  - Register for events.
  - Unregister from events.
- **Logout** with proper Firebase and localStorage cleanup.

### Admin Features
- **Authentication:** Sign up/sign in via Email/Password and Google OAuth.
- **Dashboard:**
  - View statistics: total events, total registrations, certificates issued.
  - Create, edit, and delete events.
- **Event Management:**
  - View event registrations.
  - Mark attendance for students.
  - Generate certificates for attendees.
- **Logout** with proper Firebase and localStorage cleanup.

### Shared Features
- Responsive UI with **Vite + React + Tailwind CSS**.
- Firebase Authentication integrated.
- Express backend API with PostgreSQL support.
- JWT token authentication between frontend and backend.
- Proper error handling for API requests.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Authentication:** Firebase Auth
- **Database:** PostgreSQL (via Supabase or local)
- **Deployment:** Render (Backend), Vercel  (Frontend)

---

## Instructions to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/azmaeenmahtab/Hackathon-Backend
cd Hackathon-Backend

npm install


