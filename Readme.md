# Appifylab Task - Backend

A robust RESTful API backend for a social networking platform built with Node.js, Express, TypeScript, and MongoDB. This application provides comprehensive user authentication, profile management, and social posting features with enterprise-grade security and performance optimizations.

- **Live URL:** [https://appifylab-task-backend.vercel.app/](https://appifylab-task-backend.vercel.app/)
- **Repository:** [https://github.com/Anikroy7/appifylab_task_backend](https://github.com/Anikroy7/appifylab_task_backend)
- **Frontend Repository:** [https://github.com/Anikroy7/appifylab_task_frontend](https://github.com/Anikroy7/appifylab_task_frontend)

## 📋 Project Description

This backend application powers a modern social networking platform with the following capabilities:

### Core Features
- **User Authentication & Authorization**: Secure JWT-based authentication with access and refresh token mechanism
- **User Profile Management**: Complete user profile CRUD operations with profile customization
- **Social Posts**: Create, read, update, and delete posts with visibility controls (public/private)
- **Session Management**: Track and manage user sessions across multiple devices
- **Image Upload**: Integration with ImgBB for image hosting and management
- **Advanced Security**: Rate limiting, CORS protection, helmet security headers, and HPP protection

### Technical Highlights
- **TypeScript**: Full type safety and enhanced developer experience
- **MongoDB & Mongoose**: Robust data modeling with soft delete support
- **Validation**: Request validation using Zod schemas
- **Pagination**: Built-in pagination support for list endpoints
- **Error Handling**: Centralized error handling with detailed error responses
- **Logging**: Request logging with Morgan for debugging and monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Security**: Helmet, CORS, express-rate-limit, HPP
- **Password Hashing**: bcryptjs
- **Logging**: Morgan
- **Development**: ts-node-dev for hot-reloading

## 📦 Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

## 🚀 Local Installation & Setup

Follow these steps to run the backend application on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Anikroy7/appifylab_task_backend.git
cd appifylab_task_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of the project. Copy the contents below and update the values according to your local setup:

#### `.env.example`

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=5000
NODE_ENV=development
API_VERSION=v1

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Local MongoDB (if running MongoDB locally)
MONGO_DB_URI=mongodb://localhost:27017/appifylab-task

# OR MongoDB Atlas (cloud database)
# MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/appifylab-task?retryWrites=true&w=majority

# ============================================
# CORS & SECURITY CONFIGURATION
# ============================================
# Comma-separated list of allowed origins
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
FRONTEND_URL=http://localhost:5173
CORS_CREDENTIALS=true

# ============================================
# RATE LIMITING
# ============================================
# Window duration in milliseconds (15 minutes = 900000ms)
RATE_LIMIT_WINDOW_MS=900000
# Maximum requests per window
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# JWT AUTHENTICATION
# ============================================
# Generate secure random strings for production
# You can use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_change_this_in_production
ACCESS_TOKEN_LIFE=1d

REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_change_this_in_production
REFRESH_TOKEN_LIFE=30d

# ============================================
# IMAGE UPLOAD (Optional - if using ImgBB)
# ============================================
# Get your API key from: https://api.imgbb.com/
# IMGBB_API_KEY=your_imgbb_api_key_here
```

### 4. Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. Verify MongoDB is running: `mongosh` (should connect to localhost:27017)

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string and update `MONGO_DB_URI` in `.env`
4. Whitelist your IP address in Atlas Network Access

### 5. Generate Secure JWT Secrets (Important for Production)

For development, you can use any string, but for production, generate secure random secrets:

```bash
# Run this command twice to generate two different secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the generated strings and use them for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.


## 🏃 Running the Application

### Development Mode

Start the server in development mode with hot-reloading (automatically restarts on file changes):

```bash
npm run start:dev
```

The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

You should see output similar to:
```
Server is running on port 5000
Database connected successfully
```

### Production Build

To build and run the project in production mode:

1. **Build the TypeScript code**:
```bash
npm run build
```

2. **Start the production server**:
```bash
npm run start:prod
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Starts the development server with hot-reloading using ts-node-dev |
| `npm run build` | Compiles TypeScript to JavaScript in the `dist` folder |
| `npm run start:prod` | Runs the compiled production application |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run lint:fix` | Automatically fixes ESLint issues |
| `npm run prettier` | Checks code formatting with Prettier |
| `npm run prettier:fix` | Fixes code formatting using Prettier |

## 📁 Project Structure

```
appifylab-task-backend/
├── src/
│   ├── server.ts              # Application entry point
│   ├── app.ts                 # Express app configuration
│   ├── app/
│   │   ├── config/            # Configuration files (database, etc.)
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication module
│   │   │   ├── user/          # User management module
│   │   │   └── post/          # Post management module
│   │   ├── middlewares/       # Custom middlewares (auth, error handling)
│   │   ├── utils/             # Utility functions and helpers
│   │   └── errors/            # Custom error classes
├── dist/                      # Compiled JavaScript (generated)
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment variables template
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔌 API Endpoints

The API is prefixed with `/api/v1` (or the version specified in your `.env` file).

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### User Endpoints
- `GET /api/v1/user/profile` - Get current user profile
- `PUT /api/v1/user/profile` - Update user profile
- `GET /api/v1/user/all` - Get all users (with pagination)
- `GET /api/v1/user/:id` - Get user by ID

### Post Endpoints
- `GET /api/v1/post` - Get all posts (with pagination)
- `POST /api/v1/post` - Create a new post
- `GET /api/v1/post/:id` - Get post by ID
- `PUT /api/v1/post/:id` - Update post
- `DELETE /api/v1/post/:id` - Delete post
- `POST /api/v1/post/:id/like` - Like/unlike a post

### Session Endpoints
- `GET /api/v1/session` - Get all active sessions
- `DELETE /api/v1/session/:id` - Delete specific session

For detailed API documentation with request/response examples, please refer to the API documentation or use tools like Postman.

## 🧪 Testing the API

You can test the API using:

1. **Postman**: Import the API endpoints and test them
2. **cURL**: Command-line testing
3. **Frontend Application**: Connect with the frontend app

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error
**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
- Ensure MongoDB is running locally: `mongosh`
- Check if `MONGO_DB_URI` in `.env` is correct
- For MongoDB Atlas, verify your IP is whitelisted

#### 2. Port Already in Use
**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
- Change the `PORT` in `.env` to a different port (e.g., 5001)
- Or kill the process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - macOS/Linux: `lsof -ti:5000 | xargs kill`

#### 3. JWT Token Errors
**Error**: `JsonWebTokenError: invalid signature`

**Solution**:
- Ensure `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` are set in `.env`
- Clear browser cookies/localStorage and login again

#### 4. CORS Errors
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
- Add your frontend URL to `CORS_ORIGIN` in `.env`
- Ensure `CORS_CREDENTIALS=true` is set

## 🚀 Deployment

This application is deployed on Vercel. To deploy your own instance:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add all environment variables from `.env`
   - Redeploy the application

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform:
- Use MongoDB Atlas for production database
- Generate strong, unique JWT secrets
- Set `NODE_ENV=production`
- Update `CORS_ORIGIN` with your production frontend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Anik Roy**
- GitHub: [@Anikroy7](https://github.com/Anikroy7)

## 📞 Support

For issues, questions, or contributions, please open an issue in the [GitHub repository](https://github.com/Anikroy7/appifylab_task_backend/issues).

---

**Happy Coding! 🚀**
