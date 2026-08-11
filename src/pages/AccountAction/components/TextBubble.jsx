import OwlAvatar from "./OwlAvatar";

function cleanAssistantText(text) {
  return String(text ?? "")
    .replace(
      /(^|\n)\s*show(?:Link|ActionList|ExitCta)\s*:\s*(?:true|false)[^\n]*/gi,
      "$1",
    )
    .trim();
}

function InlineText({ children }) {
  const parts = children.split(/(\*\*.+?\*\*)/g).filter(Boolean);

  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-bold text-[#151B26]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function RichText({ text }) {
  const lines = cleanAssistantText(text).split("\n");

  return (
    <div className="space-y-1.5 p-4 text-[13.5px] font-medium leading-[1.65] text-[#343B48]">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return <div key={index} className="h-1.5" aria-hidden="true" />;

        const ordered = line.match(/^(\d+\.)\s*(.+)$/);
        if (ordered) {
          return (
            <div key={index} className="flex items-start gap-2">
              <span className="min-w-4 shrink-0 font-bold text-[#08257E]">
                {ordered[1]}
              </span>
              <p className="min-w-0 flex-1 break-words">
                <InlineText>{ordered[2]}</InlineText>
              </p>
            </div>
          );
        }

        const bullet = line.match(/^[-*]\s+(.+)$/);
        if (bullet) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#71809A]" />
              <p className="min-w-0 flex-1 break-words">
                <InlineText>{bullet[1]}</InlineText>
              </p>
            </div>
          );
        }

        return (
          <p key={index} className="break-words">
            <InlineText>{line}</InlineText>
          </p>
        );
      })}
    </div>
  );
}

function TextBubble({ text }) {
  return (
    <div className="flex items-start gap-2.5">
      <OwlAvatar />
      <div className="max-w-[300px] rounded-[4px_18px_18px_18px] bg-white shadow-[0_1px_2px_rgba(16,24,46,0.04)]">
        <RichText text={text} />
      </div>
    </div>
  );
}

export default TextBubble;
