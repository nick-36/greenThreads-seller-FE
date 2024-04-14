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

enum FormType {
  SIGN_IN = "SIGN_IN",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

const defaultSignInSchema = z.object({
  _step: z.nativeEnum(FormType),
});

const SignInStepSchema = z.object({
  _step: z.literal(FormType.SIGN_IN),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z.string().min(4, {
    message: "Password must contain atlease 4 character.",
  }),
});

const ForgotPasswordStepSchema = z.object({
  _step: z.literal(FormType.FORGOT_PASSWORD),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
});

const schemaConditions = z.discriminatedUnion("_step", [
  SignInStepSchema,
  ForgotPasswordStepSchema,
]);

export const SignInValidation = z.intersection(
  schemaConditions,
  defaultSignInSchema
);
// export const SignInValidation = z.object({
//   email: z
//     .string({
//       required_error: "Email is required",
//     })
//     .email({ message: "Invalid email address" }),
//   password: z.string(),
// });
