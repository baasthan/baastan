// import { Question } from "@workspace/schema/questions";
// import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
// import { Input } from "@workspace/ui/components/input";
// import SingleSelect from "./single-select";

// interface UserQuestionProps {
//   question: Question;
//   index: number;
// }

// const UserQuestion = ({ question, index }: UserQuestionProps) => {
//   return (
//     <Card
//       key={question.id}
//       // className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
//     >
//       <CardHeader>
//         <p className="font-semibold text-lg text-gray-800 mb-4">
//           {index + 1}. {question.questionText}
//         </p>
//       </CardHeader>
//       {/* Responsive layout: for questions with grid layout, show 3 columns on desktop and 1 column on mobile */}
//       <CardContent>
//         {/* TODO: Fix this up later */}
//         {question.questionType === "SINGLE_SELECT" && (
//           <SingleSelect {...question} questionType="SINGLE_SELECT" />
//         )}
//         {["MULTI_SELECT", "MULTI_SELECT_WITH_OTHER"].includes(
//           question.questionType
//         ) &&
//           question.questionOptions?.map((option, i) => (
//             <label key={i} className="flex items-start space-x-2 text-gray-700">
//               <input
//                 type={
//                   ["MULTI_SELECT", "MULTI_SELECT_WITH_OTHER"].includes(
//                     question.questionType
//                   )
//                     ? "checkbox"
//                     : "radio"
//                 }
//                 name={question.id}
//                 value={option.optionText}
//                 className="mt-1 accent-indigo-600"
//               />
//               <span className="break-words">{option.optionText}</span>
//             </label>
//           ))}

//         {["SHORT_TEXT", "PARAGRAPH"].includes(question.questionType) && (
//           <Input
//             type="text"
//             placeholder="Please specify..."
//             className="border mt-3 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default UserQuestion;
