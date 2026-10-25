/** PyPro mark: a highlighter-yellow tile with an ink "P" whose stem ends in a speech-bubble point. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#ffd43b" />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="13"
        fill="none"
        stroke="#16181d"
        strokeOpacity=".12"
        strokeWidth="2"
      />
      {/* bowl of the P */}
      <path d="M22 15h13a10.5 10.5 0 0 1 0 21H22" fill="#16181d" />
      <path d="M28 21h7a4.5 4.5 0 0 1 0 9h-7Z" fill="#ffd43b" />
      {/* stem that tapers into a speech-bubble point */}
      <path d="M16 15h12v25l-12 10Z" fill="#16181d" />
    </svg>
  );
}
