import PageBackground from "@/components/layouts/PageBackground";

function ErrorScreen({ variant = "frost", text = "정보를 불러오지 못했어요." }) {
  return (
    <PageBackground variant={variant}>
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm font-bold text-[#6b7684]">{text}</p>
      </div>
    </PageBackground>
  );
}

export default ErrorScreen;
