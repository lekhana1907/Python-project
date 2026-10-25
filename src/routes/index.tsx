import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { CodeBlock } from "@/components/CodeBlock";
import { LogoMark } from "@/components/Logo";
import { answerQuestion, type Answer } from "@/lib/answer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PyPro — ask anything about Python" },
      {
        name: "description",
        content:
          "Chat with PyPro: ask any Python question in plain English and get a clear answer with example code. Free, instant, no sign-up.",
      },
      { property: "og:title", content: "PyPro — ask anything about Python" },
      {
        property: "og:description",
        content:
          "Ask any Python question in plain English and get a clear answer with example code.",
      },
    ],
  }),
  component: Chat,
});

type Message =
  | { id: string; role: "user"; text: string; time: number }
  | { id: string; role: "bot"; time: number; answer: Answer };

const STORAGE_KEY = "pypro.chat.v1";
const STARTERS = [
  "How do I reverse a list?",
  "What is a decorator?",
  "How do I read a JSON file?",
  "What does AttributeError mean?",
  "Write a Fibonacci program",
];

let seq = 0;
const nextId = () => `${Date.now().toString(36)}-${(seq += 1)}`;
const clock = (t: number) =>
  new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cleared, setCleared] = useState<Message[] | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore the conversation after hydration (localStorage is browser-only).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Message[];
      if (Array.isArray(saved)) setMessages(saved);
    } catch {
      /* corrupt or blocked storage: start fresh */
    }
    setLoaded(true);
    // Focus the box on desktop only; on phones it would pop the keyboard over the page.
    if (matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!cleared) return;
    const t = setTimeout(() => setCleared(null), 6000);
    return () => clearTimeout(t);
  }, [cleared]);

  useEffect(() => {
    if (!loaded) return; // don't overwrite the saved chat before it's restored
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-80)));
    } catch {
      /* storage blocked: the chat just won't persist */
    }
  }, [messages, loaded]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  function resize() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }

  function send(text: string) {
    const question = text.trim();
    if (!question || typing) return;
    setMessages((m) => [...m, { id: nextId(), role: "user", text: question, time: Date.now() }]);
    setDraft("");
    requestAnimationFrame(resize);
    setTyping(true);
    const answer = answerQuestion(question);
    // A short, length-aware pause so replies feel conversational rather than abrupt.
    const delay = 350 + Math.min(answer.answer.length, 350);
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId(), role: "bot", time: Date.now(), answer }]);
      setTyping(false);
    }, delay);
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(draft);
    }
  }

  const lastBot = [...messages].reverse().find((m) => m.role === "bot");
  const empty = loaded && messages.length === 0;

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <header className="shrink-0 border-b-[1.5px] border-fg/90">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <a
            href="/"
            className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          >
            <LogoMark className="size-9" />
            <span translate="no" className="text-[22px] font-black tracking-[-0.03em]">
              PyPro
            </span>
          </a>
          {!empty && (
            <button
              type="button"
              onClick={() => {
                setCleared(messages);
                setMessages([]);
              }}
              disabled={typing}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-[15px] font-semibold text-fg underline-offset-4 transition-colors duration-150 hover:bg-brand/40 focus-visible:outline-2 focus-visible:outline-fg disabled:cursor-default disabled:opacity-40"
            >
              <RotateCcw className="size-4" aria-hidden />
              New chat
            </button>
          )}
        </div>
      </header>

      {cleared && (
        <div
          role="status"
          className="fade-up mx-auto mt-3 flex w-[calc(100%-2.5rem)] max-w-3xl items-center justify-between gap-3 rounded-lg bg-fg px-4 py-2 text-sm text-bg"
        >
          Chat cleared.
          <button
            type="button"
            onClick={() => {
              setMessages(cleared);
              setCleared(null);
            }}
            className="cursor-pointer rounded px-2 py-1 font-bold text-brand underline underline-offset-4 hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-brand"
          >
            Undo
          </button>
        </div>
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-5">
          {empty && (
            <section className="fade-up pt-14 pb-6 sm:pt-24">
              <h1 className="max-w-[14ch] text-balance text-[44px] leading-[0.98] font-black tracking-[-0.045em] sm:text-[68px]">
                Ask me anything about Python.
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-body">
                Plain-English questions in, clear answers and copy-ready code out. If I don't know
                something, I'll say so instead of guessing.
              </p>
              <p className="mt-10 mb-3 text-sm font-semibold text-dim">Not sure where to start?</p>
              <Chips items={STARTERS} onPick={send} />
            </section>
          )}

          <ol role="log" aria-live="polite" aria-label="Conversation" className="space-y-8 py-8">
            {messages.map((m) =>
              m.role === "user" ? (
                <li key={m.id} className="msg-in-right flex flex-col items-end">
                  <p className="max-w-[88%] text-right text-[17px] leading-[1.95] font-semibold break-words whitespace-pre-wrap text-on-brand sm:max-w-[75%]">
                    <mark className="rounded-[3px] bg-brand px-1.5 py-[3px] text-on-brand [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                      {m.text}
                    </mark>
                  </p>
                  <time className="mt-1 text-xs text-dim">{clock(m.time)}</time>
                </li>
              ) : (
                <BotTurn
                  key={m.id}
                  message={m}
                  showReplies={m === lastBot && !typing}
                  onPick={send}
                />
              ),
            )}

            {typing && (
              <li
                className="msg-in-left grid grid-cols-[2rem_1fr] gap-3.5"
                aria-label="PyPro is typing"
              >
                <LogoMark className="size-8" />
                <span className="flex h-8 items-center gap-1.5">
                  {[0, 140, 280].map((d) => (
                    <span
                      key={d}
                      className="typing-dot size-2 rounded-[2px] bg-fg"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </span>
              </li>
            )}
          </ol>
          <div ref={endRef} />
        </div>
      </main>

      <footer className="shrink-0 bg-gradient-to-t from-bg from-60% to-transparent px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border-[1.5px] border-fg bg-surface p-2 pl-4 transition-shadow duration-200 focus-within:shadow-[0_0_0_4px_var(--brand)]"
        >
          <label htmlFor="pypro-input" className="sr-only">
            Message PyPro
          </label>
          <textarea
            id="pypro-input"
            ref={inputRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              resize();
            }}
            onKeyDown={onKey}
            rows={1}
            maxLength={500}
            name="question"
            autoComplete="off"
            enterKeyHint="send"
            placeholder="Ask a Python question…"
            className="max-h-42 min-h-11 flex-1 resize-none bg-transparent py-2.5 text-[17px] leading-6 text-fg outline-none placeholder:text-dim"
          />
          <button
            type="submit"
            disabled={!draft.trim() || typing}
            aria-label="Send message"
            className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border-[1.5px] border-fg bg-brand text-on-brand transition duration-150 hover:bg-brand-strong active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:cursor-default disabled:border-line disabled:bg-transparent disabled:text-dim"
          >
            <ArrowUp className="size-5" strokeWidth={2.75} aria-hidden />
          </button>
        </form>
        <p className="mx-auto mt-2 hidden max-w-3xl px-1 text-xs text-dim sm:block">
          Enter sends, Shift + Enter adds a new line. Answers come from PyPro's built-in Python
          knowledge base.
        </p>
      </footer>
    </div>
  );
}

/** Renders `inline code` spans inside answer text. */
function Prose({ text }: { text: string }) {
  return (
    <p className="max-w-[65ch] text-[17px] leading-[1.7] break-words text-body">
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            translate="no"
            className="rounded bg-code-bg px-1.5 py-0.5 font-mono text-[0.8em] text-fg"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

function BotTurn({
  message,
  showReplies,
  onPick,
}: {
  message: Extract<Message, { role: "bot" }>;
  showReplies: boolean;
  onPick: (q: string) => void;
}) {
  const { answer } = message;
  return (
    <li className="msg-in-left grid grid-cols-[2rem_1fr] gap-3.5">
      <LogoMark className="size-8" />
      <div className="min-w-0">
        <p className="flex h-8 items-center gap-2 text-[15px] font-bold">
          PyPro
          <time className="text-xs font-normal text-dim">{clock(message.time)}</time>
        </p>
        {!answer.matched && (
          <p className="mb-1 text-[17px] font-bold text-fg">I'm not sure about that one.</p>
        )}
        <Prose text={answer.answer} />
        {answer.code && <CodeBlock code={answer.code} />}
        {showReplies && answer.suggestions.length > 0 && (
          <div className="mt-5">
            <p className="mb-2.5 text-sm font-semibold text-dim">
              {answer.matched ? "You might also ask" : "Try one of these"}
            </p>
            <Chips items={answer.suggestions} onPick={onPick} />
          </div>
        )}
      </div>
    </li>
  );
}

function Chips({ items, onPick }: { items: string[]; onPick: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          className="min-h-11 cursor-pointer rounded-full border-[1.5px] border-fg/80 px-4 py-2 text-left text-[15px] font-semibold text-fg transition-colors duration-150 hover:border-fg hover:bg-brand hover:text-on-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg active:translate-y-px"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
