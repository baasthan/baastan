import { z } from "zod";

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
    questionOptions: z
      .array(z.string().min(1, "Option is a required field"))
      .optional(),
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
  questions: z.array(CreateQuestionSchema),
});

export type CreateSurveyProps = z.infer<typeof CreateSurveySchema>;
export type CreateQuestionProps = z.infer<typeof CreateQuestionSchema>;
