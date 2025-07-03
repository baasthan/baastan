"use client";
import useUpdateSurveyStatus from "@/hooks/services/useUpdateSurveyStatus";
import { Survey } from "@workspace/schema/questions";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import { toast } from "@workspace/ui/components/sonner";
import { Switch } from "@workspace/ui/components/switch";

interface SurveyCardProps {
  survey: Omit<Survey, "questions">;
}

const SurveyCards = ({ survey }: SurveyCardProps) => {
  const { data, error, execute, isLoading, isSuccess, resetService } =
    useUpdateSurveyStatus();

  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}/survey/${survey.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Survey link copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy link to clipboard");
    }
  };

  // console.log("data=====>", data.isLive);
  return (
    <Card key={survey.id}>
      <CardHeader>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {survey.surveyText}
        </h3>
        <CardDescription>{survey.surveyDescription}</CardDescription>
      </CardHeader>
      <CardFooter>
        <CardAction className="flex flex-row gap-3">
          <Button onClick={handleCopy}>Copy Link</Button>
          <div className="flex items-center space-x-2">
            <Switch
              id="is-live"
              checked={survey.isLive || (data && data.isLive)}
              onCheckedChange={(isChecked) => execute(survey.id, isChecked)}
            ></Switch>
            <Label htmlFor="is-live">Is Live</Label>
          </div>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default SurveyCards;
