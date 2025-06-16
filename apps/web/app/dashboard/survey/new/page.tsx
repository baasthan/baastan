"use client";
import useSaveQuestioniare from "@/hooks/services/useSaveQuestioniare";
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
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { Loader2Icon, Trash2 } from "lucide-react";
import React, { useState } from "react";

const NewSurveyPage = () => {
  const [survey, setSurvey] = useState<CreateSurveyProps>({
    surveyText: "",
    surveyDescription: "",
    isLive: false,
    questions: [
      {
        questionText: "",
        questionType: "SHORT_TEXT",
        questionOptions: null,
      },
    ],
  });

  const {
    execute,
    isLoading,
    error: saveError,
    isSuccess,
    resetService,
  } = useSaveQuestioniare();

  const handleSurveyTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetService();
    setSurvey((value) => ({ ...value, surveyText: e.target.value }));
  };

  const handleSurveyDiscriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    resetService();
    setSurvey((value) => ({ ...value, surveyDescription: e.target.value }));
  };

  const handleAddQuestion = () => {
    resetService();
    const newQuestion: CreateQuestionProps = {
      questionText: "",
      questionType: "SHORT_TEXT",
      questionOptions: null,
    };

    setSurvey((value) => ({
      ...value,
      questions: [...value.questions, newQuestion],
    }));
  };

  const handleQuestionTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    resetService();
    const updatedQuestions = [...survey.questions];
    const currentQuestion = updatedQuestions[index];
    if (currentQuestion) {
      currentQuestion.questionText = e.target.value;
      updatedQuestions[index] = currentQuestion;
      setSurvey((value) => ({ ...value, questions: updatedQuestions }));
    }
  };

  const handleQuestionTypeChange = (
    value: CreateQuestionProps["questionType"],
    index: number
  ) => {
    resetService();
    const updatedQuestions = [...survey.questions];
    const currentQuestion = updatedQuestions[index];
    if (currentQuestion) {
      currentQuestion.questionType = value;
      if (
        ["SINGLE_SELECT", "MULTI_SELECT"].includes(currentQuestion.questionType)
      ) {
        currentQuestion.questionOptions = [
          { optionText: "" },
          { optionText: "" },
        ];
      }
      if (currentQuestion.questionType === "MULTI_SELECT_WITH_OTHER") {
        currentQuestion.questionOptions = [{ optionText: "" }];
      }
      if (["SHORT_TEXT", "PARAGRAPH"].includes(currentQuestion.questionType)) {
        currentQuestion.questionOptions = null;
      }
      updatedQuestions[index] = currentQuestion;
      setSurvey((value) => ({ ...value, questions: updatedQuestions }));
    }
  };

  const handleQuestionOptionTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    optionIndex: number
  ) => {
    resetService();
    const updatedQuestions = [...survey.questions];
    const currentQuestion = updatedQuestions[questionIndex];
    if (currentQuestion) {
      const currentQuestionOption = currentQuestion.questionOptions;
      if (currentQuestionOption && currentQuestionOption[optionIndex]) {
        currentQuestionOption[optionIndex].optionText = e.target.value;
      }
      currentQuestion.questionOptions = currentQuestionOption;
      updatedQuestions[questionIndex] = currentQuestion;
      setSurvey((value) => ({ ...value, questions: updatedQuestions }));
    }
  };

  const handleQuestionAddOption = (questionIndex: number) => {
    resetService();
    const updatedQuestions = [...survey.questions];
    const currentQuestion = updatedQuestions[questionIndex];
    if (currentQuestion) {
      console.log("valid current question");
      const currentQuestionOption = currentQuestion.questionOptions;
      if (currentQuestionOption) {
        const updatedQuestionQuestionOption = [
          ...currentQuestionOption,
          { optionText: "" },
        ];
        currentQuestion.questionOptions = updatedQuestionQuestionOption;
      }
      updatedQuestions[questionIndex] = currentQuestion;
      console.log(updatedQuestions);
      setSurvey((value) => ({ ...value, questions: updatedQuestions }));
    }
  };

  const handleOptionDelete = (questionIndex: number, optionIndex: number) => {
    resetService();
    const updatedQuestions = [...survey.questions];
    const currentQuestion = updatedQuestions[questionIndex];
    if (currentQuestion && currentQuestion.questionOptions) {
      currentQuestion.questionOptions.splice(optionIndex, 1);
      updatedQuestions[questionIndex] = currentQuestion;
      setSurvey((value) => ({ ...value, questions: updatedQuestions }));
    }
  };

  const handleSaveSurvey = async () => {
    resetService();
    if (isSchemaValid && data) {
      await execute(data);
    }
  };

  const { success: isSchemaValid, data } = CreateSurveySchema.safeParse(survey);

  return (
    <Card className="my-4">
      <CardHeader>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Create a survey
        </h3>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <div className="flex flex-col gap-2">
          <Label htmlFor="surveyTitle" className="text-foreground text-xl">
            Survey Title
            <span className="text-destructive">*</span>
          </Label>
          <Input
            autoFocus
            id="surveyTitle"
            placeholder="Enter Survey title"
            value={survey.surveyText}
            onChange={handleSurveyTitle}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="surveyDescription"
            className="text-xl text-foreground"
          >
            Survey Descriprtion
          </Label>
          <Textarea
            id="surveyDescription"
            placeholder="Enter Survey Description"
            onChange={handleSurveyDiscriptionChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          {survey.questions.map((question, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex flex-col items-baseline md:flex-row gap-2">
                <p>{index + 1}.</p>
                <Input
                  value={question.questionText}
                  autoFocus
                  placeholder="Enter Question"
                  className="flex-2/3"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleQuestionTextChange(e, index);
                  }}
                />
                <Select
                  value={question.questionType}
                  onValueChange={(value) =>
                    handleQuestionTypeChange(
                      value as CreateQuestionProps["questionType"],
                      index
                    )
                  }
                >
                  <SelectTrigger className="flex-1/3">
                    <SelectValue placeholder="Select a question type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "SINGLE_SELECT",
                      "MULTI_SELECT",
                      "MULTI_SELECT_WITH_OTHER",
                      "SHORT_TEXT",
                      "PARAGRAPH",
                    ].map((selectOptions) => (
                      <SelectItem key={selectOptions} value={selectOptions}>
                        {selectOptions}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                {question.questionOptions &&
                  question.questionOptions.map((option, optionIndex) => (
                    <div className="flex flex-row gap-2 pl-6 items-center">
                      <p>{String.fromCharCode(97 + optionIndex)}.</p>
                      <Input
                        key={optionIndex}
                        autoFocus
                        value={option.optionText}
                        placeholder="Enter Option"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleQuestionOptionTextChange(e, index, optionIndex);
                        }}
                      />
                      <Button
                        variant={"ghost"}
                        onClick={() => handleOptionDelete(index, optionIndex)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                {[
                  "SINGLE_SELECT",
                  "MULTI_SELECT",
                  "MULTI_SELECT_WITH_OTHER",
                ].includes(question.questionType) && (
                  <Button
                    variant="link"
                    className=" self-end"
                    disabled={!isSchemaValid}
                    onClick={() => handleQuestionAddOption(index)}
                  >
                    + Add Option
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {isSuccess === false && (
          <p className=" text-destructive text-sm">
            {saveError || "Something went wrong"}
          </p>
        )}
        <CardAction className="flex flex-row flex-wrap gap-4">
          <Button
            disabled={!isSchemaValid || isLoading || isSuccess === false}
            onClick={() => handleSaveSurvey()}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            Save Survey
          </Button>
          <Button
            disabled={!isSchemaValid || isLoading || isSuccess === false}
            variant="outline"
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
          <Switch
            id="is-live"
            checked={survey.isLive}
            onCheckedChange={(isChecked) =>
              setSurvey((value) => ({ ...value, isLive: isChecked }))
            }
          ></Switch>
          <Label htmlFor="is-live">Airplane Mode</Label>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default NewSurveyPage;
