import * as yup from "yup";

export const productAddSchema=yup.object({
    title:yup.string().required("Title is required"),
    subtitle:yup.string().required("subtitle is required"),
    content:yup.string().required("Content is required"),
})

