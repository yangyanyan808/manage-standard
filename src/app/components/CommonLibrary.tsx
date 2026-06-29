import React, { useState } from "react";
import { FileText, Search, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const PAGE_SIZE = 8;

interface FavoriteDoc {
  id: string;
  name: string;
  version: string;
  type: "制度" | "流程";
  dept: string;
  owner: string;
  validDate: string;
  favDate: string;
}

const allFavorites: FavoriteDoc[] = [
  { id: "SYS-2026-001", name: "安全生产管理制度", version: "V2.0", type: "制度", dept: "安全管理部", owner: "张三", validDate: "2026-12-31", favDate: "2026-06-28" },
  { id: "SYS-2026-002", name: "考勤管理办法", version: "V3.1", type: "制度", dept: "人力资源部", owner: "孙七", validDate: "2027-01-15", favDate: "2026-06-25" },
  { id: "PRC-2026-002", name: "费用报销流程", version: "V2.5", type: "流程", dept: "财务部", owner: "吴九", validDate: "2026-08-20", favDate: "2026-06-22" },
  { id: "PRC-2026-001", name: "采购审批流程", version: "V1.0", type: "流程", dept: "采购部", owner: "王五", validDate: "2025-12-01", favDate: "2026-06-20" },
  { id: "SYS-2026-003", name: "研发项目管理规范", version: "V1.0", type: "制度", dept: "研发部", owner: "陈一", validDate: "2027-03-15", favDate: "2026-06-18" },
  { id: "PRC-2026-005", name: "预算审批流程", version: "V2.0", type: "流程", dept: "财务部", owner: "吴九", validDate: "2027-01-31", favDate: "2026-06-15" },
  { id: "SYS-2026-006", name: "绩效考核管理制度", version: "V2.0", type: "制度", dept: "人力资源部", owner: "孙七", validDate: "2026-11-30", favDate: "2026-06-12" },
  { id: "PRC-2026-007", name: "入职办理流程", version: "V2.0", type: "流程", dept: "人力资源部", owner: "孙七", validDate: "2026-10-31", favDate: "2026-06-10" },
];

export function CommonLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredDocs = allFavorites.filter(doc => {
    const q = searchQuery.toLowerCase();
    return !q ||
      doc.id.toLowerCase().includes(q) ||
      doc.name.toLowerCase().includes(q) ||
      doc.dept.toLowerCase().includes(q) ||
      doc.owner.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / PAGE_SIZE));
  const pagedDocs = filteredDocs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "制度":
        return <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs font-medium">制度</span>;
      case "流程":
        return <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-medium">流程</span>;
      default:
        return null;
    }
  };

  const isExpired = (dateStr: string) => {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText size={24} className="text-blue-600" />
            常用制度流程
          </h1>
          <p className="text-sm text-slate-500 mt-1">快速访问收藏的常用制度与流程文件</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            共 <span className="font-medium text-slate-900">{filteredDocs.length}</span> 份文件
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="搜索编号、名称、部门、责任人..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all w-72"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3.5 font-medium">编号</th>
                <th className="px-6 py-3.5 font-medium">名称</th>
                <th className="px-6 py-3.5 font-medium">版本</th>
                <th className="px-6 py-3.5 font-medium">类型</th>
                <th className="px-6 py-3.5 font-medium">责任部门</th>
                <th className="px-6 py-3.5 font-medium">责任人</th>
                <th className="px-6 py-3.5 font-medium">有效日期</th>
                <th className="px-6 py-3.5 font-medium">收藏时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length > 0 ? (
                pagedDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 group transition-colors">
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-500">{doc.id}</td>
                    <td className="px-6 py-3.5 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      <span className="flex items-center gap-2">
                        <FileText size={14} className="text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                        {doc.name}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600">{doc.version}</td>
                    <td className="px-6 py-3.5">{getTypeBadge(doc.type)}</td>
                    <td className="px-6 py-3.5 text-slate-600">{doc.dept}</td>
                    <td className="px-6 py-3.5 text-slate-600">{doc.owner}</td>
                    <td className="px-6 py-3.5">
                      <span className={clsx(
                        "text-sm",
                        isExpired(doc.validDate) ? "text-red-500" : "text-slate-600"
                      )}>
                        {doc.validDate}
                        {isExpired(doc.validDate) && (
                          <span className="ml-2 px-1.5 py-0.5 bg-red-50 text-red-500 rounded text-xs">已过期</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 text-xs">{doc.favDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText size={48} className="text-slate-200 mb-4" />
                      <p>未找到符合条件的收藏文件</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredDocs.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
            <div className="text-sm text-slate-500">
              第 {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filteredDocs.length)} 条，共 {filteredDocs.length} 条
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={clsx(
                    "px-3 py-1 text-sm rounded transition-colors",
                    page === p
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
