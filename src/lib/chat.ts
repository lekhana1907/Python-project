import { answerQuestion, type Answer } from "./answer";
import { knowledgeBase } from "./knowledge-base";

/** One finished exchange, used as context for follow-up questions. */
export type Turn = { question: string; answer: Answer };

/** A reply part: an answer plus an optional sentence that introduces it. */
export type Part = Answer & { lead?: string | undefined };

const STARTERS = ["How do I reverse a list?", "What is a decorator?", "How do I read a JSON file?"];

const small = (answer: string, suggestions = STARTERS): Part => ({
  matched: true,
  topic: "Chat",
  answer,
  confidence: 1,
  suggestions,
});

const SMALL_TALK: [RegExp, () => Part][] = [
  [
    /^(hi|hello|hey|hiya|yo|howdy|good (morning|afternoon|evening))\b/,
    () => small("Hi! What would you like to know about Python today?"),
  ],
  [
    /^(thanks|thank you|thx|ty|cheers|great|awesome|nice|cool|perfect)\b/,
    () => small("Glad that helped. What else can I explain?", []),
  ],
  [
    /^(bye|goodbye|see you|see ya|cya)\b/,
    () => small("Bye! Come back any time you're stuck on Python.", []),
  ],
  [
    /^how are you\b/,
    () => small("Doing great, and ready for Python questions. What are you working on?"),
  ],
];

const EXAMPLE =
  /^(can you |could you |please )?(show|give|send)( me)?( an?| the| some)? (example|code|snippet|sample)s?\b|^(example|code|snippet)s?\b|^show (me )?the code\b/;
const MORE =
  /^(tell me more|more|explain( it)?( more| again| further)?|elaborate|go on|continue|why\??|and\??)$/;
const WHAT_ABOUT =
  /^(?:what about|how about|and(?: for)?|what if it'?s|same for|for)\s+(?<subject>.+)$/;

// Nouns a follow-up can swap: "reverse a list" -> "what about strings?" -> "reverse a string".
const SUBJECTS = [
  "list",
  "tuple",
  "dictionary",
  "dict",
  "set",
  "string",
  "file",
  "class",
  "function",
  "module",
  "loop",
  "integer",
  "int",
  "float",
  "number",
  "array",
  "json",
  "csv",
];
const singular = (w: string) => (w.endsWith("ies") ? `${w.slice(0, -3)}y` : w.replace(/s$/, ""));

const clean = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[?!.]+$/, "");
const byId = (id?: string) => knowledgeBase.find((e) => e.id === id);

function fromEntry(id: string | undefined, lead: string): Part | null {
  const e = byId(id);
  if (!e) return null;
  return {
    matched: true,
    entryId: e.id,
    topic: e.topic,
    answer: e.answer,
    code: e.code,
    confidence: 1,
    suggestions: [],
    lead,
  };
}

/** Swap the subject of the previous question for a new one, if both have one. */
function swapSubject(previous: string, subject: string): string | null {
  const next = SUBJECTS.find((s) => singular(subject).split(/\s+/).includes(s));
  const old = SUBJECTS.find((s) => new RegExp(`\\b${s}(s|ies)?\\b`, "i").test(previous));
  if (!next || !old) return null;
  return previous.replace(new RegExp(`\\b${old}(s|ies)?\\b`, "i"), next);
}

/** Splits "what is a list and what is a tuple?" into separate questions. */
function split(text: string): string[] {
  return text
    .split(
      /\?\s+|\s+(?:and|also|plus)\s+(?=(?:what|how|why|when|where|is|are|can|do|does|which)\b)/i,
    )
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 2);
}

/**
 * The conversational layer: small talk, follow-ups that use the previous turn, and
 * several questions in one message. Everything else goes straight to the matcher.
 */
export function reply(text: string, previous?: Turn): Part[] {
  const q = clean(text);

  for (const [pattern, make] of SMALL_TALK) {
    if (pattern.test(q) && q.split(/\s+/).length <= 5) return [make()];
  }

  const last = previous?.answer.matched && previous.answer.entryId ? previous : undefined;
  if (last) {
    if (EXAMPLE.test(q) && q.split(/\s+/).length <= 7) {
      if (last.answer.code) {
        const part = fromEntry(last.answer.entryId, "Sure, here's a code example for that:");
        if (part) return [{ ...part, answer: "" }];
      }
      const related = answerQuestion(last.answer.suggestions[0] ?? last.question);
      if (related.code)
        return [
          {
            ...related,
            lead: "That one has no snippet, but this closely related example should help:",
          },
        ];
    }

    if (MORE.test(q)) {
      const next =
        last.answer.suggestions[0] ??
        knowledgeBase.find((e) => e.topic === last.answer.topic && e.id !== last.answer.entryId)
          ?.questions[0];
      if (next) return [{ ...answerQuestion(next), lead: `Going one step further: ${next}` }];
      return [
        small(`That covers what I know about ${last.answer.topic}. Want to try a related topic?`),
      ];
    }

    const about = q.match(WHAT_ABOUT)?.groups?.["subject"];
    if (about) {
      const swapped = swapSubject(last.question, about);
      const a = answerQuestion(swapped ?? `${about} ${last.answer.topic ?? ""}`);
      if (a.matched) return [{ ...a, lead: swapped ? `For ${about}:` : undefined }];
    }
  }

  const parts = split(text);
  if (parts.length > 1) {
    const answers = parts.map((p) => ({
      ...answerQuestion(p),
      lead: p.charAt(0).toUpperCase() + p.slice(1).replace(/\?*$/, "?"),
    }));
    const distinct = new Set(answers.map((a) => a.entryId));
    if (answers.every((a) => a.matched) && distinct.size === answers.length) return answers;
  }

  const direct = answerQuestion(text);
  // Short, vague follow-ups ("and in a loop?") can still make sense in the previous topic.
  if (!direct.matched && last && q.split(/\s+/).length <= 5) {
    const contextual = answerQuestion(`${text} ${last.answer.topic ?? ""}`);
    if (contextual.matched)
      return [{ ...contextual, lead: `Answering in the context of ${last.answer.topic}:` }];
  }
  return [direct];
}
