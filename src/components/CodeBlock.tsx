import { Check, Copy } from "lucide-react";
import { useState } from "react";

const KEYWORDS = new Set([
  "if",
  "elif",
  "else",
  "for",
  "while",
  "in",
  "not",
  "and",
  "or",
  "def",
  "return",
  "class",
  "try",
  "except",
  "finally",
  "raise",
  "with",
  "as",
  "import",
  "from",
  "lambda",
  "None",
  "True",
  "False",
  "is",
  "pass",
  "break",
  "continue",
  "yield",
  "global",
  "del",
  "async",
  "await",
  "match",
  "case",
  "nonlocal",
  "assert",
]);

type Token = { text: string; kind: "kw" | "num" | "str" | "comment" | "plain" };

function tokenizeLine(line: string): Token[] {
  const hashAt = line.indexOf("#");
  let code = line;
  let comment = "";
  if (hashAt >= 0) {
    const before = line.slice(0, hashAt);
    const quotes = (before.match(/"/g) ?? []).length + (before.match(/'/g) ?? []).length;
    if (quotes % 2 === 0) {
      code = before;
      comment = line.slice(hashAt);
    }
  }

  const tokens: Token[] = [];
  const re = /("[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ text: code.slice(last, m.index), kind: "plain" });
    const value = m[0];
    if (value.startsWith('"') || value.startsWith("'")) tokens.push({ text: value, kind: "str" });
    else if (/^\d/.test(value)) tokens.push({ text: value, kind: "num" });
    else if (KEYWORDS.has(value)) tokens.push({ text: value, kind: "kw" });
    else tokens.push({ text: value, kind: "plain" });
    last = m.index + value.length;
  }
  if (last < code.length) tokens.push({ text: code.slice(last), kind: "plain" });
  if (comment) tokens.push({ text: comment, kind: "comment" });
  return tokens;
}

const classFor: Record<Token["kind"], string> = {
  kw: "text-blue font-medium",
  num: "text-syn-num",
  str: "text-syn-str",
  comment: "text-dim italic",
  plain: "",
};

/** Dark code panel used inside bot messages: syntax colours and a copy button. */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked (http or permissions): leave the button as is */
    }
  }
  return (
    <figure className="mt-4 overflow-hidden rounded-lg border border-line bg-code-bg text-code-fg">
      <figcaption className="flex items-center justify-between border-b border-line py-1 pr-1 pl-4">
        <span className="font-mono text-[11px] text-dim">python</span>
        <button
          type="button"
          onClick={() => void copy()}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold text-dim transition-colors duration-150 hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-fg"
        >
          {copied ? (
            <Check className="size-3.5 text-online" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre
        translate="no"
        className="overflow-x-auto border-l-[3px] border-blue px-4 py-3.5 font-mono text-[12.5px] leading-[1.75]"
      >
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="block">
              {tokenizeLine(line).map((t, j) => (
                <span key={j} className={classFor[t.kind]}>
                  {t.text}
                </span>
              ))}
              {line === "" ? " " : null}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
