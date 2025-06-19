"use client";
import {
  CreateQuestionProps,
  CreateQuestionSchema,
} from "@workspace/schema/questions";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Circle, Square } from "lucide-react";
import React, { useState } from "react";

interface QuestionComponentProps {
  isDirty: boolean;
  setIsDirty: (v: boolean) => void;
  handleSaveQuestion: (question: CreateQuestionProps) => void;
}
const SingleSelect = ({
  isDirty,
  setIsDirty,
  handleSaveQuestion,
}: QuestionComponentProps) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<
    | "SINGLE_SELECT"
    | "MULTI_SELECT"
    | "MULTI_SELECT_WITH_OTHER"
    | "SHORT_TEXT"
    | "PARAGRAPH"
    | ""
  >("");

  const [questionOptions, setQuestionOptions] = useState<string[]>([""]);

  const shouldDisplayOptions =
    questionType &&
    ["SINGLE_SELECT", "MULTI_SELECT", "MULTI_SELECT_WITH_OTHER"].includes(
      questionType
    );

  const handleQuestionTextUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeUpdate = (
    value: CreateQuestionProps["questionType"] | ""
  ) => {
    setIsDirty(true);
    setQuestionType(value);
  };

  const handleQuestionOptionUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...questionOptions];
    updatedOptions[index] = e.target.value;
    setIsDirty(true);
    setQuestionOptions(updatedOptions);
  };

  const validate = React.useCallback(() => {
    const options = shouldDisplayOptions ? questionOptions : undefined;
    return CreateQuestionSchema.safeParse({
      questionText,
      questionType,
      questionOptions: options,
    });
  }, [questionText, questionType, questionOptions]);

  const { success, data, error } = validate();

  return (
    <>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          value={questionText}
          onChange={handleQuestionTextUpdate}
          className="bg-accent font-bold"
          autoFocus
        />
        <Select
          disabled={questionText === ""}
          value={questionType}
          onValueChange={(value) =>
            handleQuestionTypeUpdate(
              value as CreateQuestionProps["questionType"]
            )
          }
        >
          <SelectTrigger className="border-0">
            <SelectValue
              placeholder="Select question type"
              className=""
            ></SelectValue>
          </SelectTrigger>

          <SelectContent>
            {[
              "SINGLE_SELECT",
              "MULTI_SELECT",
              "MULTI_SELECT_WITH_OTHER",
              "SHORT_TEXT",
              "PARAGRAPH",
            ].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {shouldDisplayOptions && (
          <div className="flex flex-col gap-2">
            {questionOptions.map((opt, index) => {
              return (
                <div className=" flex flex-row gap-2 pl-4 items-center">
                  {questionType !== "SINGLE_SELECT" ? (
                    <Square className="size-4" />
                  ) : (
                    <Circle />
                  )}
                  <Input
                    key={index}
                    type="text"
                    value={opt}
                    autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleQuestionOptionUpdate(e, index);
                    }}
                  />
                </div>
              );
            })}
            <Button
              className="self-end"
              variant={"ghost"}
              disabled={questionOptions[questionOptions.length - 1] === ""}
              onClick={() => setQuestionOptions([...questionOptions, ""])}
            >
              Add New Option
            </Button>
          </div>
        )}

        {/* <Button
          disabled={!success || !isDirty}
          onClick={() => {
            if (success) {
              handleSaveQuestion(data);
            }
          }}
        >
          Save
        </Button> */}
      </div>
    </>
  );
};

export default SingleSelect;
