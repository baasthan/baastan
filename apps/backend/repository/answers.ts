import sql from "@/lib/dbClient";
import {
  MultiSelectAnswer,
  MultiSelectWithOtherAnswer,
  ParagraphAnswer,
  SaveAnswerSchema,
  ShortAnswer,
  SingleSelectAnswer,
} from "@workspace/schema/answer";

export async function saveShortAnswer({
  questioniareId,
  questionId,
  answer,
}: Omit<SaveAnswerSchema, "answer"> & { answer: ShortAnswer }) {
  try {
    await sql`
    insert into 
    public.answers (
      questionnaire_id,
      question_id,
      short_answer
    )
    values (
      ${questioniareId},
      ${questionId},
      ${answer.shortAnswerText}
    )
  `;
    return true;
  } catch (error) {
    console.error("Unable to save short answer");
    console.debug(error);
    return false;
  }
}

export async function saveParagraphAnswer({
  questioniareId,
  questionId,
  answer,
}: Omit<SaveAnswerSchema, "answer"> & { answer: ParagraphAnswer }) {
  try {
    await sql`
    insert into 
    public.answers (
      questionnaire_id,
      question_id,
      paragraph
    )
    values (
      ${questioniareId},
      ${questionId},
      ${answer.paragraphText}
    )
  `;
    return true;
  } catch (error) {
    console.error("Unable to save paragraph answer");
    console.debug(error);
    return false;
  }
}

export async function saveSingleSelectAnswer({
  questioniareId,
  questionId,
  answer,
}: Omit<SaveAnswerSchema, "answer"> & { answer: SingleSelectAnswer }) {
  try {
    const [answerRow] = await sql`
    insert into 
    public.answers (
      questionnaire_id,
      question_id
    )
    values (
      ${questioniareId},
      ${questionId}
    ) returning id
  `;
    if (answerRow) {
      await sql`
    insert into public.answer_options (answer_id,option_id) values (${answerRow.id},${answer.optionId})
    `;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Unable to save single select answer");
    console.debug(error);
    return false;
  }
}

export async function saveMultiSelectAnswer({
  questioniareId,
  questionId,
  answer,
}: Omit<SaveAnswerSchema, "answer"> & { answer: MultiSelectAnswer }) {
  try {
    const [answerRow] = await sql`
    insert into 
    public.answers (
      questionnaire_id,
      question_id
    )
    values (
      ${questioniareId},
      ${questionId}
    ) returning id
  `;
    if (answerRow) {
      // Insert multiple option IDs
      for (const optionId of answer.optionId) {
        await sql`
        insert into public.answer_options (answer_id, option_id) values (${answerRow.id}, ${optionId})
        `;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error("Unable to save multi select answer");
    console.debug(error);
    return false;
  }
}

export async function saveMultiSelectAnswerWithOtherAnswer({
  questioniareId,
  questionId,
  answer,
}: Omit<SaveAnswerSchema, "answer"> & { answer: MultiSelectWithOtherAnswer }) {
  try {
    const [answerRow] = await sql`
    insert into 
    public.answers (
      questionnaire_id,
      question_id,
      additional_option_text
    )
    values (
      ${questioniareId},
      ${questionId},
      ${answer.additionalOptionText || null}
    ) returning id
  `;
    if (answerRow) {
      // Insert option IDs if they exist
      if (answer.optionId) {
        for (const optionId of answer.optionId) {
          await sql`
          insert into public.answer_options (answer_id, option_id) values (${answerRow.id}, ${optionId})
          `;
        }
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error("Unable to save multi select answer with other");
    console.debug(error);
    return false;
  }
}
