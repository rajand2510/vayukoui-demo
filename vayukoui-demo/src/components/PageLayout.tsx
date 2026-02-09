import type { ReactNode } from "react";
import { CodeSnippet } from "./CodeSnippet";

interface PageLayoutProps {
  title: string;
  description: string;
  preview: ReactNode;
  props: ReactNode;
  code?: string;
}

export function PageLayout({ title, description, preview, props: propsContent, code }: PageLayoutProps) {
  return (
    <div className="demo-page">
      <h1 className="demo-title">{title}</h1>
      <p className="demo-desc">{description}</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="demo-card demo-card-panel">
          <h2 className="demo-card-heading">Live preview</h2>
          {preview}
          {code != null && (
            <div className="mt-4 border-t border-[#E5E7EB] pt-4">
              <p className="mb-2 text-xs font-medium text-gray-500">Usage (matches play area)</p>
              <CodeSnippet code={code} language="tsx" />
            </div>
          )}
        </section>
        <section className="demo-card demo-card-panel demo-props-panel">
          <h2 className="demo-card-heading">Props</h2>
          <div className="space-y-4">
            {propsContent}
          </div>
        </section>
      </div>
    </div>
  );
}
