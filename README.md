# ⚡ Task Manager Application

A modern, production-grade Task Management web application built with **React**, **Vite**, and **Tailwind CSS**. Designed following clean component architecture principles, this project demonstrates robust client-side state persistence, real-time search and status filtering, and an intuitive responsive dark-themed interface.

---

## 🎯 Project Overview

This application serves as an interactive task tracking system engineered to simplify daily workflow management. It focuses on clean separation of concerns, utilizing container and presentational component design patterns to ensure state predictability and performance optimization.

---

## ✨ Features

- **Full CRUD Operations**: Create, read, update (with dynamic inline editing), and delete tasks.
- **Task Lifecycle Control**: Toggle task completion statuses seamlessly with instant visual feedback (`line-through` indicators and Undo/Done switches).
- **Real-Time Search**: Instantaneous client-side filtering across all stored tasks.
- **Categorical Filtering**: Quick-switch tabs for viewing **All**, **Pending**, and **Completed** tasks.
- **State Persistence**: Automatic synchronization with browser `localStorage` ensuring data retention across page refreshes.
- **Modern Dark UI**: Engineered with Tailwind CSS for a refined, responsive dark aesthetic.

---

## 🛠️ Tech Stack

- **Frontend**: React (v18+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Persistence**: Web Storage API (`localStorage`)
- **Version Control**: Git & GitHub

---

## 🏗️ Architecture & Component Design

```text
src/
├── components/
│   ├── AddTask.jsx        # Container component managing core state & persistence
│   ├── TaskForm.jsx       # Presentational component for task creation inputs
│   └── TaskControls.jsx   # Presentational component for search & filter controls
├── App.jsx                # Root application entry component
├── main.jsx               # React DOM rendering entry point
└── index.css              # Global styles & Tailwind CSS directives