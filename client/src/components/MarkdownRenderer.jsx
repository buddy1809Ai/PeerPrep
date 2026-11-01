import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="max-w-none text-slate-300 text-xs leading-relaxed space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-base font-bold text-white mt-4 mb-2 pb-1 border-b border-slate-800" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-sm font-bold text-slate-100 mt-3 mb-1.5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mt-3 mb-1" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xs font-semibold text-slate-200 mt-2 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-xs leading-relaxed text-slate-300 my-1.5" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-slate-100" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-slate-300" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside pl-4 space-y-1 text-slate-300 my-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside pl-4 space-y-1 text-slate-300 my-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-xs text-slate-300 pl-0.5 leading-relaxed" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="bg-slate-800/90 text-amber-300 font-mono text-[11px] px-1.5 py-0.5 rounded border border-slate-700/60" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-emerald-400">
                <code {...props}>{children}</code>
              </pre>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-2 border-indigo-500 pl-3 my-2 text-slate-400 italic bg-indigo-500/5 py-1 rounded-r" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-2">
              <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="p-2 font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="p-2 border-t border-slate-800/60 text-slate-300" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-amber-400 hover:text-amber-300 underline font-medium inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
