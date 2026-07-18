// src/pages/SecurityReport/components/ScoreRing.jsx
function ScoreRing({ score, maxScore = 100 }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * circumference;

  return (
    <div className="relative mx-auto h-[110px] w-[110px]">
      <svg
        width="110"
        height="110"
        viewBox="0 0 110 110"
        className="-rotate-90"
      >
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="8"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-[10px] font-bold text-white/70">/100</span>
      </div>
    </div>
  );
}

export default ScoreRing;
