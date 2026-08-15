import Image from "next/image";
import symbol from "../../public/brand/logo-symbol.png";

export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-cloud">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={symbol}
          alt="Gaash Tours & Events"
          width={64}
          height={64}
          priority
          className="animate-pulse"
        />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">
          Gaash Tours &amp; Events
        </span>
      </div>
    </div>
  );
}
