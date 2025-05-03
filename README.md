# Cred Manager - Frontend

This is the Angular frontend for the self-hosted, zero-knowledge credentials manager.

Built with **Angular 18**, **Tailwind CSS**, and **AG Grid**, the app provides a modern UI and full CRUD capabilities for user credentials — securely encrypted and stored with zero-knowledge principles.

## ✨ Features

- ✅ **Login and registration** (JWT-based)
- 🔐 **Multi-user support**
- 🕶️ **Dark mode toggle** (with theme persistence)
- 📋 **Credential list view** with:
  - AG Grid for sorting, filtering, and pagination
  - Search bar
  - Responsive layout
- 🧾 **Credential detail view**
  - Password masked by default
  - On-demand decryption via secure backend request
- ➕ **Add / Edit credentials**
  - Validation and notifications
- 🗑️ **Credential deletion**
- 👤 **User account deletion**
- 🔐 **Session management** via JWT in `localStorage`
- 📆 **Created / Updated timestamps** shown in human-readable format
- ⚠️ **Error handling and user feedback**
- 🚫 **Protected routes with AuthGuard**

---

## 🧱 Technologies Used

- Angular 18
- Tailwind CSS
- AG Grid
- RxJS
- Standalone components
- JWT for authentication
- Angular Router, HttpClient, Reactive Forms


🌐 Backend Integration
Expects backend to be running at http://localhost:8080/api (configurable)

Uses Authorization: Bearer <JWT> in all protected requests.

🧾 Pages & Routes
Route	Component	Access
/login	LoginComponent	Public
/register	RegisterComponent	Public
/credentials	CredentialListComponent	Auth only
/credentials/:id	CredentialDetailComponent	Auth only
/credentials/new	CredentialFormComponent	Auth only
/credentials/:id/edit	CredentialFormComponent	Auth only

🧾 Design Notes:

Zero-knowledge design: passwords are decrypted only on demand and only for the logged-in user
No master key access from frontend
Dark mode persisted in localStorage using ThemeService
JWT stored in localStorage, auto-attached by HTTP interceptor
AG Grid theming auto-syncs with dark/light mode

🔐 Security
Password never exposed in frontend storage
No password decryption done on frontend
All secure operations go through backend
AuthGuard protects all credential routes
Dark mode and JWT state persisted securely (no session hijack vectors)

---

## 🚀 Setup Instructions

### 1. Install dependencies

```bash
npm install
ng serve