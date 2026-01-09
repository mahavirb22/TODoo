# TODOoo - Todo Management Application

A full-stack todo management application with secure access control, real-time task management, and an intuitive user interface.

## 📋 Project Structure

```
TODOoo/
├── backend/          # Node.js Express API server
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom middleware
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Express app entry point
└── frontend/         # React + Vite web application
    ├── src/
    │   ├── components/    # Reusable React components
    │   ├── modals/        # Modal dialogs
    │   ├── pages/         # Page components
    │   ├── services/      # API client
    │   ├── hooks/         # Custom React hooks
    │   └── App.jsx        # Root component
    └── vite.config.js     # Vite configuration
```

## 🚀 Features

- **Access Control**: Secure access codes to protect your todos
- **Task Management**: Create, edit, and delete todos
- **Progress Tracking**: Visual progress bar showing completion status
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with React, Tailwind CSS, and DaisyUI
- **Smooth Animations**: Framer Motion animations and confetti celebrations

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: bcrypt for secure password hashing
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Router**: React Router v7

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

```
3. Start the backend server:
```bash
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

5. For production build:
```bash
npm run build
npm run preview
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user with access code
- `POST /login` - Login with access code

### Todo Routes (`/api/todos`)
- `GET /` - Fetch all todos for the user
- `POST /` - Create a new todo
- `PUT /:id` - Update a todo
- `DELETE /:id` - Delete a todo

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000                                    # Server port
MONGO_URI=mongodb://localhost:27017/todooo   # MongoDB connection string
NODE_ENV=development                         # Environment mode
```

### Frontend (.env.development or .env.production)
```env
VITE_API_URL=http://localhost:5000/api      # Backend API base URL
```

## 🎮 Usage

1. Start both backend and frontend servers (follow installation steps)
2. Open your browser to `http://localhost:5173`
3. Enter an access code to unlock the application
4. Create, edit, and manage your todos
5. Track your progress with the visual progress bar

## 📱 Key Components

### Frontend Components
- **FloatingButton** - Quick action button for adding todos
- **ProgressBar** - Visual representation of completion progress
- **TodoCard** - Individual todo item display
- **AccessModal** - Access code verification modal
- **AddTodoModal** - Create new todo modal
- **EditTodoModal** - Edit existing todo modal
- **ConfirmModal** - Confirmation dialogs for destructive actions
- **PendingTodosModal** - View pending/incomplete todos

### Backend Models
- **AccessCode** - User access credentials
- **Todo** - Todo item with title, description, and completion status

## 🔐 Security

- Access codes are hashed using bcrypt
- CORS is configured to allow frontend requests
- Database connection is secured via connection string

### Secret Exposure Remediation
GitHub has flagged a leaked MongoDB URI in historical commits. Env files are now ignored, but you must rotate the credential and purge it from history.

- Replace secrets with env variables: backend loads `MONGO_URI` via `process.env`.
- Ensure secrets are ignored: `.gitignore` includes entries for `.env` and `backend/.env`.
- Use sample env: copy [backend/.env.example](backend/.env.example) to `backend/.env` and fill real values locally.

#### Rotate MongoDB Credentials (MongoDB Atlas)
- Create a new database user with a strong password.
- Restrict Network Access to allowed IPs only.
- Delete the old user so the leaked URI no longer works.
- Update `MONGO_URI` in deployment secrets and local `.env`.

#### Purge Leaked Files From Git History
Prefer `git filter-repo` to remove `backend/.env` from all commits and force-push.

```bash
# Install git-filter-repo (one-time)
python -m pip install git-filter-repo

# Remove leaked env from history
git filter-repo --path backend/.env --invert-paths

# Verify history cleaned, then force-push
git push origin --force
```

If `git filter-repo` isn't available, use BFG Repo-Cleaner:

```bash
# Download BFG jar: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files backend/.env

# Follow BFG output instructions, then force-push
git push origin --force
```

## 📊 Development

### Linting
```bash
cd frontend
npm run lint
```

### Backend Development
- Uses `nodemon` for automatic restart on file changes
- Run `npm run dev` for hot-reload development

### Frontend Development
- Uses Vite for fast development server with HMR
- Run `npm run dev` for hot-reload development

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Verify MongoDB is running locally or check your connection string
- Check `MONGO_URI` in `.env` file

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend environment variables

### CORS errors
- Backend has CORS enabled by default
- If issues persist, check server.js CORS configuration

## 📄 License

ISC

## 👨‍💻 Development Notes

- The frontend uses Vite for fast build times and HMR
- Backend uses Express middleware for request parsing and CORS
- MongoDB with Mongoose provides the data persistence layer
- Access control is managed through access codes stored in the database

---

**Happy todo-ing! 🎉**
