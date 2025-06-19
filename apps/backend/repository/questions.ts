import sql from "@/lib/dbClient";

export interface Question {
  id: string;
  questioniareId: string;
  questionText: string;
  questionType:
    | "SINGLE_SELECT"
    | "MULTI_SELECT"
    | "MULTI_SELECT_WITH_OTHER"
    | "SHORT_TEXT"
    | "PARAGRAPH";
  options: string[];
}

export type QuestionProps = Omit<Question, "id">;

export interface CreateQuestioniare {
  id: string;
}

export async function getQuestionsByQuestioniareId(qId: string) {
  try {
    const questions = sql<Question[]>`
      select q.id as "id",
      q.question_text as "questionText",
      q.question_type as "questionType",
      ARRAY_AGG(qo.option_text) as "options"
    from public.questions q
      inner join public.question_options qo
        on qo.question_id = q.id
      inner join public.questionnaires mq
        on mq.id = q.questionnaire_id
      group by q.id
    `;

    return questions;
  } catch (error) {
    console.error("Error while fetching questions from DB");
    console.debug(error);
  }
}

export async function insertQuestioniare() {
  try {
    const result = await sql<Partial<Question[]>>`
      insert into 
        public.questionnaires 
      default values 
      returning id
    `;
    if (result[0]?.id) {
      return result[0].id;
    }
    return null;
  } catch (error) {
    console.error("Unable to create questioniare");
    console.debug(error);
    return null;
  }
}

export async function insertQuestion({
  questioniareId,
  questionText,
  questionType,
}: Omit<QuestionProps, "options">) {
  try {
    const questionInsert = await sql<Partial<Question[]>>`
      insert into public.questions 
      (
        questionnaire_id,
        question_text,
        question_type
      ) values (
        ${questioniareId},
        ${questionText},
        ${questionType}
      ) returning (id);
    `;
    if (questionInsert[0]?.id) {
      return questionInsert[0].id;
    }
    return null;
  } catch (error) {
    console.error("Unable to insert question");
    console.debug(error);
    return null;
  }
}

export async function insertQuestionOptions(
  questionId: string,
  options: string[]
) {
  await Promise.all(
    options.map(
      (option) => sql`
        insert into
          public.question_options (question_id,option_text)
        values
          (${questionId},${option});
      `
    )
  );
}
