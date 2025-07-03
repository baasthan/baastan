import z from "zod";

// export interface SingleSelectAnswer {
//   type: "SINGLE_SELECT";
//   optionId: string;
// }
const SingleSelectAnswerSchema = z.object({
  type: z.literal("SINGLE_SELECT"),
  optionId: z.number(),
});

export type SingleSelectAnswer = z.infer<typeof SingleSelectAnswerSchema>;

// export interface MultiSelectAnswer {
//   type: "MULTI_SELECT";
//   optionId: string[];
// }

const MultiSelectAnswerSchema = z.object({
  type: z.literal("MULTI_SELECT"),
  optionId: z.array(z.number()).min(1, "Selection is required"),
});

export type MultiSelectAnswer = z.infer<typeof MultiSelectAnswerSchema>;

// export type MultiSelectWithOtherAnswer =
//   | {
//       type: "MULTI_SELECT_WITH_OTHER";
//       optionId: string[];
//       additionalOptionText?: undefined;
//     }
//   | {
//       type: "MULTI_SELECT_WITH_OTHER";
//       optionId?: undefined;
//       additionalOptionText: string;
//     }
//   | {
//       type: "MULTI_SELECT_WITH_OTHER";
//       optionId: string[];
//       additionalOptionText: string;
//     };

export const MultiSelectWithOtherAnswerSchema = z.object({
  type: z.literal("MULTI_SELECT_WITH_OTHER"),
  optionId: z.array(z.number()).optional(),
  additionalOptionText: z.string().optional(),
});

export type MultiSelectWithOtherAnswer = z.infer<
  typeof MultiSelectWithOtherAnswerSchema
>;

// export interface ShortAnswer {
//   type: "SHORT_ANSWER";
//   shortAnswerText: string;
// }

const ShortAnswerSchema = z.object({
  type: z.literal("SHORT_ANSWER"),
  shortAnswerText: z.string().min(1, "Answer Required"),
});

export type ShortAnswer = z.infer<typeof ShortAnswerSchema>;

// export interface ParagraphAnswer {
//   type: "PARAGRAPH";
//   paragraphText: string;
// }

const ParagraphAnswerSchema = z.object({
  type: z.literal("PARAGRAPH"),
  paragraphText: z.string().min(1, "Answer is required"),
});

export type ParagraphAnswer = z.infer<typeof ParagraphAnswerSchema>;

export const AnswerSchema = z.discriminatedUnion("type", [
  SingleSelectAnswerSchema,
  MultiSelectAnswerSchema,
  MultiSelectWithOtherAnswerSchema,
  ShortAnswerSchema,
  ParagraphAnswerSchema,
]);

export type Answer = z.infer<typeof AnswerSchema>;

export const AnswerRecordSchema = z.record(AnswerSchema);

export type AnswerRecord = z.infer<typeof AnswerRecordSchema>;

// export type Answer =
//   | SingleSelectAnswer
//   | MultiSelectAnswer
//   | MultiSelectWithOtherAnswer
//   | ShortAnswer
//   | ParagraphAnswer;

export interface SaveAnswerSchema {
  questioniareId: string;
  questionId: string;
  answer: Answer;
}
