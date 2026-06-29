import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Trash2, MoreHorizontal, Eye, Edit3 } from "lucide-react";
import clsx from "clsx";

type TabStatus = "all" | "draft" | "in_progress" | "completed";

interface AbolishItem {
  id: string;
  name: string;
  version: string;
  type: "流程" | "制度";
  dept: string;
  owner: string;
  initiator: string;
  date: string;
  abolishDate: string;
  status: "draft" | "in_progress" | "completed";
}

export function AbolishList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const tabs = [
    { id: "all", label: "全部" },
    { id: "draft", label: "草稿" },
    { id: "in_progress", label: "进行中" },
    { id: "completed", label: "已完成" },
  ];

  const allAbolishes: AbolishItem[] = [
    { id: "ABL-2026-003", name: "《旧版考勤管理制度》", version: "V2.0", type: "制度", dept: "人力资源部", owner: "孙七", initiator: "周八", status: "in_progress", date: "2026-06-28", abolishDate: "—" },
    { id: "ABL-2026-002", name: "《纸质审批流程》", version: "V1.0", type: "流程", dept: "行政部", owner: "吴九", initiator: "郑十", status: "completed", date: "2026-06-20", abolishDate: "2026-07-01" },
    { id: "ABL-2026-001", name: "《旧版安全操作规范》", version: "V1.0", type: "制度", dept: "安全管理部", owner: "张三", initiator: "李四", status: "draft", date: "2026-06-15", abolishDate: "—" },
  ];

  const filteredAbolishes = allAbolishes.filter(item => {
    const matchTab = activeTab === "all" || item.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      item.id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.version.toLowerCase().includes(q) ||
      item.dept.toLowerCase().includes(q) ||
      item.owner.toLowerCase().includes(q) ||
      item.initiator.toLowerCase().includes(q) ||
      item.date.includes(q) ||
      item.abolishDate.includes(q);
    return matchTab && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">进行中</span>;
      case "completed":
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors">已完成</span>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "制度":
        return <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">制度</span>;
      case "流程":
        return <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">流程</span>;
      default:
        return null;
    }
  };

  const handleStatusClick = (item: AbolishItem) => {
    if (item.status === "in_progress" || item.status === "completed") {
      window.open(`https://flow.example.com/form/${item.id}`, "_blank");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("确定要删除该废止记录吗？")) {
      setOpenMenuId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Trash2 size={24} className="text-blue-600" />
            废止管理
          </h1>
          <p className="text-sm text-slate-500 mt-1">对失效或需要淘汰的制度与流程进行废止管理</p>
        </div>
        <button
          onClick={() => navigate("/abolish/new")}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> 发起废止
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
                placeholder="搜索编号、名称、版本、部门、发起人..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all w-72"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* List Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[1300px]">
            <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">编号</th>
                <th className="px-6 py-4 font-medium">名称</th>
                <th className="px-6 py-4 font-medium">版本</th>
                <th className="px-6 py-4 font-medium">类型</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">责任部门</th>
                <th className="px-6 py-4 font-medium">责任人</th>
                <th className="px-6 py-4 font-medium">发起人</th>
                <th className="px-6 py-4 font-medium">发起时间</th>
                <th className="px-6 py-4 font-medium">废止时间</th>
                <th className="px-6 py-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAbolishes.length > 0 ? (
                filteredAbolishes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 group transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.id}</td>
                    <td
                      className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => navigate(`/abolish/${item.id}`)}
                    >
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.version}</td>
                    <td className="px-6 py-4">{getTypeBadge(item.type)}</td>
                    <td className="px-6 py-4" onClick={() => handleStatusClick(item)}>
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.dept}</td>
                    <td className="px-6 py-4 text-slate-600">{item.owner}</td>
                    <td className="px-6 py-4 text-slate-600">{item.initiator}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{item.date}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{item.abolishDate}</td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors"
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      {openMenuId === item.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-6 top-full mt-1 z-20 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-32">
                            <button
                              onClick={() => { setOpenMenuId(null); navigate(`/abolish/${item.id}`); }}
                              className="w-full px-3 py-2 text-sm text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                            >
                              <Eye size={14} /> 查看
                            </button>
                            {item.status === "draft" && (
                              <>
                                <button
                                  onClick={() => { setOpenMenuId(null); navigate(`/abolish/${item.id}/edit`); }}
                                  className="w-full px-3 py-2 text-sm text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                                >
                                  <Edit3 size={14} /> 编辑
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                >
                                  <Trash2 size={14} /> 删除
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-20 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Trash2 size={48} className="text-slate-200 mb-4" />
                      <p>未找到符合条件的废止记录</p>
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
            共 <span className="font-medium text-slate-900">{filteredAbolishes.length}</span> 条记录
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1 text-sm rounded bg-blue-50 text-blue-600 font-medium">1</button>
            <button className="px-3 py-1 text-sm rounded hover:bg-slate-50 text-slate-600">2</button>
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
