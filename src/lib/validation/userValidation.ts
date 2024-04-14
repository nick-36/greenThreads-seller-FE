import * as z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const UserValidation = z.object({
  username: z
    .string({
      required_error: "Username name is required",
      invalid_type_error: "Username name must be a string",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  mobile: z.string().regex(phoneRegex, "Invalid Number!"),
  profileImg: z.string(),
  password: z.string().min(4),
});

export const SignInValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z.string(),
});
