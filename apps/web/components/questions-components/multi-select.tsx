import { Question } from "@workspace/schema/questions";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
interface MultiSelectProps extends Question {
  questionType: "MULTI_SELECT";
  onChange: (value: string, checked: boolean) => void;
  selectedValues?: string[];
}

const MultiSelect = ({ id, questionOptions, onChange }: MultiSelectProps) => {
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
    </div>
  );
};

export default MultiSelect;
