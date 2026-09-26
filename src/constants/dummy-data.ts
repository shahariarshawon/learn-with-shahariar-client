import { Course } from "@/types";

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  feedback: string;
}

export const dummyEducatorData = {
  _id: "675ac1512100b91a6d9b8b24",
  name: "GreatStack",
  email: "user.greatstack@gmail.com",
  imageUrl:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yclFkaDBOMmFqWnBoTTRBOXZUanZxVlo0aXYifQ",
  createdAt: "2024-12-12T10:56:17.930Z",
  updatedAt: "2024-12-12T10:56:17.930Z",
  __v: 0,
};

export const dummyTestimonials: Testimonial[] = [
  {
    name: "Michel Togure",
    role: "Student @ AKTU",
    image: "https://i.postimg.cc/GhbKqM65/author2.jpg",
    rating: 5,
    feedback:
      "Learn with Shahariar has revolutionized my teaching experience. The platform is intuitive, making course creation and student engagement seamless.",
  },
  {
    name: "Margaret Rose",
    role: "Student @ KNIT",
    image: "https://i.postimg.cc/nz8Y7TvT/author1.jpg",
    rating: 4.8,
    feedback:
      "Learn with Shahariar provides an exceptional learning environment. The structured courses, real-time tracking, and user-friendly interface are top-notch.",
  },
  {
    name: "Olivia Martinez",
    role: "Software Engineer @ Microsoft",
    image: "https://i.postimg.cc/Nfb4V6cf/author6.jpg",
    rating: 4.7,
    feedback:
      "Learn with Shahariar is a fantastic platform for upskilling. Its diverse course library and smooth UI make learning highly effective and engaging.",
  },
];

export const dummyDashboardData = {
  totalEarnings: 707.38,
  enrolledStudentsData: [
    {
      courseTitle: "Introduction to JavaScript",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
    {
      courseTitle: "Advanced Python Programming",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
    {
      courseTitle: "Web Development Bootcamp",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
  ],
  totalCourses: 8,
};

export const dummyCourses: Course[] = [
  {
    _id: "605c72efb3f1c2b1f8e4e1a1",
    courseTitle: "Introduction to JavaScript",
    courseDescription:
      "<h2>Learn the Basics of JavaScript</h2><p>JavaScript is a versatile programming language that powers the web. In this course, you will learn the fundamentals of JavaScript, including syntax, data types, and control structures.</p>",
    coursePrice: 49.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Getting Started with JavaScript",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is JavaScript?",
            lectureDuration: 16,
            lectureUrl: "https://youtu.be/CBWnBi-awSA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Setting Up Your Environment",
            lectureDuration: 19,
            lectureUrl: "https://youtu.be/4l87c2aeB4I",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: ["user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V"],
    courseRatings: [{ userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w", rating: 5 }],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T04:47:44.701Z",
    courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/maxresdefault.jpg",
  },
];
