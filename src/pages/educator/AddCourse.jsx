import React, { act, useContext, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Quill from "quill";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Logger from "../../components/Logger";

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: nanoid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId),
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter,
        ),
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        }),
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: nanoid(),
          };
          // console.log("LectureId" , lectureId);
          // console.log("Lecture", newLecture);
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      }),
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!image) {
        toast.error("Thumbnail Not Selected");
        return; // Prevent further execution
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        // isPublished: true, // ✅ Fix: Include isPublished field
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData)); // ✅ Ensure courseData is sent as JSON
      formData.append("image", image); // ✅ Ensure image is sent correctly

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/educator/add-course",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // console.log("data", data);

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error.message);
    }
  };

  useEffect(() => {
    // initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-8"
        >
          {/* Mobile Logger */}
          <div className="block sm:hidden">
            <Logger />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Course
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details below to publish your course
            </p>
          </div>

          {/* Course Title */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Course Title</p>
            <input
              onChange={(e) => setCourseTitle(e.target.value)}
              value={courseTitle}
              type="text"
              placeholder="e.g. MERN Stack Full Course"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">
              Course Description
            </p>
            <div className="border rounded-lg overflow-hidden">
              <div ref={editorRef} className="min-h-[150px]" />
            </div>
          </div>

          {/* Price + Thumbnail */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">Course Price</p>
              <input
                onChange={(e) => setCoursePrice(e.target.value)}
                value={coursePrice}
                type="number"
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Course Thumbnail
              </p>

              <label
                htmlFor="thumbnailImage"
                className="flex items-center gap-3 border border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
              >
                <img src={assets.file_upload_icon} className="w-6" />
                <span className="text-sm text-gray-500">
                  Click to upload image
                </span>
                <input
                  type="file"
                  id="thumbnailImage"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="mt-2 h-16 rounded-lg"
                  alt=""
                />
              )}
            </div>
          </div>

          {/* Discount */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Discount (%)</p>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              type="number"
              min={0}
              max={100}
              className="w-32 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Chapters Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Course Content
            </h2>

            {chapters.map((chapter, chapterIndex) => (
              <div
                key={chapter.chapterId}
                className="border rounded-xl bg-white shadow-sm"
              >
                {/* Chapter Header */}
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center gap-2">
                    <img
                      onClick={() => handleChapter("toggle", chapter.chapterId)}
                      className={`w-4 cursor-pointer transition ${
                        chapter.collapsed && "-rotate-90"
                      }`}
                      src={assets.dropdown_icon}
                    />
                    <span className="font-semibold text-gray-800">
                      {chapterIndex + 1}. {chapter.chapterTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures
                    </span>
                    <img
                      onClick={() => handleChapter("remove", chapter.chapterId)}
                      src={assets.cross_icon}
                      className="w-4 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Lectures */}
                {!chapter.collapsed && (
                  <div className="p-4 space-y-3">
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div
                        key={lectureIndex}
                        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 truncate">
                          {lectureIndex + 1}. {lecture.lectureTitle}
                        </span>

                        <img
                          onClick={() =>
                            handleLecture(
                              "remove",
                              chapter.chapterId,
                              lectureIndex,
                            )
                          }
                          src={assets.cross_icon}
                          className="w-4 cursor-pointer"
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleLecture("add", chapter.chapterId)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add Chapter */}
            <button
              type="button"
              onClick={() => handleChapter("add")}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              + Add Chapter
            </button>
          </div>

          {/* Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative space-y-4">
                <h2 className="text-lg font-semibold">Add Lecture</h2>

                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />

                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Lecture URL"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                  Free Preview
                </label>

                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Lecture
                </button>

                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Publish Course
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
