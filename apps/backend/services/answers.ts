import {
  saveMultiSelectAnswer,
  saveMultiSelectAnswerWithOtherAnswer,
  saveParagraphAnswer,
  saveShortAnswer,
  saveSingleSelectAnswer,
} from "@/repository/answers";
import { SaveAnswerSchema } from "@workspace/schema/answer";

export function saveAnswer({
  questioniareId,
  questionId,
  answer,
}: SaveAnswerSchema) {
  console.log(answer);
  if (answer.type === "SHORT_ANSWER") {
    saveShortAnswer({ questioniareId, questionId, answer });
  }
  if (answer.type === "PARAGRAPH") {
    saveParagraphAnswer({ questioniareId, questionId, answer });
  }
  if (answer.type === "SINGLE_SELECT") {
    saveSingleSelectAnswer({ questioniareId, questionId, answer });
  }
  if (answer.type === "MULTI_SELECT") {
    saveMultiSelectAnswer({ questioniareId, questionId, answer });
  }
  if (answer.type === "MULTI_SELECT_WITH_OTHER") {
    saveMultiSelectAnswerWithOtherAnswer({
      questioniareId,
      questionId,
      answer,
    });
  }
}
