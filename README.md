# Realtime Chat Application 💬

A simple and modern real-time chat web application built with **React.js**, **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO**.

---

## 🚀 Features
- Realtime One-to-One Chat
- User Authentication (JWT + Cookies)
- Responsive UI (Dark/Light Mode)
- Online/Offline User Status
- Search Users & Start Conversation
- Profile Edit & Update
- Scrollable Chat History
- Clean & Minimal Design
- Toast Notifications

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS (DaisyUI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Realtime Communication:** Socket.IO
- **Authentication:** JWT, Cookies
- **State Management:** Redux Toolkit
- **Notifications:** React Hot Toast

---

## 📂 Folder Structure
/frontend -> React Frontend
/backend -> Node.js Backend

yaml
Copy
Edit

---

## ⚙️ Installation & Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/parmeetkaur0/Chat_Application.git
cd Chat_Application
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
3. Create .env file in /backend
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET_KEY=your_secret_key
4. Run Backend Server
bash
Copy
Edit
npm run server
5. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
6. Open in Browser
arduino
Copy
Edit
http://localhost:3000
🗂️ API Endpoints (Backend)
Method	Route	Description
POST	/api/v1/user/register	Register New User
POST	/api/v1/user/login	Login User
GET	/api/v1/user/logout	Logout User
GET	/api/v1/user/other-users	Fetch All Other Users
POST	/api/v1/message/send/:id	Send Message to User
GET	/api/v1/message/get/:id	Get All Messages with User
PUT	/api/v1/user/update-profile	Update Profile Details

📄 Environment Variables
Variable	Description
PORT	Server Port
MONGO_URI	MongoDB Connection URI
JWT_SECRET_KEY	Secret Key for JWT

🖼️ Screenshots



💡 Future Enhancements
Group Chats / Channels

Media Sharing (Images, Videos)

Typing Indicators (is typing...)

Message Read/Seen Status

Push Notifications (Web/Mobile)

User Presence Indicator (Last Seen)

🧑‍💻 Author
Parmeet Kaur (@parmeetkaur0)

⭐ Show Your Support
If you like this project, consider giving it a ⭐ star on GitHub!
