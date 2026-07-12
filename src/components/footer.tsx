export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle px-6 py-10 lg:px-12">
      {/* Scanning line at the top */}
      <div className="absolute left-0 top-0 h-[1px] w-full overflow-hidden">
        <div className="absolute inset-0 animate-scan-line bg-vermilion/10" style={{ animationDuration: "3s" }} />
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted lg:flex-row">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tracking-tight text-text-primary">
            FZ<span className="text-vermilion">.</span>
          </span>
          <span className="h-3 w-px bg-border-subtle" />
          <span>Biophysics &middot; Neural Engineering</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="relative">
              <span className="h-1 w-1 rounded-full bg-vermilion/40" />
              <span className="absolute -inset-0.5 animate-ping rounded-full bg-vermilion/20" />
            </span>
            Built from first principles
          </span>
          <span className="h-3 w-px bg-border-subtle" />
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

