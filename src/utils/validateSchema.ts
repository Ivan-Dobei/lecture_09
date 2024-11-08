import * as Yup from "yup";

export const validationSchema = Yup.object({
    username: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
    password: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more")
});