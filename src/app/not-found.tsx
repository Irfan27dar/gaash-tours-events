import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-[70svh] place-items-center bg-cloud px-6 pt-20 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-saffron">404</p>
        <h1 className="mt-4 text-h2 font-display">This trail leads nowhere</h1>
        <p className="mx-auto mt-3 max-w-md text-ink/60">
          The page you&apos;re looking for has wandered off. Let&apos;s get you back to the valley.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/packages" variant="outline">
            Browse packages
          </Button>
        </div>
      </div>
    </div>
  );
}
