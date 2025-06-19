"use client";
import SingleSelect from "@/components/questions-components/dashboard/single-select";
import { BACKEND_API_HOST } from "@/constants/services";
import { useAuth } from "@clerk/nextjs";
import {
  CreateQuestionProps,
  CreateSurveyProps,
  CreateSurveySchema,
} from "@workspace/schema/questions";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@workspace/ui/components/card";
import { useCallback, useState } from "react";

const page = () => {
  const { getToken } = useAuth();

  const [questions, setQuestions] = useState<
    (CreateQuestionProps | undefined)[]
  >([undefined]);
  const [isDirty, setIsDirty] = useState<boolean[]>([true]);

  const handleAddQuestion = () => {
    setQuestions([...questions, undefined]);
    setIsDirty([...isDirty, true]);
  };

  const handleEditState = (index: number, dirty: boolean) => {
    const dirtyArray = [...isDirty];
    dirtyArray[index] = dirty;
    setIsDirty(dirtyArray);
  };

  const handleQuestion = (index: number, question: CreateQuestionProps) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index] = question;
    const dirtyArray = [...isDirty];
    dirtyArray[index] = false;
    setQuestions(updatedQuestion);
    setIsDirty(dirtyArray);
  };

  const handleSaveSurvey = async (surveyProps: CreateSurveyProps) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${BACKEND_API_HOST}/survey/dashboard/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(surveyProps),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save survey");
      }
    } catch (error) {
      console.error("Error occuerd while saving survey", error);
    }
  };

  const validate = useCallback(() => {
    return CreateSurveySchema.safeParse({ questions });
  }, [questions]);

  const { success, data, error } = validate();

  return (
    <div className="flex flex-col  p-5">
      <Card>
        <CardHeader>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Create Survey
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {questions.map((_, index) => (
            <SingleSelect
              handleSaveQuestion={(q) => handleQuestion(index, q)}
              isDirty={isDirty[index] || false}
              setIsDirty={(dirty) => handleEditState(index, dirty)}
              key={index}
            ></SingleSelect>
          ))}
          <Button
            variant="link"
            className="w-fit mx-auto"
            disabled={isDirty.some((d) => d)}
            onClick={handleAddQuestion}
          >
            + Add Question
          </Button>

          <CardAction className=" flex flex-row gap-4">
            <Button
              className=" self-end"
              onClick={() => {
                if (success) {
                  console.log(questions, data);
                  handleSaveSurvey(data);
                }
              }}
            >
              Create Questioniare
            </Button>
            <Button variant={"outline"}>Save</Button>
          </CardAction>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
