import SurveyCards from "@/components/survey-card";
import { BACKEND_API_HOST } from "@/constants/services";
import { auth } from "@clerk/nextjs/server";
import { Survey } from "@workspace/schema/questions";
import { ApiResponse } from "@workspace/schema/response";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import Link from "next/link";

// const page = () => {
//   const { getToken } = useAuth();

//   const [questions, setQuestions] = useState<
//     (CreateQuestionProps | undefined)[]
//   >([undefined]);

//   const handleAddQuestion = () => {
//     setQuestions([...questions, undefined]);
//   };

//   const handleSaveSurvey = async (surveyProps: CreateSurveyProps) => {
//     try {
//       const token = await getToken();
//       const response = await fetch(
//         `${BACKEND_API_HOST}/survey/dashboard/questions`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(surveyProps),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to save survey");
//       }
//     } catch (error) {
//       console.error("Error occuerd while saving survey", error);
//     }
//   };

//   const validate = useCallback(() => {
//     return CreateSurveySchema.safeParse({ questions });
//   }, [questions]);

//   const { success: isValid, data, error } = validate();
//   console.log(error);
//   return (
//     <div className="flex flex-col  p-5">
//       <Card>
//         <CardHeader>
//           <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//             Create Survey
//           </h3>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-2">
//           {questions.map((question, index) => (
//             <SingleSelect
//               questionNumber={index}
//               question={
//                 question || {
//                   questionText: "",
//                   questionType: "SHORT_TEXT",
//                   questionOptions: undefined,
//                 }
//               }
//               onQuestionChange={(q) => {
//                 const updated = [...questions];
//                 updated[index] = q;
//                 setQuestions(updated);
//               }}
//               key={index}
//             ></SingleSelect>
//           ))}
//           <Button
//             variant="link"
//             className="w-fit mx-auto"
//             disabled={!isValid}
//             onClick={handleAddQuestion}
//           >
//             + Add Question
//           </Button>

//           <CardAction className=" flex flex-row gap-4">
//             <Button
//               className=" self-end"
//               disabled={!isValid}
//               onClick={() => {
//                 if (isValid) {
//                   console.log(questions, data);
//                   handleSaveSurvey(data);
//                 }
//               }}
//             >
//               Create Questioniare
//             </Button>
//             <Button variant={"outline"} disabled={!isValid}>
//               Save
//             </Button>
//           </CardAction>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default page;

export default async function Page() {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${BACKEND_API_HOST}/survey/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseBody: ApiResponse<Omit<Survey, "questions">[]> =
    await response.json();
  console.log(responseBody);
  if (!responseBody.success) {
    throw new Error("Something went wrong");
  }

  const { data: surveys } = responseBody;

  return (
    <Card>
      <CardHeader>
        <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Dashoard Survey Home
        </h3>
      </CardHeader>
      <CardContent>
        {surveys.length === 0 && (
          <div className="flex flex-col items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              No surveys present !!
            </h3>
            <Button variant="link">
              <Link href="/dashboard/survey/new">Create survey</Link>
            </Button>
          </div>
        )}
        {surveys.map((survey) => (
          <SurveyCards survey={survey} />
        ))}
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button>
            <Link href="/dashboard/survey/new">Create survey</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
