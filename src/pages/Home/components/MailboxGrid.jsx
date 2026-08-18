const DOT_COLOR = {
  safe: "bg-[#43A047]",
  watch: "bg-[#FABF2E]",
  risk: "bg-[#EE4E4E]",
};

function MailboxGrid({ mailboxes, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {mailboxes.map((mailbox) => {
        const isRisk = mailbox.status === "risk";
        return (
          <button
            key={mailbox.id}
            onClick={() => onSelect(mailbox.id)}
            className={`relative flex w-full flex-col items-center justify-center gap-2 rounded-2xl py-[21.5px] ${
              isRisk
                ? "border-[1.52px] border-[#EE4E4E] bg-[#FEF2F2] shadow-[0_0_24px_rgba(238,78,78,0.125),0_4px_16px_rgba(238,78,78,0.208)]"
                : "bg-white shadow-[0_2px_8px_rgba(16,24,46,0.08)]"
            }`}
          >
            <span
              className={`absolute right-2.75 top-1.75 rounded-full ${
                isRisk ? "h-3 w-3 border-2 border-white" : "h-2 w-2"
              } ${DOT_COLOR[mailbox.status] ?? DOT_COLOR.safe}`}
            />

            <span
              className="grid h-10.5 w-10.5 shrink-0 place-items-center rounded-full text-[14px] font-bold text-white"
              style={{ background: mailbox.avatarBg }}
            >
              {mailbox.avatarLabel}
            </span>
            <span
              className={`max-w-full truncate text-[11px] font-bold ${
                isRisk ? "text-[#EE4E4E]" : "text-gray60"
              }`}
            >
              {mailbox.label.split("@")[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MailboxGrid;
