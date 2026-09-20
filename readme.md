# CARETAKER

CARETAKER is a modern task and event management web application designed to act as a personal digital guardian. It helps users organize daily tasks, track important events, manage reminders, and monitor their productivity through a clean and intuitive interface.

## Features

### Task Management

- Create and manage daily tasks
- Set task date and time
- Mark tasks as completed or pending
- Edit existing tasks
- Delete tasks
- Filter tasks by All, Pending, and Completed
- View today's and upcoming tasks

### Event Management

- Create important events
- Set event date and time
- Add event descriptions
- Edit existing events
- Delete events
- View upcoming events

### Reminder System

- Task reminders
- Event reminders
- Browser notifications
- Reminder sound
- 5-minute snooze functionality
- Automatic task completion when clicking "Done"
- Duplicate reminder prevention
- Local reminder tracking

### Dashboard

- Today's task overview
- Pending task count
- Completed task count
- Today's tasks
- Upcoming tasks
- Quick navigation to application sections

### Analytics

- Task completion statistics
- Pending and completed task overview
- Productivity information

### Settings

- Application settings
- Notification settings

### Authentication

- Login page
- Registration page
- Password visibility toggle
- Authentication system UI

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- JavaScript
- React Context API
- Browser Notification API
- LocalStorage

### Backend — Upcoming

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```text
CareTaker/
│
├── Frontend/
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── ReminderManager.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── TaskContext.jsx
│   │   │   └── EventContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   └── reminderService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── Backend/
│   └── # Backend development coming next
│
└── README.md