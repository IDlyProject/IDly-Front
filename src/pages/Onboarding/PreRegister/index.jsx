import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionButton from "@/components/ui/ActionButton";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import { registerWaitlist } from "@/services/waitlistService";
import { getErrorMessage } from "@/lib/api";
import { trackEvent } from "@/lib/ga";
import InstallPromptModal from "./components/InstallPromptModal";
import logo from "@/assets/ic_logo.svg";
import PersonIcon from "@/assets/ic_person.svg";
import CallIcon from "@/assets/ic_call.svg";
import MessageIcon from "@/assets/ic_message_18.svg";
import MessageColoredIcon from "@/assets/ic_message_colored_18.svg";
import PlusIcon from "@/assets/ic_plus.svg";
import CheckedBoxIcon from "@/assets/ic_checked_box.svg";
import UncheckedBoxIcon from "@/assets/ic_unchecked_box.svg";

const MAX_EMAILS = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^01[016789]-?\d{3,4}-?\d{4}$/;
const GMAIL_DOMAINS = ["gmail.com", "googlemail.com"];
const GOOGLE_ONLY_MESSAGE =
  "Gmail 주소만 입력해주세요. (학교/회사 등 Google Workspace도 가능)";
const CHECK_FAILED_MESSAGE =
  "구글 계정인지 확인하지 못했어요. 잠시 후 다시 시도해주세요.";

async function domainRecordsMentionGoogle(domain, type) {
  const res = await fetch(
    `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`,
  );
  if (!res.ok) throw new Error(`${type} lookup failed`);
  const data = await res.json();
  const records = data.Answer ?? [];
  return records.some((record) =>
    (record.data ?? "").toLowerCase().includes("google.com"),
  );
}

async function isGoogleWorkspaceDomain(domain) {
  // MX alone misses domains that route incoming mail through a spam-filter
  // relay in front of Google Workspace; SPF (TXT) still names Google there.
  const [hasGoogleMx, hasGoogleSpf] = await Promise.all([
    domainRecordsMentionGoogle(domain, "MX"),
    domainRecordsMentionGoogle(domain, "TXT"),
  ]);
  return hasGoogleMx || hasGoogleSpf;
}

const REQUIRED_TERMS = [
  { id: "age", label: "(필수) 만 14세 이상입니다" },
  {
    id: "privacy",
    label: "(필수) 개인정보 수집·이용 동의",
    termsType: "privacy",
  },
];

function buildInitialForm(state) {
  const snapshot = state?.formSnapshot;
  const checked = { ...(snapshot?.checked ?? {}) };
  if (state?.agreedTerm) checked[state.agreedTerm] = true;
  return {
    name: snapshot?.name ?? "",
    phone: snapshot?.phone ?? "",
    confirmedEmails: snapshot?.confirmedEmails ?? [],
    draftEmail: snapshot?.draftEmail ?? "",
    checked,
  };
}

function PreRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const [initialForm] = useState(() => buildInitialForm(location.state));
  const [name, setName] = useState(initialForm.name);
  const [phone, setPhone] = useState(initialForm.phone);
  const [confirmedEmails, setConfirmedEmails] = useState(
    initialForm.confirmedEmails,
  );
  const [draftEmail, setDraftEmail] = useState(initialForm.draftEmail);
  const [checked, setChecked] = useState(initialForm.checked);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showInstallModal, setShowInstallModal] = useState(false);

  const goToTerms = (type) => {
    navigate(ROUTES.ONBOARDING_PRE_REGISTER_TERMS(type), {
      state: {
        formSnapshot: { name, phone, confirmedEmails, draftEmail, checked },
      },
    });
  };

  const trimmedDraftEmail = draftEmail.trim();

  const handleDraftEmailChange = (value) => {
    setDraftEmail(value);
    if (emailErrorMessage) setEmailErrorMessage("");
  };

  const confirmDraftEmail = async () => {
    if (confirmedEmails.length >= MAX_EMAILS || isCheckingEmail) return;

    if (!EMAIL_PATTERN.test(trimmedDraftEmail)) {
      setEmailErrorMessage(GOOGLE_ONLY_MESSAGE);
      return;
    }

    const domain = trimmedDraftEmail.split("@")[1].toLowerCase();
    if (GMAIL_DOMAINS.includes(domain)) {
      setEmailErrorMessage("");
      setConfirmedEmails((prev) => [...prev, trimmedDraftEmail]);
      setDraftEmail("");
      return;
    }

    setIsCheckingEmail(true);
    setEmailErrorMessage("");
    try {
      const isGoogleDomain = await isGoogleWorkspaceDomain(domain);
      if (isGoogleDomain) {
        setConfirmedEmails((prev) => [...prev, trimmedDraftEmail]);
        setDraftEmail("");
      } else {
        setEmailErrorMessage(GOOGLE_ONLY_MESSAGE);
      }
    } catch {
      setEmailErrorMessage(CHECK_FAILED_MESSAGE);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const allTermsChecked = REQUIRED_TERMS.every((term) => checked[term.id]);
  const canSubmit =
    !!name.trim() &&
    PHONE_PATTERN.test(phone.trim()) &&
    (confirmedEmails.length > 0 || !!trimmedDraftEmail) &&
    allTermsChecked;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    const emails = trimmedDraftEmail
      ? [...confirmedEmails, trimmedDraftEmail]
      : confirmedEmails;
    const normalizedPhone = phone.trim().replace(/-/g, "");

    try {
      await registerWaitlist({
        name: name.trim(),
        phone: normalizedPhone,
        emails,
        ageOver14Agreed: !!checked.age,
        privacyAgreed: !!checked.privacy,
      });
      localStorage.setItem(WAITLIST_STORAGE_KEYS.PHONE, normalizedPhone);
      localStorage.setItem(WAITLIST_STORAGE_KEYS.NAME, name.trim());
      trackEvent("waitlist_registered", { email_count: emails.length });
      setIsSubmitting(false);
      setShowInstallModal(true);
    } catch (err) {
      setIsSubmitting(false);
      if (err?.response?.status === 409) {
        setSubmitError("이미 등록된 번호입니다. 카카오톡 안내를 기다려주세요.");
      } else {
        setSubmitError(
          getErrorMessage(err, "등록에 실패했어요. 다시 시도해주세요."),
        );
      }
    }
  };

  return (
    <>
      <PageBackground variant="default">
        <div className="flex min-h-dvh flex-col px-2.5 pb-8">
          <div className="flex-1 px-2.5">
            <div className="flex flex-col items-center pb-6.5 pt-9 text-center">
              <img src={logo} alt="IDly" className="w-auto h-22" />
              <h1 className="mt-5.5 text-b24 text-gray100">
                안녕하세요
                <br />
                계정을 지키는 IDly입니다!
              </h1>
              <p className="mt-4 mb-1.5 text-[15px] font-[600]  text-gray60">
                내 이메일 속 보안 위험, IDly가 찾아드립니다.
              </p>
              <p className="text-[15px] font-[600]  text-gray60">
                IDly 이용을 위해 먼저 Gmail 계정 등록이 필요해요.
                <br />
                <span className="text-[#000000]">전화번호와 이메일</span>을
                입력해주시면 계정 등록 후 알려드릴게요!
              </p>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ONBOARDING_LOGIN)}
                className="mt-4 font-[600] text-[11px] text-main100"
              >
                이미 계정 등록을 마치셨나요?
                <span className="underline pl-0.5">분석하러 가기</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-3.5">
                <label className="block">
                  <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                    이름
                  </span>
                  <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white focus-within:border-main100">
                    <img src={PersonIcon} alt="" className="h-4.5 w-4.5" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름을 입력해주세요"
                      className="h-full min-w-0 flex-1 text-r14 text-gray100 outline-none placeholder:text-[#8C8F96]"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                    전화번호
                  </span>
                  <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white focus-within:border-main100">
                    <img src={CallIcon} alt="" className="h-4.5 w-4.5" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="h-full min-w-0 flex-1 text-r14 text-gray100 outline-none placeholder:text-[#8C8F96]"
                    />
                  </div>
                </label>
              </div>

              <div>
                <span className="mb-1.5 block text-sb16 text-[13px] text-gray60">
                  분석할 이메일(최대 {MAX_EMAILS}개)
                </span>
                <div
                  className={`space-y-1.5 ${
                    confirmedEmails.length >= 2
                      ? "max-h-28 overflow-y-auto pr-1"
                      : ""
                  }`}
                >
                  {confirmedEmails.map((email, idx) => (
                    <div
                      key={idx}
                      className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white"
                    >
                      <img
                        src={MessageColoredIcon}
                        alt=""
                        className="h-4.5 w-4.5"
                      />
                      <span className="flex-1 truncate text-[14px] font-bold text-main100">
                        {email}
                      </span>
                    </div>
                  ))}

                  {confirmedEmails.length < MAX_EMAILS && (
                    <div className="p-3.75 flex h-12 items-center gap-2.5 rounded-xl border border-gray10 bg-white focus-within:border-main100">
                      <img src={MessageIcon} alt="" className="h-4.5 w-4.5" />
                      <input
                        value={draftEmail}
                        onChange={(e) => handleDraftEmailChange(e.target.value)}
                        placeholder="이메일을 입력해주세요"
                        className="h-full min-w-0 flex-1 text-r14 text-[#8C8F96] outline-none"
                      />
                      <button
                        type="button"
                        onClick={confirmDraftEmail}
                        aria-label="이메일 추가"
                      >
                        <span className="grid h-7.5 w-7.5 shrink-0 place-items-center rounded-full bg-main100">
                          <img src={PlusIcon} alt="" className="h-3 w-3" />
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                {isCheckingEmail ? (
                  <p className="mt-2 text-r14 text-[11px] text-gray50">
                    구글 계정인지 확인하는 중...
                  </p>
                ) : (
                  emailErrorMessage && (
                    <p className="mt-2 text-r14 text-[11px] text-[#FF0000]">
                      {emailErrorMessage}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="px-1.5">
            {submitError && (
              <p className="mb-2 text-center text-r14 text-[11px] text-[#FF0000]">
                {submitError}
              </p>
            )}
            <div className="px-10">
              {REQUIRED_TERMS.map((term) => (
                <div
                  key={term.id}
                  className="flex w-full flex-wrap items-center py-2.5 text-left"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setChecked((prev) => ({
                        ...prev,
                        [term.id]: !prev[term.id],
                      }))
                    }
                    className="flex items-center gap-3 text-left pr-1"
                  >
                    <img
                      src={checked[term.id] ? CheckedBoxIcon : UncheckedBoxIcon}
                      alt=""
                      className="h-4.5 w-4.5"
                    />
                    <span className="text-r14 text-gray100">{term.label}</span>
                  </button>
                  {term.termsType && (
                    <button
                      type="button"
                      onClick={() => goToTerms(term.termsType)}
                      className="text-r14 text-gray100"
                    >
                      [보기]
                    </button>
                  )}
                </div>
              ))}
            </div>
            <ActionButton
              bgColor="var(--color-main100)"
              textColor="var(--color-white)"
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="mt-4"
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </ActionButton>
          </div>
        </div>
      </PageBackground>
      {showInstallModal && (
        <InstallPromptModal
          name={name.trim()}
          phone={phone.trim().replace(/-/g, "")}
          onClose={() => setShowInstallModal(false)}
        />
      )}
    </>
  );
}

export default PreRegister;
