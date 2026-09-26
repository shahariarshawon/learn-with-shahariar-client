import { z } from "zod";

/**
 * Course Creation Form Validation Schema
 */
export const courseCreateSchema = z.object({
  courseTitle: z
    .string()
    .min(5, { message: "Course title must be at least 5 characters long." })
    .max(100, { message: "Course title cannot exceed 100 characters." }),
  courseDescription: z
    .string()
    .min(20, { message: "Course description must be at least 20 characters long." }),
  courseCategory: z.string().min(1, { message: "Please select a course category." }),
  coursePrice: z.number().min(0, { message: "Price cannot be negative." }),
  discount: z.number().min(0).max(100, { message: "Discount must be between 0 and 100%." }),
});

/**
 * Checkout Payment Form Validation Schema
 */
export const checkoutFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required (min 3 characters)." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  paymentMethod: z.enum(["stripe", "bkash", "nagad", "sslcommerz"], {
    errorMap: () => ({ message: "Please select a payment gateway." }),
  }),
  couponCode: z.string().optional(),
});

/**
 * Review Rating Form Validation Schema
 */
export const reviewFormSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating from 1 to 5 stars." }).max(5),
  comment: z
    .string()
    .min(10, { message: "Review comment must be at least 10 characters long." })
    .max(500, { message: "Comment cannot exceed 500 characters." }),
});

/**
 * AI Assistant Input Prompt Validation Schema
 */
export const aiPromptSchema = z.object({
  prompt: z
    .string()
    .min(2, { message: "Prompt must be at least 2 characters long." })
    .max(1000, { message: "Prompt cannot exceed 1000 characters." }),
});
