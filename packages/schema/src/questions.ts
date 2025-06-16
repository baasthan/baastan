import { z } from "zod";

export const CreateOptionsSchema = z.object({
  optionText: z.string().min(1, "Option is required"),
});

export const CreateQuestionSchema = z
  .object({
    questionText: z.string().min(1, "Question is a required field"),
    questionType: z.enum([
      "SINGLE_SELECT",
      "MULTI_SELECT",
      "MULTI_SELECT_WITH_OTHER",
      "SHORT_TEXT",
      "PARAGRAPH",
    ]),
    questionOptions: z.array(CreateOptionsSchema).nullable(),
  })
  .superRefine((data, ctx) => {
    const { questionType, questionOptions } = data;
    const isSelectableType = [
      "SINGLE_SELECT",
      "MULTI_SELECT",
      "MULTI_SELECT_WITH_OTHER",
    ].includes(questionType);

    if (isSelectableType) {
      if (!questionOptions || questionOptions.length === 0) {
        ctx.addIssue({
          path: ["questionOptions"],
          code: "custom",
          message: "Options are required for selectable question types",
        });
      }
      if (
        (questionType === "SINGLE_SELECT" || questionType === "MULTI_SELECT") &&
        questionOptions &&
        questionOptions.length < 2
      ) {
        ctx.addIssue({
          path: ["questionOptions"],
          code: "custom",
          message: "Atleast 2 options are required",
        });
      }

      if (
        questionType === "MULTI_SELECT_WITH_OTHER" &&
        questionOptions &&
        questionOptions.length < 1
      ) {
        ctx.addIssue({
          path: ["questionOptions"],
          code: "custom",
          message: "Atleast 1 options are required",
        });
      }
    }
  });

export const CreateSurveySchema = z.object({
  surveyText: z.string().min(1, "Survey Title is required"),
  surveyDescription: z.string().min(1, "Survey Description is required"),
  isLive: z.boolean(),
  questions: z
    .array(CreateQuestionSchema)
    .min(1, "Questions are required to create survey"),
});

export const SurveySchema = z.object({});

export type CreateSurveyProps = z.infer<typeof CreateSurveySchema>;
export type CreateQuestionProps = z.infer<typeof CreateQuestionSchema>;
export type CreateQuestionOption = z.infer<typeof CreateOptionsSchema>;
export interface Question extends CreateQuestionProps {
  id: string;
}

export interface QuestionOptions {
  id: string;
  optionText: string;
}

export interface Question {
  id: string;
  questionText: string;
  questionType:
    | "SINGLE_SELECT"
    | "MULTI_SELECT"
    | "MULTI_SELECT_WITH_OTHER"
    | "SHORT_TEXT"
    | "PARAGRAPH";
  questionOptions: QuestionOptions[] | null;
}

export interface Survey {
  id: string;
  surveyText: string;
  surveyDescription: string;
  isLive: boolean;
  questions: Question[];
}
