"use client";
import useSaveAnswers from "@/hooks/services/useSaveAnswers";
import {
  AnswerRecord,
  AnswerRecordSchema,
  MultiSelectAnswer,
} from "@workspace/schema/answer";
import { Survey } from "@workspace/schema/questions";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import React, { useState } from "react";

import { Loader2Icon } from "lucide-react";
import MultiSelect from "./multi-select";
import MultiSelectWithOther from "./multi-select-with-other";
import SingleSelect from "./single-select";

interface SurveyFormProps {
  survey: Survey;
}

const SurveyForm = ({ survey }: SurveyFormProps) => {
  const { questions, id } = survey;
  const { execute, error, isLoading, isSuccess, resetService, data } =
    useSaveAnswers();
  const [answers, setAnswers] = useState<AnswerRecord>({});
  const requiredQuestionIds = survey.questions.map((q) => q.id);

  // Validate that all required questions have answers
  const validateAnswers = () => {
    const result = AnswerRecordSchema.safeParse(answers);
    if (!result.success) return { isValid: false, data: null };

    // Check if all required questions have answers
    const hasAllRequiredAnswers = requiredQuestionIds.every(
      (id) => id in answers && answers[id] !== undefined
    );

    return {
      isValid: hasAllRequiredAnswers,
      data: hasAllRequiredAnswers ? result.data : null,
    };
  };

  const { isValid: isSchemaValid, data: parsedAnswers } = validateAnswers();

  const handleOnSubmit = async () => {
    if (parsedAnswers) {
      execute({ questioniareId: id, response: parsedAnswers });
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {questions.map((question, index) => (
        <Card key={question.id}>
          <CardHeader>
            <p className="font-semibold text-lg text-gray-800">
              {index + 1}. {question.questionText}
            </p>
          </CardHeader>
          <CardContent>
            {question.questionType === "SINGLE_SELECT" && (
              <SingleSelect
                {...question}
                questionType={question.questionType}
                onChange={(optionId) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: {
                      type: "SINGLE_SELECT",
                      optionId: parseInt(optionId),
                    },
                  }))
                }
              />
            )}
            {question.questionType === "MULTI_SELECT" && (
              <MultiSelect
                {...question}
                questionType={question.questionType}
                onChange={(optionId, checked) => {
                  setAnswers((prev) => {
                    const prevAnswer = (prev[question.id] || {
                      type: "MULTI_SELECT",
                      optionId: [],
                    }) as MultiSelectAnswer;
                    const updated = {
                      ...prevAnswer,
                      optionId: checked
                        ? [...prevAnswer.optionId, parseInt(optionId)]
                        : prevAnswer.optionId.filter(
                            (v) => v !== parseInt(optionId)
                          ),
                    };

                    return { ...prev, [question.id]: updated };
                  });
                }}
              />
            )}

            {question.questionType === "SHORT_TEXT" && (
              <Input
                type="text"
                placeholder="Please specify..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: {
                      type: "SHORT_ANSWER",
                      shortAnswerText: e.target.value,
                    },
                  }));
                }}
                className="border mt-3 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            {question.questionType === "PARAGRAPH" && (
              <Textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: {
                      type: "PARAGRAPH",
                      paragraphText: e.target.value,
                    },
                  }))
                }
              />
            )}
            {question.questionType === "MULTI_SELECT_WITH_OTHER" && (
              <MultiSelectWithOther
                {...question}
                questionType={question.questionType}
                onChange={(optionId, checked) => {
                  setAnswers((prev) => {
                    const prevAnswer = (prev[question.id] || {
                      type: "MULTI_SELECT_WITH_OTHER",
                      optionId: [],
                    }) as MultiSelectAnswer;
                    const updated = {
                      ...prevAnswer,
                      optionId: checked
                        ? [...prevAnswer.optionId, parseInt(optionId)]
                        : prevAnswer.optionId.filter(
                            (v) => v !== parseInt(optionId)
                          ),
                    };

                    return { ...prev, [question.id]: updated };
                  });
                }}
                onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAnswers((prev) => {
                    const currentAnswer = prev[question.id] || {};

                    return {
                      ...prev,
                      [question.id]: {
                        ...currentAnswer,
                        type: "MULTI_SELECT_WITH_OTHER",
                        additionalOptionText: e.target.value,
                      },
                    };
                  });
                }}
              />
            )}
          </CardContent>
        </Card>
      ))}
      <Button
        type="submit"
        disabled={!isSchemaValid || isLoading}
        onClick={handleOnSubmit}
      >
        {isLoading && <Loader2Icon className="animate-spin" />}
        Submit
      </Button>
    </div>
  );
};

export default SurveyForm;
