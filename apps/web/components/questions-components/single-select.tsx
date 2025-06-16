import { Question } from "@workspace/schema/questions";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";

interface SingleSelectProps extends Question {
  questionType: "SINGLE_SELECT";
  onChange: (v: string) => void;
}

const SingleSelect = ({
  questionText,
  questionOptions,
  id,
  onChange,
}: SingleSelectProps) => {
  return (
    <RadioGroup onValueChange={onChange}>
      {questionOptions &&
        questionOptions.map((option) => (
          <div className="flex items-center gap-3">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.optionText}</Label>
          </div>
        ))}
    </RadioGroup>
  );
};

export default SingleSelect;
