// src/pages/Withdraw/index.jsx
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import BackIcon from "@/assets/ic_back.svg";
import DeleteAccountIcon from "@/assets/ic_delete_account.svg";

function Withdraw() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(ROUTES.WITHDRAW_REASON);
  };

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col px-5">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="my-1.5 h-9 w-9 bg-white rounded-full grid place-items-center"
        >
          <img src={BackIcon} alt="" />
        </button>

        <h1 className="mt-5 mb-2 text-b24 text-gray100">
          계정을 삭제하시겠습니까?
        </h1>
        <p className="mb-7 text-r14 text-gray50">
          계정을 삭제하면 다음 사항에 동의하는 것으로 간주합니다.
        </p>

        <div className="flex item-center gap-3 rounded-[18px] bg-white p-5 shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
          <img src={DeleteAccountIcon} />
          <p className="text-r14 text-gray60">
            서비스 이용 정보가 영구적으로 삭제됩니다
          </p>
        </div>

        <button
          onClick={handleConfirm}
          className="fixed bottom-11 left-4 right-4 h-13 rounded-[14px] bg-[#EE4E4E] text-sb16 text-white"
        >
          확인
        </button>
      </div>
    </PageBackground>
  );
}

export default Withdraw;
