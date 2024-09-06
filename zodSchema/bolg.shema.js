import z from "zod";

const blogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"), // Title should be a non-empty string
  content: z.string().min(1, "Content is required"), // Content should be a non-empty string
});

export { blogValidationSchema };
