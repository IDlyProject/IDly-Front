// src/pages/My/components/ProfileCard.jsx
function ProfileCard({ user }) {
  return (
    <div className="mb-5 rounded-3xl border border-gray-100 bg-white p-4.5 shadow-sm">
      <div className="mb-3.5 flex items-center gap-3">
        <div className="grid h-[52px] w-[52px] flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#3b6cff] to-[#5b7dff] text-lg font-bold text-white">
          {user.name[0]}
        </div>
        <div>
          <strong className="block text-lg text-[#191f28]">{user.name}</strong>
          <span className="mt-0.5 block text-xs font-bold text-[#6b7684]">
            {user.email}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-[#f6f8fb] p-3">
          <span className="block text-[10px] font-bold text-[#8b95a1]">
            나이
          </span>
          <b className="mt-0.5 block text-sm text-[#191f28]">{user.age}</b>
        </div>
        <div className="rounded-2xl bg-[#f6f8fb] p-3">
          <span className="block text-[10px] font-bold text-[#8b95a1]">
            전화번호
          </span>
          <b className="mt-0.5 block text-sm text-[#191f28]">{user.phone}</b>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
