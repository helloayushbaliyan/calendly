import z from "zod";

export const signinSchema = z.object({
    email: z
        .email("invalid email")
        .min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(6, "password must be atleast 6 characters")
        .min(1, { message: "Password is required" }),

});

export const signupSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    email: z.email("invalid email").min(1, { message: "email is required" }),
    password: z
        .string()
        .min(6, "password must be atleast 6 characters")
        .min(1, { message: "Password is required" }),
});

