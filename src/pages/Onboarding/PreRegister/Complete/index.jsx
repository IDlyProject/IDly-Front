import PageBackground from "@/components/layouts/PageBackground";
import logo from "@/assets/ic_logo.svg";

function PreRegisterComplete() {
  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <img src={logo} alt="IDly" className="h-16 w-auto" />
        <h1 className="mt-4 text-b24 text-gray100">
          등록해주셔서 감사드립니다!
        </h1>
        <p className="mt-2.5 text-r16 text-[15px] text-gray60">
          접근 권한은 1~2일 이내에 부여될 예정이며
          <br />
          승인되면 알려드릴게요.
        </p>
      </div>
    </PageBackground>
  );
}

export default PreRegisterComplete;
