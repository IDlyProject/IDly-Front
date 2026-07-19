import PageBackground from "@/components/layouts/PageBackground";

function LoadingScreen({ variant = "frost", text = "불러오는 중..." }) {
  return (
    <PageBackground variant={variant}>
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm font-bold text-[#6b7684]">{text}</p>
      </div>
    </PageBackground>
  );
}

export default LoadingScreen;
