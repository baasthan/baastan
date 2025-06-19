import {
  insertQuestion,
  insertQuestioniare,
  insertQuestionOptions,
} from "@/repository/questions";
import { CreateSurveyProps } from "@/schemas/questions";

export const createSurvey = async ({ questions }: CreateSurveyProps) => {
  try {
    const questioniareId = await insertQuestioniare();

    if (questioniareId) {
      for (let i = 0; i < questions.length; i++) {
        const questionId = await insertQuestion({
          questioniareId,
          questionText: questions[i]!.questionText,
          questionType: questions[i]!.questionType,
        });
        const options = questions[i]!.questionOptions;
        if (questionId && options) {
          await insertQuestionOptions(questionId, options);
        }
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};
