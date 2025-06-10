import { Question } from "@workspace/schema/questions";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import React from "react";

interface MultiSelectWithOtherProps extends Question {
  questionType: "MULTI_SELECT_WITH_OTHER";
  onChange: (value: string, checked: boolean) => void;
  selectedValues?: string[];
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultiSelectWithOther = ({
  id,
  questionOptions,
  onChange,
  onChangeText,
}: MultiSelectWithOtherProps) => {
  return (
    <div className="flex flex-col gap-3">
      {questionOptions &&
        questionOptions.map((option) => (
          <div key={option.id}>
            <Label htmlFor={option.id}>
              <Checkbox
                id={option.id}
                name={id}
                onCheckedChange={(checked) => onChange(option.id, !!checked)}
              />
              <span>{option.optionText}</span>
            </Label>
          </div>
        ))}
      <Input placeholder="please specify" onChange={onChangeText} />
    </div>
  );
};

export default MultiSelectWithOther;
