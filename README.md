🚨 Caveo — Real-Time Emergency Response System

Caveo is a real-time emergency management platform designed for hotels and similar infrastructures. It enables guests to instantly raise SOS alerts, notifies staff in real time, and ensures rapid response through live dashboards and SMS escalation.

✨ Features
🚨 One-tap SOS alerts (Fire, Medical, Security, Harassment)
📡 Real-time dashboard using Firebase Firestore
📲 SMS alerts via Twilio for immediate escalation
🧑‍💼 Staff authentication (Firebase Auth)
🔄 Incident lifecycle tracking (Open → Acknowledged → Resolved)
📊 Analytics dashboard for insights & response optimization
🌐 Web-based access (no app install required)
🧠 How It Works
Guest raises SOS from /guest?room=XXX
Incident is stored in Firebase Firestore
Dashboard updates instantly (real-time listener)
SMS alert sent via Twilio
Staff acknowledges & resolves incident
Data used for analytics and tracking
🏗️ Tech Stack
Frontend: Next.js (App Router) + React
Styling: Tailwind CSS + shadcn/ui
Backend: Next.js API Routes
Database: Firebase Firestore
Authentication: Firebase Auth
Notifications: Twilio SMS API
Deployment: Vercel

⚙️ Setup Instructions
1. Clone the Repository
2. git clone https://github.com/your-username/caveo.git
cd caveo
Install Dependencies
npm install --legacy-peer-deps
3. Setup Environment Variables

Create .env.local:

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
DEFAULT_ALERT_PHONE_NUMBER=
4. Run Development Server
npm run dev

Open:

http://localhost:3000
🔐 Firebase Setup
Enable Authentication → Email/Password
Create a test user (e.g. admin@caveo.com
)
Enable Firestore Database
Create collections:
incidents
roomNumber
type
notes
status
severity
source
createdAt
users
name
email
role
settings
hotelName
alertPhone
📲 Twilio Setup
Create Twilio account
Get:
Account SID
Auth Token
Twilio Phone Number
Verify your personal number (for trial)
Add to .env.local
🧪 Testing
Guest Flow
/guest?room=204
Select emergency
Submit SOS
Check Firestore + SMS
Dashboard
Login with Firebase user
View real-time incidents
Update status
🚀 Deployment

Deploy using Vercel:

npm install -g vercel
vercel

Add environment variables in Vercel dashboard.

💡 Future Improvements
🔔 Push notifications (Firebase FCM)
🤖 AI-based incident classification (Gemini)
📍 Indoor location mapping
🧑‍🔧 Staff assignment system
🌍 Multi-language support
🧾 License

This project is built for educational and hackathon purposes.

👨‍💻 Author
Shivraj Bissa

🔥 One-Line Pitch
Caveo is a real-time emergency response system that instantly connects guests, staff, and alerts using cloud infrastructure and live communication.
