# PyPro — ask anything about Python

PyPro is a chatbot for Python questions. Type a question in plain English, like *"how do I reverse a list?"*, and get a clear answer with code you can copy.

- **One screen, one chat.** No sign-up, no menus. Open it and ask.
- **Honest.** Answers come from a hand-written knowledge base of 132 Python topics (440+ ways of asking). If PyPro isn't sure, it says so instead of guessing.
- **Instant and private.** Matching runs in your browser, so nothing you type is sent anywhere.
- **Works everywhere.** Phone or desktop, light or dark (it follows your device setting).

## Using it

- Type a question and press **Enter** (or the yellow send button). **Shift + Enter** adds a new line.
- Tap a suggested question to ask it instantly.
- Click **Copy** on any code block.
- **New chat** clears the conversation; you have a few seconds to **Undo**.
- Your chat is kept in your browser when you reload.

## What it can answer

Basics (variables, types, strings, f-strings, operators), collections (lists, tuples, dicts, sets, slicing, comprehensions), control flow, functions (args, lambdas, closures, decorators, generators, recursion), classes and OOP, errors and exceptions, files and JSON, the standard library, packaging and virtual environments, pandas/NumPy/matplotlib, web basics, data structures and algorithms, and classic exercises like Fibonacci and prime numbers.

## How it works

1. The question is cleaned up: lowercased, filler words removed, word endings trimmed.
2. Typos are fixed against the known vocabulary ("dictionry" → "dictionary").
3. Every knowledge-base entry is scored by shared important words (TF-IDF), closeness to its stored phrasings, and letter-level similarity.
4. Questions made mostly of non-Python words are refused, so off-topic questions don't get a random answer.
5. The best match above the confidence threshold is shown; otherwise PyPro says it isn't sure and suggests related questions.

## Run it locally

Requires Node.js 20+.

```sh
npm install
npm run dev            # open the URL it prints
npm run check:answers  # self-test: 440+ stored questions, 145 common questions, off-topic refusals
npm run build          # production build
```

## Project structure

```
src/
  routes/index.tsx        the chat screen
  components/
    CodeBlock.tsx         code panel with syntax colours and Copy
    Logo.tsx              the PyPro mark (also public/favicon.svg)
  lib/
    knowledge-base*.ts    the questions and answers
    nlp.ts                the matching engine
    synonyms.ts           everyday-word expansions
    answer.ts             turns a match into a reply
  styles.css              colours, fonts and motion
scripts/check-answers.ts  the self-test
```

To add an answer, add an entry (`id`, `topic`, `questions`, `keywords`, `answer`, optional `code`) to a `src/lib/knowledge-base*.ts` file, then run `npm run check:answers`.

Built with React 19, TanStack Start, Tailwind CSS 4 and TypeScript. Deploys to Vercel (`vercel.json` included).
