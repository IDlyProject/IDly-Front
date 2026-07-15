function ProgressDots({ current, total }) {
  const isLastStep = current === total;
  return (
    <div className="my-3 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;

        if (isLastStep) {
          return <span key={i} className="h-2 w-2 rounded-full bg-main100" />;
        }

        if (step < current) {
          return <span key={i} className="h-2 w-2 rounded-full bg-main100" />;
        }
        if (step === current) {
          return <span key={i} className="h-2 w-6 rounded-sm bg-main100" />;
        }
        return <span key={i} className="h-2 w-2 rounded-full bg-gray20" />;
      })}
    </div>
  );
}

export default ProgressDots;
