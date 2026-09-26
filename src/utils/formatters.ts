import { Course } from "@/types";

export const calculateRating = (course: Partial<Course> | null | undefined): number => {
  if (!course || !course.courseRatings || course.courseRatings.length === 0) {
    return 0;
  }
  const totalRating = course.courseRatings.reduce((sum, item) => sum + (Number(item.rating) || 0), 0);
  return Math.floor(totalRating / course.courseRatings.length);
};

export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return price - (discount * price) / 100;
};

export const formatPrice = (amount: number, currency = "USD"): string => {
  return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
};
