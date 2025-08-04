
'use client';

export function SciFiBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="relative h-full w-full bg-transparent">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:14px_24px] opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,transparent_50%)] opacity-20" style={{ animation: 'pulse 5s infinite' }}></div>
        </div>
    </div>
  );
}
