# NXG FitTrack

NXG FitTrack is a **native mobile app** (iOS & Android) built with **React Native**, designed to help users track their workouts, exercises, and fitness progress. The app allows users to browse workout templates, log sets/reps/weights, view workout history, and track progress metrics. A backend API is provided to persist user data and compute metrics.

---

## **Features**

### **Authentication**
- Sign up / login with email and password.
- Auth securely stored using OS secure storage (Keychain / Keystore / AsyncStorage).

### **User Profile**
- View and edit profile: name, weight (kg), height (cm).

### **Workouts & Exercises**
- See workout templates with exercises, sets, and reps.
- Start workouts from templates.
- Add fineshed workouts.
- Add exercises to a template, update or delete templates.

### **History & Metrics**
- View list of past sessions with dates and summaries.
- Metrics:
  - Total training volume (weight × reps) over time (line chart).
  - Personal best per exercise (list or bar chart).
- Filter workout history.

---

## **Screenshots / Demo**

<!-- Add screenshots or GIF here -->
![Profile](./assets/screenshots/login.png)


---

## **Installation & Setup**

### **Prerequisites**
- Node.js (v18+ recommended)
- npm / yarn
- React Native CLI
- Android Studio / Xcode (for simulators/emulators)
- Backend API running (FastAPI / Node.js, etc.)

### **Clone the repository**
```bash
git clone https://github.com/<your-username>/NXGFitTrack.git
cd NXGFitTrack
