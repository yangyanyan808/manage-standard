import React, { useState } from "react";
import { GitMerge, Search, ChevronRight, ChevronDown, FileText, RotateCw, Download, ChevronLeft } from "lucide-react";
import clsx from "clsx";

interface ProcessDoc {
  id: string;
  name: string;
  version: string;
  dept: string;
  owner: string;
  validDate: string;
  category: string;
  subCategory: string;
}

interface Category {
  id: string;
  name: string;
  children?: Category[];
}

const categories: Category[] = [
  {
    id: "all",
    name: "全部流程",
    children: [
      { id: "procurement", name: "采购管理" },
      { id: "finance", name: "财务管理" },
      {
        id: "hr",
        name: "人力资源",
        children: [
          { id: "hr-personnel", name: "人事管理" },
          { id: "hr-attendance", name: "考勤管理" },
        ],
      },
      { id: "safety", name: "安全管理" },
      { id: "rd", name: "研发管理" },
      { id: "admin", name: "行政管理" },
    ],
  },
];

const allDocs: ProcessDoc[] = [
  { id: "PRC-2026-001", name: "采购审批流程", version: "V1.0", dept: "采购部", owner: "王五", validDate: "2025-12-01", category: "procurement", subCategory: "" },
  { id: "PRC-2026-003", name: "供应商准入流程", version: "V1.5", dept: "采购部", owner: "王五", validDate: "2026-09-30", category: "procurement", subCategory: "" },
  { id: "PRC-2026-004", name: "招标评审流程", version: "V1.0", dept: "采购部", owner: "赵六", validDate: "2026-11-15", category: "procurement", subCategory: "" },
  { id: "PRC-2026-002", name: "费用报销流程", version: "V2.5", dept: "财务部", owner: "吴九", validDate: "2026-08-20", category: "finance", subCategory: "" },
  { id: "PRC-2026-005", name: "预算审批流程", version: "V2.0", dept: "财务部", owner: "吴九", validDate: "2027-01-31", category: "finance", subCategory: "" },
  { id: "PRC-2026-006", name: "付款审批流程", version: "V1.8", dept: "财务部", owner: "郑十", validDate: "2026-06-30", category: "finance", subCategory: "" },
  { id: "PRC-2026-007", name: "入职办理流程", version: "V2.0", dept: "人力资源部", owner: "孙七", validDate: "2026-10-31", category: "hr", subCategory: "hr-personnel" },
  { id: "PRC-2026-008", name: "离职交接流程", version: "V1.5", dept: "人力资源部", owner: "周八", validDate: "2026-12-31", category: "hr", subCategory: "hr-personnel" },
  { id: "PRC-2026-009", name: "培训申请流程", version: "V1.0", dept: "人力资源部", owner: "孙七", validDate: "2027-02-28", category: "hr", subCategory: "hr-attendance" },
  { id: "PRC-2026-017", name: "考勤异常处理流程", version: "V1.0", dept: "人力资源部", owner: "孙七", validDate: "2026-09-30", category: "hr", subCategory: "hr-attendance" },
  { id: "PRC-2026-010", name: "安全事故上报流程", version: "V1.0", dept: "安全管理部", owner: "张三", validDate: "2026-09-30", category: "safety", subCategory: "" },
  { id: "PRC-2026-011", name: "隐患排查处理流程", version: "V1.2", dept: "安全管理部", owner: "李四", validDate: "2026-07-31", category: "safety", subCategory: "" },
  { id: "PRC-2026-012", name: "项目立项审批流程", version: "V1.0", dept: "研发部", owner: "陈一", validDate: "2027-03-15", category: "rd", subCategory: "" },
  { id: "PRC-2026-013", name: "技术评审流程", version: "V2.0", dept: "研发部", owner: "林二", validDate: "2025-11-30", category: "rd", subCategory: "" },
  { id: "PRC-2026-014", name: "用章审批流程", version: "V1.0", dept: "行政部", owner: "吴九", validDate: "2026-12-31", category: "admin", subCategory: "" },
  { id: "PRC-2026-015", name: "会议室预约流程", version: "V1.5", dept: "行政部", owner: "郑十", validDate: "2026-08-15", category: "admin", subCategory: "" },
  { id: "PRC-2026-016", name: "公务用车申请流程", version: "V1.0", dept: "行政部", owner: "郑十", validDate: "2026-10-31", category: "admin", subCategory: "" },
];

const PAGE_SIZE = 8;

export function ProcessesLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(["all"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const toggleExpand = (catId: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const handleCategoryClick = (cat: Category) => {
    if (cat.children && cat.children.length > 0) {
      toggleExpand(cat.id);
      setActiveCategory(cat.id);
    } else {
      setActiveCategory(cat.id);
    }
    setPage(1);
  };

  const getCategoryCount = (catId: string): number => {
    if (catId === "all") return allDocs.length;
    const root = categories[0];
    const isFirstLevel = root.children?.some(c => c.id === catId);
    if (isFirstLevel) {
      return allDocs.filter(d => d.category === catId).length;
    }
    return allDocs.filter(d => d.subCategory === catId).length;
  };

  const isActive = (catId: string): boolean => {
    if (activeCategory === catId) return true;
    const root = categories[0];
    for (const firstLevel of root.children || []) {
      if (firstLevel.children?.some(ch => ch.id === activeCategory) && catId === firstLevel.id) {
        return true;
      }
    }
    return false;
  };

  const filteredDocs = allDocs.filter(doc => {
    let matchCategory = false;
    if (activeCategory === "all") {
      matchCategory = true;
    } else {
      const root = categories[0];
      const firstLevelChild = root.children?.find(c => c.id === activeCategory);
      if (firstLevelChild) {
        matchCategory = doc.category === activeCategory;
      } else {
        matchCategory = doc.subCategory === activeCategory;
      }
    }

    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      doc.id.toLowerCase().includes(q) ||
      doc.name.toLowerCase().includes(q) ||
      doc.dept.toLowerCase().includes(q) ||
      doc.owner.toLowerCase().includes(q);

    return matchCategory && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / PAGE_SIZE));
  const pagedDocs = filteredDocs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleRefresh = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setPage(1);
  };

  const handleExport = () => {
    alert("导出功能：将当前流程列表导出为 Excel 文件");
  };

  const isExpired = (dateStr: string) => {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  const renderCategory = (cat: Category, depth: number = 0): React.ReactNode => {
    const hasChildren = cat.children && cat.children.length > 0;
    const isExpanded = expandedCats.has(cat.id);
    const active = isActive(cat.id);

    return (
      <div key={cat.id}>
        <button
          onClick={() => handleCategoryClick(cat)}
          className={clsx(
            "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left",
            active
              ? "bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-500"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
        >
          <span className="flex items-center gap-2 min-w-0">
            {hasChildren && (
              isExpanded
                ? <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                : <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
            )}
            {!hasChildren && depth > 0 && (
              <span className="w-[14px] flex-shrink-0" />
            )}
            {cat.id === "all" ? (
              <GitMerge size={14} className={active ? "text-blue-500 flex-shrink-0" : "text-slate-400 flex-shrink-0"} />
            ) : depth === 1 ? (
              <FileText size={14} className={active ? "text-blue-500 flex-shrink-0" : "text-slate-400 flex-shrink-0"} />
            ) : (
              <span className={clsx(
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                active ? "bg-blue-500" : "bg-slate-300"
              )} />
            )}
            <span className="truncate">{cat.name}</span>
          </span>
          <span className={clsx(
            "text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2",
            active
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-100 text-slate-500"
          )}>
            {getCategoryCount(cat.id)}
          </span>
        </button>
        {hasChildren && isExpanded && (
          <div>
            {cat.children!.map(child => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GitMerge size={24} className="text-blue-600" />
            流程文件库
          </h1>
          <p className="text-sm text-slate-500 mt-1">浏览和查阅所有已发布的流程文件</p>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left Sidebar: Process Architecture */}
        <div className="w-56 flex-shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <GitMerge size={14} className="text-blue-500" />
              流程架构目录
            </h2>
          </div>
          <div className="py-2">
            {categories.map(cat => renderCategory(cat, 0))}
          </div>
        </div>

        {/* Right Content: Process List */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <div className="text-sm text-slate-500">
                共 <span className="font-medium text-slate-900">{filteredDocs.length}</span> 份文件
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="搜索编号、名称、部门、责任人..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                    className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all w-64"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className="p-2 text-slate-500 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-sm"
                  title="刷新"
                >
                  <RotateCw size={16} />
                </button>
                <button
                  onClick={handleExport}
                  className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  <Download size={16} /> 导出
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5 font-medium">编号</th>
                    <th className="px-6 py-3.5 font-medium">名称</th>
                    <th className="px-6 py-3.5 font-medium">版本</th>
                    <th className="px-6 py-3.5 font-medium">责任部门</th>
                    <th className="px-6 py-3.5 font-medium">责任人</th>
                    <th className="px-6 py-3.5 font-medium">有效日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pagedDocs.length > 0 ? (
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center">
                          <GitMerge size={48} className="text-slate-200 mb-4" />
                          <p>未找到符合条件的流程文件</p>
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
      </div>
    </div>
  );
}
