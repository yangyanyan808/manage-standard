import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Filter, ChevronLeft, ChevronRight, FileText, MoreHorizontal } from "lucide-react";
import clsx from "clsx";

type TabStatus = "all" | "draft" | "in_progress" | "completed";

export function PlanList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: "全部" },
    { id: "draft", label: "草稿" },
    { id: "in_progress", label: "进行中" },
    { id: "completed", label: "已完成" },
  ];

  // Dummy data for plans
  const allPlans = [
    { id: "PLN-2026-005", title: "关于《安全管理办法》的修订计划", type: "修订", dept: "安全管理部", owner: "张三", status: "in_progress", date: "2026-06-18" },
    { id: "PLN-2026-004", title: "2026年度新业务流程制定计划", type: "制订", dept: "业务发展部", owner: "李四", status: "draft", date: "2026-06-17" },
    { id: "PLN-2026-003", title: "旧版考勤管理制度废止计划", type: "废止", dept: "人力资源部", owner: "王五", status: "completed", date: "2026-06-10" },
    { id: "PLN-2026-002", title: "差旅费管理办法修订计划", type: "修订", dept: "财务部", owner: "赵六", status: "completed", date: "2026-06-05" },
    { id: "PLN-2026-001", title: "研发管理体系标准制订计划", type: "制订", dept: "研发部", owner: "孙七", status: "in_progress", date: "2026-06-01" },
  ];

  const filteredPlans = allPlans.filter(plan => {
    const matchTab = activeTab === "all" || plan.status === activeTab;
    const matchSearch = plan.title.includes(searchQuery) || plan.id.includes(searchQuery);
    return matchTab && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200">进行中</span>;
      case "completed":
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200">已完成</span>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "制订":
        return <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">制订</span>;
      case "修订":
        return <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs">修订</span>;
      case "废止":
        return <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">废止</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />
            制修订计划
          </h1>
          <p className="text-sm text-slate-500 mt-1">管理制度与流程的制订、修订、废止等计划安排</p>
        </div>
        <button
          onClick={() => navigate("/plan/new")}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> 发起计划
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Toolbar & Tabs */}
        <div className="px-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabStatus)}
                className={clsx(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="搜索计划编号、名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all w-64"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* List Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">单号</th>
                <th className="px-6 py-4 font-medium">计划名称</th>
                <th className="px-6 py-4 font-medium">类型</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">起草部门</th>
                <th className="px-6 py-4 font-medium">负责人</th>
                <th className="px-6 py-4 font-medium">发起时间</th>
                <th className="px-6 py-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50 group transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{plan.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate("/plan/new")}>
                      {plan.title}
                    </td>
                    <td className="px-6 py-4">{getTypeBadge(plan.type)}</td>
                    <td className="px-6 py-4">{getStatusBadge(plan.status)}</td>
                    <td className="px-6 py-4 text-slate-600">{plan.dept}</td>
                    <td className="px-6 py-4 text-slate-600">{plan.owner}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{plan.date}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText size={48} className="text-slate-200 mb-4" />
                      <p>未找到符合条件的计划记录</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-sm text-slate-500">
            共 <span className="font-medium text-slate-900">{filteredPlans.length}</span> 条记录
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1 text-sm rounded bg-blue-50 text-blue-600 font-medium">
              1
            </button>
            <button className="px-3 py-1 text-sm rounded hover:bg-slate-50 text-slate-600">
              2
            </button>
            <button className="px-3 py-1 text-sm rounded hover:bg-slate-50 text-slate-600">
              3
            </button>
            <span className="px-2 text-slate-400">...</span>
            <button className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
