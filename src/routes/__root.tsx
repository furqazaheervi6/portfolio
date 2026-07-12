import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { bootstrapScript } from "@higgsfield/quanta/runtime";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;

const DEFAULT_TITLE = "Furqan Zaheer — Biophysics, Neural Engineering & ML";
const DEFAULT_DESCRIPTION =
  "Biophysics undergraduate building across neural engineering, machine learning, biological systems, software, mathematics, and personal intelligence tools.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = meta.og_image_url ?? null;
  const favicon = meta.favicon_url ?? null;

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Furqan Zaheer" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      {
        name: "twitter:card",
        content: ogImage ? "summary_large_image" : "summary",
      },
      { name: "twitter:site", content: "@higgsfield" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      ...(favicon ? [{ rel: "icon", href: favicon }] : []),
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-black-deep px-4">
      <div className="max-w-md text-center">
        <span className="font-mono text-[64px] font-bold leading-none tracking-tight text-vermilion">
          404
        </span>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-text-primary">
          Page not found
        </h1>
        <p className="mt-2 font-body text-sm text-text-secondary">
          This page doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-block border border-vermilion/50 px-6 py-2 font-mono text-xs uppercase tracking-[0.15em] text-vermilion transition-colors hover:bg-vermilion hover:text-black-deep"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-black-deep px-4">
      <div className="max-w-md text-center">
        <span className="font-mono text-[64px] font-bold leading-none tracking-tight text-vermilion">
          ERR
        </span>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-text-primary">
          This page didn't load
        </h1>
        <p className="mt-2 font-body text-sm text-text-secondary">
          Something went wrong. You can try refreshing.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-vermilion/50 px-6 py-2 font-mono text-xs uppercase tracking-[0.15em] text-vermilion transition-colors hover:bg-vermilion hover:text-black-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border-subtle px-6 py-2 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-text-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="default-dark" style={{ colorScheme: "dark" }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript() }} />
        <HeadContent />
      </head>
      <body className="bg-black-deep text-text-primary">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          {
            boundary: "higgsfield_design_inspector_import",
          },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}


