import * as z from "zod";

export const onboardingValidation = z.object({
  description: z
    .string()
    .max(50, {
      message: "Description should not exceed 50 characters.",
    })
    .nonempty({
      message: "Description cannot be empty.",
    }),
  role: z.string(),
});
