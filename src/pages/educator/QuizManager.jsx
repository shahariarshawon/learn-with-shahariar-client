import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const QuizManager = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: 0,
    },
  ]);

  // fetch educator courses
  const fetchCourses = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        backendUrl + "/api/course/educator-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

    //   console.log("API RESPONSE:", data);

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
    //   console.log(err);
    }
  };
  useEffect(() => {
    if (isEducator) fetchCourses();
  }, [isEducator]);

const addQuestion = () => {
  setQuestions((prev) => [
    ...prev,
    {
      question: "",
      options: ["", "", "", ""],
      answer: 0,
    },
  ]);
};



 const updateQuestion = (index, field, value) => {
  setQuestions((prev) =>
    prev.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    )
  );
};

const updateOption = (qIndex, optIndex, value) => {
  setQuestions((prev) =>
    prev.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            options: q.options.map((opt, j) =>
              j === optIndex ? value : opt
            ),
          }
        : q
    )
  );
};

  const submitQuiz = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/quiz/create",
        {
          courseId: selectedCourse,
          title,
          questions,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Quiz created successfully");
        setTitle("");
        setQuestions([{ question: "", options: ["", "", "", ""], answer: 0 }]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Quiz Manager</h2>

      {/* Course select */}
      <select
        className="border p-2 w-full"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.courseTitle}
          </option>
        ))}
      </select>

      {/* Quiz title */}
      <input
        className="border p-2 w-full"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Questions */}
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Question"
            value={q.question}
            onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
          />

          {q.options.map((opt, optIndex) => (
            <input
              key={optIndex}
              className="border p-2 w-full"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
            />
          ))}

          <select
            className="border p-2 w-full"
            value={q.answer}
            onChange={(e) =>
              updateQuestion(qIndex, "answer", Number(e.target.value))
            }
          >
            <option value={0}>Correct Answer: Option 1</option>
            <option value={1}>Correct Answer: Option 2</option>
            <option value={2}>Correct Answer: Option 3</option>
            <option value={3}>Correct Answer: Option 4</option>
          </select>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-gray-600 text-white px-4 py-2"
      >
        Add Question
      </button>

      <button
        onClick={submitQuiz}
        className="bg-violet-600 text-white px-4 py-2 ml-2"
      >
        Create Quiz
      </button>
      <button
        className="bg-violet-600 text-white px-4 py-2 ml-2"
      >
        <Link to={"/"}>
        Back to Home
        </Link>
      </button>
    </div>
  );
};

export default QuizManager;
