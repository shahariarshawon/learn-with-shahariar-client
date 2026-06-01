# Learn with Shahariar

A full-stack Learning Management System (LMS) built with the MERN stack. Learn with Shahariar allows students to browse courses, enroll through a payment flow, watch lectures, track learning progress, complete chapter quizzes, and rate courses. Educators can publish courses, manage chapters and lectures, upload course thumbnails, view dashboard analytics, and track enrolled students.

## Live Demo

- Frontend: https://learn-with-shahariar.vercel.app/
- Client Repository: https://github.com/shahariarshawon/learn-with-shahariar-client
- Server Repository: https://github.com/shahariarshawon/learn-with-shahariar-server

## Screenshots

### Home Page
<img width="1920" height="4042" alt="learn-with-shahariar vercel app_ (2)" src="https://github.com/user-attachments/assets/340a6543-8b3d-47cf-b0b3-63115c6ef4b8" />

### Course List
<img width="1920" height="1859" alt="learn-with-shahariar vercel app_ (3)" src="https://github.com/user-attachments/assets/1293c3e9-5931-4f4e-85d1-63f59e28322c" />

### Course Details
<img width="1920" height="1859" alt="learn-with-shahariar vercel app_ (4)" src="https://github.com/user-attachments/assets/53608f75-0749-4ba5-a777-a5dee0ce184b" />

### Student Enrollments
<img width="1919" height="1218" alt="learn-with-shahariar vercel app_ (5)" src="https://github.com/user-attachments/assets/e09bedf8-7eae-45dc-833b-d386a4cbd43d" />

### Course Player
<img width="1919" height="1697" alt="learn-with-shahariar vercel app_ (7)" src="https://github.com/user-attachments/assets/65688cc3-1789-440c-8c2c-f645ceb3a63a" />

### Quiz
<img width="1920" height="2508" alt="learn-with-shahariar vercel app_quiz_69ddf630a4513d7d59747916_1780212137441" src="https://github.com/user-attachments/assets/fcdafa7e-c78e-4075-8790-ddabcbc64527" />


### Educator Dashboard
<img width="1919" height="917" alt="learn-with-shahariar vercel app_ (8)" src="https://github.com/user-attachments/assets/b1e5a63f-37a8-4a3d-8bdd-870bc651a704" />

### Add Course
<img width="1919" height="1340" alt="learn-with-shahariar vercel app_ (9)" src="https://github.com/user-attachments/assets/599169af-9654-4790-a205-56e5ad896b8f" />

### Quiz Manager
<img width="1919" height="962" alt="learn-with-shahariar vercel app_ (10)" src="https://github.com/user-attachments/assets/7b504482-bb75-4304-8403-05288a09f802" />


## Project Overview

Learn with Shahariar is an online learning platform designed for publishing and managing digital courses. The platform supports two main user flows:

- **Students** can explore courses, enroll, watch video lectures, monitor progress, complete quizzes, and rate courses.
- **Educators** can create courses, upload thumbnails, organize course content into chapters and lectures, create chapter-based quizzes, and view enrollment/earning data.

The application uses Clerk for authentication and role management, Stripe for course payment, Cloudinary for course thumbnail upload, MongoDB for data storage, and Express.js for backend APIs.

## Key Features

### Student Features

- Browse all published courses
- View detailed course pages
- Preview free lectures before enrollment
- Enroll in paid courses using Stripe checkout
- View enrolled courses in a personal dashboard
- Continue learning from the course player
- Watch YouTube-based course lectures
- Mark lectures as completed
- Track course progress
- Unlock chapter quizzes after completing lectures
- Attempt quizzes and view score/percentage
- Rate enrolled courses

### Educator Features

- Upgrade user role to educator through Clerk metadata
- Access protected educator dashboard
- Create and publish new courses
- Upload course thumbnail images using Cloudinary
- Add chapters and lectures
- Set lecture duration, order, video URL, and preview status
- Edit existing courses
- View educator course list
- View enrolled students
- View total courses, enrollments, and earnings
- Create chapter-based quizzes
- Add multiple quiz questions with four options and correct answer selection

### Authentication & Authorization

- Clerk authentication integration
- Protected student and educator APIs
- Educator-only route protection
- User data synchronized with MongoDB
- Role-based educator access using Clerk public metadata

### Payment & Enrollment

- Stripe Checkout integration
- Course purchase flow
- Purchase record management
- Stripe webhook support
- Automatic enrollment after successful payment
- Payment status tracking

### Course Progress & Quiz System

- Lecture completion tracking
- Course progress storage in MongoDB
- Chapter quiz locked until chapter lectures are completed
- Chapter-wise quiz creation by educators
- Quiz score calculation on the frontend
- Retry quiz option

## Tech Stack

### Frontend

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Clerk React
- Axios
- Framer Motion
- React Toastify
- SweetAlert2
- Quill Rich Text Editor
- React YouTube
- Humanize Duration
- Nano ID
- Lucide React
- Phosphor React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Clerk Express
- Stripe
- Cloudinary
- Multer
- CORS
- Dotenv
- Svix Webhooks

### Deployment & Services

- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas
- Authentication: Clerk
- Payment: Stripe
- Image Storage: Cloudinary

## Project Structure

### Client

```bash
learn-with-shahariar-client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── educator/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── student/
│   │   ├── About.jsx
│   │   ├── ContactForm.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Signature.jsx
│   │   └── SocialIcons.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── educator/
│   │   │   ├── AddCourse.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditCourse.jsx
│   │   │   ├── Educator.jsx
│   │   │   ├── MyCourses.jsx
│   │   │   ├── QuizManager.jsx
│   │   │   └── StudentsEnrolled.jsx
│   │   ├── student/
│   │   │   ├── CourseDetails.jsx
│   │   │   ├── CoursesList.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MyEnrollMents.jsx
│   │   │   ├── Player.jsx
│   │   │   └── Quiz.jsx
│   │   └── CourseOutline.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

### Server

```bash
learn-with-shahariar-server/
├── configs/
│   ├── cloudinary.js
│   ├── mongodb.js
│   └── multer.js
├── controllers/
│   ├── courseController.js
│   ├── educatorController.js
│   ├── quizController.js
│   ├── userController.js
│   └── webhooks.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Course.js
│   ├── CourseProgress.js
│   ├── Purchase.js
│   ├── Quiz.js
│   └── User.js
├── routes/
│   ├── courseRoute.js
│   ├── educatorRoutes.js
│   ├── quizRoutes.js
│   └── userRoutes.js
├── package.json
├── server.js
├── vercel.json
└── README.md
```

## Installation & Setup

### Prerequisites

Make sure you have the following installed or configured:

- Node.js
- npm
- MongoDB Atlas database
- Clerk project
- Stripe account
- Cloudinary account

## Frontend Setup

### 1. Clone the client repository

```bash
git clone https://github.com/shahariarshawon/learn-with-shahariar-client.git
cd learn-with-shahariar-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the client root directory:

```env
VITE_BACKEND_URL=http://localhost:5001
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=$
```

For deployed frontend, use your deployed backend URL:

```env
VITE_BACKEND_URL=https://your-backend-domain.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=$
```

### 4. Run the frontend locally

```bash
npm run dev
```

Frontend will run at:

```bash
http://localhost:5173
```

## Backend Setup

### 1. Clone the server repository

```bash
git clone https://github.com/shahariarshawon/learn-with-shahariar-server.git
cd learn-with-shahariar-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the server root directory:

```env
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CURRENCY=usd

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the backend locally

```bash
npm run server
```

Backend will run at:

```bash
http://localhost:5001
```

API health check:

```bash
http://localhost:5001/
```

## API Endpoints

### Course Routes

```http
GET    /api/course/all
GET    /api/course/:id
GET    /api/course/educator-courses
POST   /api/course/add-chapter
POST   /api/course/add-lecture
PUT    /api/course/update/:courseId
```

### User Routes

```http
GET    /api/user/data
GET    /api/user/enrolled-courses
POST   /api/user/purchase
POST   /api/user/update-course-progress
POST   /api/user/get-course-progress
POST   /api/user/add-rating
POST   /api/user/update-course
```

### Educator Routes

```http
GET    /api/educator/update-role
POST   /api/educator/add-course
GET    /api/educator/courses
GET    /api/educator/dashboard
GET    /api/educator/enrolled-students
```

### Quiz Routes

```http
POST   /api/quiz/create
GET    /api/quiz/:courseId/:chapterId
```

### Webhook Routes

```http
POST   /clerk
POST   /stripe
```

## Authentication Flow

1. User signs up or logs in through Clerk.
2. Frontend receives Clerk session/token.
3. Protected API requests include the Clerk token in the authorization header.
4. Backend validates requests using Clerk middleware.
5. User data is stored and managed in MongoDB.
6. Educator access is controlled using Clerk public metadata.

## Payment Flow

1. Student selects a course and clicks enroll.
2. Frontend sends course ID to the backend purchase API.
3. Backend creates a Stripe Checkout session.
4. Student completes payment on Stripe.
5. Stripe webhook updates purchase status.
6. Student is added to the course enrollment list.
7. Course appears in the student’s enrolled courses page.

## Course Progress Flow

1. Student opens an enrolled course in the player.
2. Student watches lecture content.
3. Student marks a lecture as completed.
4. Backend stores completed lecture IDs in MongoDB.
5. Progress is displayed in the student dashboard.
6. When all lectures in a chapter are completed, the chapter quiz becomes available.

## Scripts

### Client

```bash
npm run dev       # Start frontend development server
npm run build     # Build frontend for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Server

```bash
npm start         # Start backend with Node
npm run server    # Start backend with Nodemon
npm test          # Placeholder test script
```

## Deployment

### Frontend Deployment on Vercel

Recommended settings:

```bash
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Required frontend environment variables:

```env
VITE_BACKEND_URL=https://your-backend-domain.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=$
```

### Backend Deployment on Vercel

Required backend environment variables:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CURRENCY=usd
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Testing Checklist

### Student Side

- User can sign up and log in
- Courses load on the homepage
- Course list page works
- Course details page loads correctly
- Free preview lecture works
- Stripe checkout starts correctly
- Enrolled course appears after payment
- Course player opens for enrolled users
- Lecture completion updates correctly
- Progress percentage updates correctly
- Chapter quiz unlocks after chapter completion
- Quiz score is calculated correctly
- Course rating works

### Educator Side

- User can become educator
- Educator dashboard loads
- New course can be created
- Course thumbnail uploads to Cloudinary
- Chapters can be added
- Lectures can be added
- Courses can be edited
- Educator can view course list
- Educator can view enrolled students
- Quiz can be created for a chapter

### Backend

- MongoDB connects successfully
- Clerk middleware protects routes
- Educator middleware blocks unauthorized users
- Stripe checkout session is created
- Stripe webhook handles successful payments
- Clerk webhook creates/updates/deletes users
- Cloudinary image upload works

## Future Improvements

- Admin dashboard
- Certificate generation
- Email notifications
- Course search and filtering
- Wishlist feature
- Coupon system
- Course review comments
- Assignment submission system
- Downloadable resources
- Better quiz analytics
- Course completion certificate
- Instructor profile pages
- Dark mode
- Mobile app version
- More detailed payment history

## Known Limitations

- Some course content depends on external YouTube video URLs.
- The current quiz system is chapter-based and does not yet store detailed quiz attempt history.
- Payment flow depends on correct Stripe webhook configuration.
- Course thumbnail upload depends on Cloudinary configuration.
- Educator access depends on Clerk public metadata role configuration.

## Author

Developed by **Shahariar Shawon**

- GitHub: https://github.com/shahariarshawon
- Project: Learn with Shahariar

## License

This project is created for educational and personal learning purposes. You can modify and extend it based on your own needs.
