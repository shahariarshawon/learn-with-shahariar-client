import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const EditCourse = () => {
  const { courseId } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);

  const [course, setCourse] = useState(null);

  // new chapter
  const [chapterTitle, setChapterTitle] = useState("");

  // lecture form
  const [selectedChapter, setSelectedChapter] = useState("");
  const [lecture, setLecture] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    lectureOrder: "",
    isPreviewFree: true,
  });

  // ================= FETCH COURSE =================
  const fetchCourse = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/course/${courseId}`);

      if (data.success) {
        setCourse(data.courseData);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  // ================= ADD CHAPTER =================
  const addChapter = async () => {
    if (!chapterTitle) return toast.error("Enter chapter title");

    try {
      const token = await getToken();

      const updatedContent = [
        ...course.courseContent,
        {
          chapterId: Date.now().toString(),
          chapterTitle,
          chapterOrder: course.courseContent.length + 1,
          chapterContent: [],
        },
      ];

      const { data } = await axios.put(
        backendUrl + `/api/course/update/${courseId}`,
        { courseContent: updatedContent },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Chapter added");
        setChapterTitle("");
        fetchCourse();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= ADD LECTURE =================
  const addLecture = async () => {
    if (!selectedChapter) return toast.error("Select chapter");

    try {
      const token = await getToken();

      const updatedContent = [...course.courseContent];

      const index = updatedContent.findIndex(
        (ch) => ch.chapterId === selectedChapter,
      );

      if (index === -1) return toast.error("Chapter not found");

      updatedContent[index].chapterContent.push({
        ...lecture,
        lectureId: Date.now().toString(),
      });

      const { data } = await axios.put(
        backendUrl + `/api/course/update/${courseId}`,
        { courseContent: updatedContent },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Lecture added");
        setLecture({
          lectureTitle: "",
          lectureDuration: "",
          lectureUrl: "",
          lectureOrder: "",
          isPreviewFree: true,
        });
        fetchCourse();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Edit Course</h1>

      {/* ================= COURSE INFO ================= */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold text-lg">{course.courseTitle}</h2>
        <p className="text-sm text-gray-500">{course.courseDescription}</p>
      </div>

      {/* ================= ADD CHAPTER ================= */}
      <div className="bg-white p-4 rounded-xl border space-y-3">
        <h3 className="font-semibold">Add Chapter</h3>

        <input
          className="border p-2 w-full"
          placeholder="Chapter Title"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />

        <button
          onClick={addChapter}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Chapter
        </button>
      </div>

      {/* ================= ADD LECTURE ================= */}
      <div className="bg-white p-4 rounded-xl border space-y-3">
        <h3 className="font-semibold">Add Lecture</h3>

        {/* select chapter */}
        <select
          className="border p-2 w-full"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          <option value="">Select Chapter</option>
          {course.courseContent.map((ch) => (
            <option key={ch.chapterId} value={ch.chapterId}>
              {ch.chapterTitle}
            </option>
          ))}
        </select>

        <input
          className="border p-2 w-full"
          placeholder="Lecture Title"
          value={lecture.lectureTitle}
          onChange={(e) =>
            setLecture({ ...lecture, lectureTitle: e.target.value })
          }
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Duration (minutes)"
          value={lecture.lectureDuration}
          onChange={(e) =>
            setLecture({
              ...lecture,
              lectureDuration: Number(e.target.value),
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="YouTube URL"
          value={lecture.lectureUrl}
          onChange={(e) =>
            setLecture({ ...lecture, lectureUrl: e.target.value })
          }
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Lecture Order"
          value={lecture.lectureOrder}
          onChange={(e) =>
            setLecture({
              ...lecture,
              lectureOrder: Number(e.target.value),
            })
          }
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={lecture.isPreviewFree}
            onChange={(e) =>
              setLecture({
                ...lecture,
                isPreviewFree: e.target.checked,
              })
            }
          />
          Preview Free
        </label>

        <button
          onClick={addLecture}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Lecture
        </button>
      </div>

      {/* ================= SHOW COURSE STRUCTURE ================= */}
      <div className="bg-white p-4 rounded-xl border">
        <h3 className="font-semibold mb-3">Course Structure</h3>

        {course.courseContent.map((ch, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-gray-800">
              {i + 1}. {ch.chapterTitle}
            </p>

            <ul className="ml-4 mt-2 text-sm text-gray-600">
              {ch.chapterContent.map((lec, j) => (
                <li key={j}>
                  {j + 1}. {lec.lectureTitle}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <button className="btn">
          <Link to={"/"}>Back to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default EditCourse;
