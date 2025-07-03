import sql from "@/lib/dbClient";
import {
  CreateQuestionProps,
  CreateSurveyProps,
  Question,
  Survey,
} from "@workspace/schema/questions";

export type QuestionProps = Omit<Question, "id"> & {
  questioniareId: string;
};

export interface CreateQuestioniare {
  id: string;
}

export async function getSurveys() {
  try {
    const survey = await sql<Required<Omit<Survey, "questions">>[]>`
      select
        mq.id as "id",
        mq.survey_text as "surveyText",
        mq.survey_description as "surveyDescription",
        mq.is_live as "isLive"
      from public.questionnaires mq
    `;
    return survey;
  } catch (error) {
    console.error("Error occured while fetching surveys from DB");
    console.debug(error);
    return null;
  }
}

export async function updateSurveyStatus(id: string, isLive: boolean) {
  try {
    await sql`
      update  public.questionnaires  
      set 
      is_live = ${isLive} 
      where id=${id};
    `;
    return true;
  } catch (error) {
    console.error("Error while updateing questioniares");
    console.debug(error);
    return false;
  }
}

export async function getQuestionsByQuestioniareId(qId: string) {
  try {
    const survey = await sql<Required<Omit<Survey, "questions">>[]>`
      select
        mq.id as "id",
        mq.survey_text as "surveyText",
        mq.survey_description as "surveyDescription",
        mq.is_live as "isLive"
      from public.questionnaires mq
      where
        mq.id=${qId}
      and
        mq.is_live=true;
    `;
    if (survey.count === 1 && survey[0]?.id) {
      const questions = await sql<Question[]>`
        select q.id as "id",
        q.question_text as "questionText",
        q.question_type as "questionType",
        CASE 
          WHEN q.question_type IN ('PARAGRAPH', 'SHORT_TEXT') THEN NULL
        ELSE 
          JSON_AGG(JSON_build_object('id',qo.id,'optionText',qo.option_text))
        END as "questionOptions"
      from public.questions q
        left join public.question_options qo
          on qo.question_id = q.id
        inner join public.questionnaires mq
          on mq.id = q.questionnaire_id
          and mq.id=${qId}
        group by q.id
    `;
      const surveyResult: Survey = {
        ...survey[0],
        questions: [
          ...questions.flatMap((q) => ({
            id: q.id,
            questionText: q.questionText,
            questionType: q.questionType,
            questionOptions: q.questionOptions,
          })),
        ],
      };
      console.log(surveyResult.questions);
      return surveyResult;
    }
    return null;
  } catch (error) {
    console.error("Error while fetching questions from DB");
    console.debug(error);
    return null;
  }
}

export async function insertQuestioniare({
  isLive = false,
  surveyText,
  surveyDescription,
}: Omit<CreateSurveyProps, "questions">) {
  try {
    const result = await sql<Partial<Question[]>>`
      insert into public.questionnaires (
        survey_text,
        survey_description,
        is_live
      )
      values (
        ${surveyText},
        ${surveyDescription || null},
        ${isLive}
      )
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
}: Omit<CreateQuestionProps, "questionOptions"> & { questioniareId: string }) {
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

export async function insertQuestionOptions({
  questionId,
  questionOptions,
}: Pick<CreateQuestionProps, "questionOptions"> & { questionId: string }) {
  if (questionOptions) {
    await Promise.all(
      questionOptions.map(
        (option) => sql`
        insert into public.question_options (
            question_id,
            option_text
          )
        values (
          ${questionId},
          ${option.optionText}
        )
      `
      )
    );
  }
}
