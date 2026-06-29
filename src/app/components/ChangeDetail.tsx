import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit3, Info, Paperclip, FileDown } from "lucide-react";

export function ChangeDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [change] = useState({
    id: id || "CHG-2026-005",
    date: "2026-06-28",
    status: "in_progress" as "draft" | "in_progress" | "completed",
    initiator: "李四",
    changeReason: "根据最新法规要求，第三章安全检查频率需由每季度一次调整为每月一次，同步更新相关条款表述。新版《安全生产法》第42条明确要求高危行业每月至少进行一次全面安全检查，现行制度中每季度一次的频率已不符合法规要求，需立即更改。",
  });

  const selectedStandard = {
    id: "SYS-2026-001",
    name: "安全生产管理制度",
    version: "V2.0",
    type: "制度" as "制度" | "流程",
    dept: "安全管理部",
    owner: "张三",
  };

  const attachments = [
    { id: "att1", name: "安全生产管理制度-更改对照表.docx", size: "180KB", type: "docx" },
    { id: "att2", name: "法规依据文件.pdf", size: "350KB", type: "pdf" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return (
          <span
            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${change.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            进行中
          </span>
        );
      case "completed":
        return (
          <span
            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${change.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            已完成
          </span>
        );
      default:
        return null;
    }
  };

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

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">更改详情</h1>
              {getStatusBadge(change.status)}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">编号: {change.id} · 发起时间: {change.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {change.status === "draft" && (
            <button
              onClick={() => navigate(`/change/${change.id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={16} /> 编辑
            </button>
          )}
          {(change.status === "in_progress" || change.status === "completed") && (
            <button
              onClick={() => window.open(`https://flow.example.com/form/${change.id}`, "_blank")}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              查看流程表单
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: 制度/流程信息 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Info size={18} className="text-blue-500" />
              制度/流程信息
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">编号</label>
                <p className="text-sm font-mono text-slate-900">{selectedStandard.id}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-slate-500">名称</label>
                <p className="text-sm font-medium text-slate-900">{selectedStandard.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">版本</label>
                <p className="text-sm text-slate-700">{selectedStandard.version}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">类型</label>
                <p>{getTypeBadge(selectedStandard.type)}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">发起人</label>
                <p className="text-sm text-slate-700">{change.initiator}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">责任部门</label>
                <p className="text-sm text-slate-700">{selectedStandard.dept}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">责任人</label>
                <p className="text-sm text-slate-700">{selectedStandard.owner}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">发起时间</label>
                <p className="text-sm text-slate-700">{change.date}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">更改原因</label>
                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">{change.changeReason}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 附件 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Paperclip size={18} className="text-blue-500" />
              附件
            </h2>
          </div>
          <div className="p-6">
            {attachments.length > 0 ? (
              <div className="space-y-3">
                {attachments.map(att => (
                  <div key={att.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileDown size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{att.name}</p>
                        <p className="text-xs text-slate-500">.{att.type} · {att.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`下载文件: ${att.name}`)}
                      className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      下载
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">暂无附件</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
