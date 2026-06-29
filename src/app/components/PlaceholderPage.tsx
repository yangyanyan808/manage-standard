import React from "react";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 text-slate-500">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">{title}</h2>
        <p>此模块正在建设中...</p>
      </div>
    </div>
  );
}
