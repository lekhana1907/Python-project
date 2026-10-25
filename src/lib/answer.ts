import { findAnswer } from "./nlp";

export type Answer = {
  matched: boolean;
  entryId?: string | undefined;
  answer: string;
  topic?: string | undefined;
  code?: string | undefined;
  confidence: number;
  suggestions: string[];
};

const FALLBACK =
  "I'd rather not guess. I answer Python questions from my built-in knowledge base, so try rephrasing, or tap one of these:";

// Matching runs in the browser: the knowledge base is static, so answers are instant and work offline.
export function answerQuestion(question: string): Answer {
  const result = findAnswer(question);
  if (!result.matched || !result.entry) {
    return {
      matched: false,
      answer: FALLBACK,
      confidence: result.confidence,
      suggestions:
        result.confidence < 0.12
          ? [
              "What is a list comprehension?",
              "How do I handle exceptions?",
              "What is __init__ and self?",
            ]
          : result.suggestions,
    };
  }
  return {
    matched: true,
    entryId: result.entry.id,
    answer: result.entry.answer,
    topic: result.entry.topic,
    code: result.entry.code,
    confidence: result.confidence,
    suggestions: result.suggestions,
  };
}
