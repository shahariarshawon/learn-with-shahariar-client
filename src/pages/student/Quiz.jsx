import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";

const Quiz = () => {
  const { courseId } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // fetch quiz
  const fetchQuiz = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        `${backendUrl}/api/quiz/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setQuiz(data.quiz);
      } else {
        toast.error(data.message);
        navigate(`/player/${courseId}`);
      }

    } catch (err) {
      toast.error("Failed to load quiz");
      navigate(`/player/${courseId}`);
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  // handle option select
  const handleSelect = (qIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  // submit quiz
  const handleSubmit = () => {
    if (!quiz) return;

    let calculatedScore = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) return <Loading />;

  if (!quiz)
    return (
      <div className="p-6">
        <p>No quiz available.</p>
      </div>
    );

  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">
        {quiz.title}
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Answer all questions and submit
      </p>

      {/* Questions */}
      <div className="mt-6 space-y-6">
        {quiz.questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <p className="font-medium text-gray-800">
              {qIndex + 1}. {q.question}
            </p>

            <div className="mt-3 space-y-2">
              {q.options.map((opt, optIndex) => (
                <label
                  key={optIndex}
                  className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer ${
                    answers[qIndex] === optIndex
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${qIndex}`}
                    checked={answers[qIndex] === optIndex}
                    onChange={() =>
                      handleSelect(qIndex, optIndex)
                    }
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-6 p-4 border rounded-xl bg-gray-50">
          <h2 className="text-xl font-semibold">
            Result
          </h2>

          <p className="mt-2">
            Score: {score} / {total}
          </p>

          <p className="mt-1">
            Percentage: {percentage}%
          </p>

          <p className={`mt-2 font-medium ${
            percentage >= 50 ? "text-green-600" : "text-red-600"
          }`}>
            {percentage >= 50 ? "Passed 🎉" : "Failed ❌"}
          </p>

          <button
            onClick={() => navigate(`/player/${courseId}`)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
          >
            Back to Course
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;