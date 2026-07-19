// src/pages/DormantAccounts/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { getDormantAccounts, restoreAllDormant } from "@/api/dormantAccounts";
import { restoreServiceAccountDormant } from "@/api/serviceAccounts";
import { getServiceIconGradient } from "@/utils/serviceIcon";
import BackIcon from "@/assets/ic_back.svg";
import InfoIcon from "@/assets/ic_information.svg";

function DormantAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [restoringAll, setRestoringAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getDormantAccounts()
      .then((data) => {
        if (cancelled) return;
        setAccounts(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("dormant accounts load failed:", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRestore = async (id) => {
    try {
      await restoreServiceAccountDormant(id);
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("restore dormant account failed:", err);
    }
  };

  const handleRestoreAll = async () => {
    setRestoringAll(true);
    try {
      await restoreAllDormant();
      setAccounts([]);
    } catch (err) {
      console.error("restore all dormant accounts failed:", err);
    } finally {
      setRestoringAll(false);
    }
  };

  if (status === "loading") {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">불러오는 중...</p>
        </div>
      </PageBackground>
    );
  }

  if (status === "error") {
    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm font-bold text-[#6b7684]">
            휴면 계정을 불러오지 못했어요.
          </p>
        </div>
      </PageBackground>
    );
  }

  return (
    <PageBackground variant="frost">
      <div className="min-h-dvh px-5">
        <div className="flex items-center gap-3 my-1.5">
          <button
            onClick={() => navigate(-1)}
            className="grid w-9 h-9 place-items-center bg-white  rounded-full"
          >
            <img src={BackIcon} className="w-5 h-5" />
          </button>
          <h1 className="text-b24 text-[18px] text-gray100">휴면 계정</h1>
        </div>

        <div className="my-3 flex items-center gap-2.5 rounded-[14px] bg-[#ECF1F9] p-3.5">
          <img src={InfoIcon} className="w-4.5 h-4.5" />
          <p className="text-start text-r14 text-[13px] text-gray60">
            숨겨둔 계정을 여기에서 관리할 수 있어요.
            <br />
            복원하면 다시 홈 화면에 표시됩니다.
          </p>
        </div>

        <div className="space-y-2.5 my-2">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(16,24,46,0.04)]"
            >
              <ServiceIcon
                iconUrl={account.iconUrl}
                iconBg={getServiceIconGradient(account.serviceName)}
                iconText={account.iconLabel}
                className="h-10.5 w-10.5 shrink-0 rounded-[13px] text-[14px]"
              />
              <div className="flex-1">
                <b className="block text-sb16 text-[15px] text-gray100">
                  {account.displayName}
                </b>
                <small className="mt-0.75 block text-r14 text-[12px] text-gray50">
                  {account.email} · 휴면 {account.dormantDuration}
                </small>
              </div>
              <button
                onClick={() => handleRestore(account.id)}
                className="rounded-[10px] bg-main100 px-3.5 py-2 text-[12px] font-bold text-white"
              >
                복원
              </button>
            </div>
          ))}
        </div>

        {accounts.length > 0 && (
          <div className="flex flex-col gap-3 my-6">
            <p className="text-center text-r14 text-[12px] text-gray50">
              휴면 계정은 보안 검사 대상에서 제외됩니다.
            </p>
            <button
              onClick={handleRestoreAll}
              disabled={restoringAll}
              className="w-full text-center text-sb16 text-[14px] text-main100 disabled:opacity-40"
            >
              {restoringAll ? "복원 중..." : "모두 복원하기"}
            </button>
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default DormantAccounts;
