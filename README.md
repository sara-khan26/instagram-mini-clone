# Instagram Clone (MERN Stack)

This project is a simple Instagram-like social media app built with:
- React (frontend)
- Node.js + Express (backend)
- MongoDB (database)

## Features
- User signup/login with JWT authentication
- Create, like, comment posts
- Follow users and feed functionality
- Cloudinary image upload

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running locally or cloud (MongoDB Atlas)
- Cloudinary account for image uploads

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
```bash
   npm install
   ```
3. Create a .env file with the following variables:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. Start the backend server:
```bash
npm start
```
### Frontend Setup

1. Navigate back to the frontend folder:
```bash
cd ../
```
2. Install dependencies:
```bash
npm install
```
3. Start the React app:
```bash
npm start
```

# API Endpoints

## Authentication
- **POST** `/auth/signup`  
  Register a new user by providing `username`, `email`, and `password`.

- **POST** `/auth/login`  
  Login a user with `email` and `password`. Returns a JWT token upon success.

---

## User
- **GET** `/users/me`  
  Get the profile details of the authenticated user.

- **GET** `/users/suggested`  
  Retrieve a list of suggested users to follow.

- **POST** `/users/follow/:userId`  
  Follow a user specified by `userId`.

---

## Posts
- **GET** `/feed`  
  Get the posts feed consisting of posts from followed users.

- **GET** `/posts/user/:userId`  
  Fetch all posts created by the user with the given `userId`.

- **POST** `/posts`  
  Create a new post by uploading an image URL and a caption.

- **POST** `/posts/:postId/like`  
  Toggle like/unlike on a post identified by `postId`.

- **POST** `/posts/:postId/comment`  
  Add a comment to the post identified by `postId`.

- **GET** `/posts/:id`  
  Retrieve a specific post along with its comments.

---

