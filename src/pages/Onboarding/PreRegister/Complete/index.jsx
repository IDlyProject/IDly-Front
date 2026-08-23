import PageBackground from "@/components/layouts/PageBackground";
import logo from "@/assets/ic_logo.svg";

function PreRegisterComplete() {
  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <img src={logo} alt="IDly" className="w-30 h-auto" />
        <h1 className="mt-6 text-b24 text-gray100">
          등록해주셔서 감사드립니다!
        </h1>
        <p className="mt-2.5 text-[18px] font-semibold text-gray60">
          접근 권한은 1~2일 이내에 부여될 예정이며
          <br />
          등록해주신 이메일에 권한이 부여되면
          <br />
          카카오 알림톡으로
          <br />
          서비스 링크를 발송드리겠습니다.
        </p>
      </div>
    </PageBackground>
  );
}

export default PreRegisterComplete;
