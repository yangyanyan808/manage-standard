import React, { useState } from "react";
import { useNavigate } from "react-router";
import { 
  FilePlus, 
  Send, 
  Edit,
  Edit3,
  CheckSquare, 
  CheckCircle,
  Clock, 
  AlertCircle,
  Megaphone,
  ChevronRight,
  FileText,
  Calendar,
  Zap,
  BookOpen,
  RefreshCcw,
  Trash2,
  DownloadCloud,
  Network,
  Flame,
  Tag
} from "lucide-react";
import clsx from "clsx";

export function Dashboard() {
  const [taskTab, setTaskTab] = useState<"pending" | "initiated" | "completed">("pending");
  const navigate = useNavigate();

  // Dummy Data
  const stats = [
    { label: "今日发布", value: "12", icon: Send, color: "text-green-600", bg: "bg-green-100" },
    { label: "待办事项", value: "8", icon: CheckSquare, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "系统提醒", value: "3", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "我发起的", value: "5", icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const quickStarts = [
    { title: "制修订计划", icon: FileText, path: "/plan" },
    { title: "起草与意见征询", icon: Edit3, path: "/draft" },
    { title: "评议审核", icon: CheckCircle, path: "/review" },
    { title: "发布管理", icon: Send, path: "/publish" },
    { title: "更改管理", icon: RefreshCcw, path: "/change" },
    { title: "废止管理", icon: Trash2, path: "/abolish" },
    { title: "外来标准导入", icon: DownloadCloud, path: "/import" },
    { title: "管理标准复审", icon: Clock, path: "/re-review" },
  ];

  const notices = [
    { id: 1, title: "关于开展2026年度标准复审工作的通知", date: "06-18", isNew: true },
    { id: 2, title: "《企业管理标准体系建设指南》发布实施", date: "06-15", isNew: false },
    { id: 3, title: "平台V2.0版本上线及更新说明", date: "06-10", isNew: false },
    { id: 4, title: "关于规范外来标准管理的补充说明", date: "06-05", isNew: false },
  ];

  const reminders = [
    { id: 1, message: "您有 2 份制修订计划已被退回，请及时修改。", time: "10分钟前" },
    { id: 2, message: "您参与的《质量管理规范》意见征询将于明天截止。", time: "2小时前" },
    { id: 3, message: "张伟提交了《安全生产标准》评议审核流程，请您审批。", time: "昨天" },
  ];

  const todayPublished = [
    { id: "SYS-2026-001", type: "制度", title: "差旅费管理办法", version: "V2.0", owner: "李明", dept: "财务部", publisher: "张三" },
    { id: "PRC-2026-005", type: "流程", title: "新员工入职办理流程", version: "V1.1", owner: "王芳", dept: "人力资源部", publisher: "李四" },
    { id: "SYS-2026-002", type: "制度", title: "安全生产责任追究制度", version: "V3.0", owner: "陈建国", dept: "安监局", publisher: "系统管理员" },
    { id: "PRC-2026-008", type: "流程", title: "固定资产报废审批流程", version: "V1.0", owner: "赵云", dept: "资产管理部", publisher: "钱八" },
  ];

  const today = new Date().toISOString().slice(0, 10);
  const recentStandards = [
    { id: "STD-2026-051", title: "企业合规管理体系建设指南", version: "V1.0", dept: "法务合规部", owner: "陈静", date: today },
    { id: "STD-2026-050", title: "供应商准入与评价管理办法", version: "V2.0", dept: "采购部", owner: "周磊", date: today },
    { id: "STD-2026-049", title: "网络安全事件应急响应规程", version: "V1.1", dept: "信息中心", owner: "吴刚", date: today },
    { id: "STD-2026-048", title: "工程项目档案管理规范", version: "V3.0", dept: "档案室", owner: "郑雪", date: today },
    { id: "STD-2026-047", title: "碳排放核查与报告管理规定", version: "V1.0", dept: "环保部", owner: "孙浩", date: today },
    { id: "STD-2026-045", title: "信息技术服务管理规范 第1部分：通用要求", version: "V2.1", dept: "信息中心", owner: "李明", date: "2026-06-17" },
    { id: "STD-2026-044", title: "数据安全分级分类指南", version: "V1.0", dept: "数据中心", owner: "张华", date: "2026-06-16" },
    { id: "STD-2026-041", title: "年度员工绩效考核管理办法（2026版）", version: "V4.0", dept: "人力资源部", owner: "王芳", date: "2026-06-12" },
    { id: "STD-2026-038", title: "研发项目立项管理标准", version: "V1.2", dept: "研发部", owner: "刘强", date: "2026-06-08" },
  ];

  const tasks = {
    pending: [
      { id: "T-1001", title: "【评议审核】关于《软件开发规范》的审批", sender: "李四", date: "2026-06-18 09:30" },
      { id: "T-1002", title: "【起草与意见征询】网络安全管理办法征求意见", sender: "王五", date: "2026-06-17 14:20" },
      { id: "T-1003", title: "【管理标准复审】请确认您的2023年发布标准是否废止", sender: "系统", date: "2026-06-16 10:00" },
    ],
    initiated: [
      { id: "T-2001", title: "【起草和意见征询】数据备份与恢复管理规范", status: "进行中", date: "2026-06-15 11:00" },
      { id: "T-2002", title: "【更改管理】IT资产管理办法（修订）", status: "进行中", date: "2026-06-12 16:45" },
    ],
    completed: [
      { id: "T-3001", title: "【评议审核】机房出入管理制度", action: "已办结", date: "2026-06-14 09:15" },
      { id: "T-3002", title: "【起草与意见征询】移动设备使用规范", action: "已办结", date: "2026-06-10 15:30" },
      { id: "T-3003", title: "【评议审核】开源软件使用指南", action: "已终止", date: "2026-06-08 11:20" },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">个人工作台</h1>
          <p className="text-sm text-slate-500 mt-1">欢迎回来，张三。今天是 2026年6月18日，星期四。</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center shadow-sm">
            <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center mr-4", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lifecycle Management */}
      <div>
        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-4">
          <Network size={18} className="text-blue-500" />
          制度全生命周期管理
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickStarts.map((item, i) => (
            <button 
              key={i} 
              onClick={() => navigate(item.title === "制修订计划" ? "/plan/new" : item.path)}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <item.icon size={20} />
              </div>
              <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700 text-center">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Task Center (Moved to top full-width area) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <CheckSquare size={18} className="text-blue-500" />
            待办事项
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            进入工作流中心 <ChevronRight size={16} />
          </button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[380px]">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-4">
            <button 
              onClick={() => setTaskTab("pending")}
              className={clsx(
                "py-2 text-sm font-medium border-b-2 transition-colors relative",
                taskTab === "pending" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              待办事项
              <span className="ml-1.5 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">8</span>
            </button>
            <button 
              onClick={() => setTaskTab("initiated")}
              className={clsx(
                "py-2 text-sm font-medium border-b-2 transition-colors",
                taskTab === "initiated" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              我发起的
            </button>
            <button 
              onClick={() => setTaskTab("completed")}
              className={clsx(
                "py-2 text-sm font-medium border-b-2 transition-colors",
                taskTab === "completed" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              我的已办
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <ul className="divide-y divide-slate-100">
              {tasks[taskTab].map((task, i) => (
                <li key={i} className="p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer flex items-start justify-between group">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {taskTab === "pending" && <Clock size={16} className="text-amber-500" />}
                      {taskTab === "initiated" && <Send size={16} className="text-blue-500" />}
                      {taskTab === "completed" && <CheckSquare size={16} className="text-green-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="text-slate-400">单号：</span>{task.id}</span>
                        {task.sender && <span><span className="text-slate-400">发起人：</span>{task.sender}</span>}
                        {task.status && <span><span className="text-slate-400">状态：</span><span className="text-blue-600">{task.status}</span></span>}
                        {task.action && <span><span className="text-slate-400">处理结果：</span><span className={task.action === '已退回' ? 'text-red-500' : 'text-green-600'}>{task.action}</span></span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 flex-shrink-0">
                    {task.date}
                  </div>
                </li>
              ))}
              {tasks[taskTab].length === 0 && (
                <div className="py-10 text-center text-slate-500 text-sm">暂无数据</div>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Published Today & Recent Standards) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Published Today (Moved to Left Column) */}
          

          {/* Recent Standards */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-500" />
                近期发布标准
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                查看全部 <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm whitespace-nowrap overflow-x-auto block md:table">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">编号</th>
                    <th className="px-5 py-3 font-medium">名称</th>
                    <th className="px-5 py-3 font-medium">版本</th>
                    <th className="px-5 py-3 font-medium">责任部门</th>
                    <th className="px-5 py-3 font-medium">责任人</th>
                    <th className="px-5 py-3 font-medium">发布日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentStandards.map((std, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                      <td className="px-5 py-3 text-slate-500 font-mono text-xs">{std.id}</td>
                      <td className="px-5 py-3 font-medium text-slate-900 group-hover:text-blue-600 max-w-[150px] md:max-w-[200px]" title={std.title}>
                          <span className="flex items-center gap-1.5">
                            
                            {std.date === today && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none flex-shrink-0">NEW</span>
                            )}
                            <span className="truncate">{std.title}</span>
                          </span>
                        </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">{std.version}</td>
                      <td className="px-5 py-3 text-slate-500">{std.dept}</td>
                      <td className="px-5 py-3 text-slate-500">{std.owner}</td>
                      <td className="px-5 py-3 text-slate-500 text-xs">{std.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Notices & Reminders) */}
        <div className="space-y-6">
          {/* Notices */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Megaphone size={18} className="text-red-500" />
                公告通知
              </h2>
              <button className="text-sm text-slate-500 hover:text-slate-700">更多</button>
            </div>
            <div className="p-2">
              <ul className="divide-y divide-slate-100">
                {notices.map((notice) => (
                  <li key={notice.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 group-hover:text-blue-600 truncate flex items-center gap-2">
                          {notice.title}
                          {notice.isNew && <span className="inline-flex items-center rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">新</span>}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 flex-shrink-0">{notice.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* System Reminders */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" />
                系统提醒
              </h2>
            </div>
            <div className="p-2">
              <ul className="divide-y divide-slate-100">
                {reminders.map((reminder) => (
                  <li key={reminder.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors flex gap-3">
                    <div className="mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                        {reminder.message}
                      </p>
                      <span className="text-xs text-slate-400 mt-1 block">{reminder.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
