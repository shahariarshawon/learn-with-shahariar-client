import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollMents from "./pages/student/MyEnrollMents";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Quiz from "./pages/student/Quiz";
import QuizManager from "./pages/educator/QuizManager";
import EditCourse from "./pages/educator/EditCourse";
import CourseOutline from "./pages/CourseOutline";

const App = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollMents />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/educator/quizzes" element={<QuizManager />} />
        <Route path="/educator/edit-course/:courseId" element={<EditCourse />} />
        <Route path="/course-outline/mern" element={<CourseOutline />} />


        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
