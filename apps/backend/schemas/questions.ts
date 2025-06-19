import { z } from "zod";

export const CreateQuestionSchema = z.object({
  questionText: z.string().min(1, "Question is a required field"),
  questionType: z.enum([
    "SINGLE_SELECT",
    "MULTI_SELECT",
    "MULTI_SELECT_WITH_OTHER",
    "SHORT_TEXT",
    "PARAGRAPH",
  ]),
  questionOptions: z
    .array(z.string().min(1, "Option is a required field"))
    .optional(),
});

export const CreateSurveySchema = z.object({
  questions: z.array(CreateQuestionSchema),
});

export type CreateSurveyProps = z.infer<typeof CreateSurveySchema>;
export type CreateQuestionProps = z.infer<typeof CreateQuestionSchema>;
