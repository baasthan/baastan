import {
  insertQuestion,
  insertQuestioniare,
  insertQuestionOptions,
} from "@/repository/questions";
import { CreateSurveyProps } from "@workspace/schema/questions";

export const createSurvey = async ({
  isLive,
  surveyText,
  surveyDescription,
  questions,
}: CreateSurveyProps) => {
  try {
    const questioniareId = await insertQuestioniare({
      isLive,
      surveyText,
      surveyDescription,
    });

    if (questioniareId) {
      for (let i = 0; i < questions.length; i++) {
        const questionId = await insertQuestion({
          questioniareId,
          questionText: questions[i]!.questionText,
          questionType: questions[i]!.questionType,
        });
        const options = questions[i]!.questionOptions;
        if (questionId && options) {
          await insertQuestionOptions({ questionId, questionOptions: options });
        }
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};
