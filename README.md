# SmartDebate - React SPA
## Lab 06 | Web Engineering | University of Lahore
### Saniya Ali (70147142)

---

## Project Structure

```
/index.html
/src
├── main.jsx
├── App.jsx
├── /database
│   └── debateData.js
├── /firebase
│   └── config.js
└── /components
    ├── /layouts
    │   └── Navbar.jsx
    └── /pages
        ├── HomePage.jsx
        ├── AboutPage.jsx
        ├── ContactPage.jsx
        ├── LoginPage.jsx
        ├── RegisterPage.jsx
        └── PageNotFound.jsx
        /views
        ├── /homeViews
        │   ├── HeroSection.jsx
        │   ├── AnalyticsDashboard.jsx
        │   ├── AddDebateForm.jsx
        │   ├── FilterSection.jsx
        │   ├── DebateCard.jsx
        │   └── EditModal.jsx
        ├── /aboutViews
        │   ├── MissionVision.jsx
        │   └── CoreValues.jsx
        ├── /contactViews
        │   ├── ContactInfo.jsx
        │   └── ContactForm.jsx
        └── /authViews
            ├── LoginForm.jsx
            └── RegisterForm.jsx
```

---

## PART A — Setup

### Step 1: Create Vite React App
```bash
npm create vite@latest smartdebate-react -- --template react
cd smartdebate-react
npm install
```

### Step 2: Add Tailwind CDN to index.html
Inside `<head>`:
```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

---

## PART B — React Router DOM

### Install
```bash
npm install react-router-dom
```

### Routes defined in App.jsx:
| Path | Component |
|------|-----------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/contact` | ContactPage |
| `/auth/login` | LoginPage |
| `/auth/register` | RegisterPage |
| `*` | PageNotFound |

---

## GitHub Setup
```bash
git init
git add .
git commit -m "Lab 06 - React SPA SmartDebate"
git branch -M main
git remote add origin <your_repo_url>
git push -u origin main
```

---

## Firebase Setup

### Step 1: Create Firebase Project
- Go to https://console.firebase.google.com
- Click Add Project → Enter name → Disable Analytics → Create

### Step 2: Register Web App
- Click </> Web App → Nickname: smartdebate → Register
- Copy the config object

### Step 3: Paste config in src/firebase/config.js
Replace all `<YOUR_...>` values with real ones from Firebase console.

### Step 4: Enable Services (Build menu)
- Firestore Database → Create DB → Test mode
- Authentication → Get Started → Enable Email/Password
- Storage → Get Started → Default rules

### Step 5: Install Firebase SDK
```bash
npm install firebase
```

### Step 6: Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
npm run build
firebase init
# Select: Hosting
# Public directory: dist
# Single page app: Yes
firebase deploy
```

---

## Routes work correctly on Firebase because firebase.json has SPA rewrite rule configured.
