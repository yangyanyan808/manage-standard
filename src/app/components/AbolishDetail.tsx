import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit3, Info, Paperclip, FileDown } from "lucide-react";

export function AbolishDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [abolish] = useState({
    id: id || "ABL-2026-003",
    date: "2026-06-28",
    abolishDate: "—",
    status: "in_progress" as "draft" | "in_progress" | "completed",
    initiator: "李四",
    abolishReason: "该制度已不适应当前业务需求。随着公司数字化转型推进及新组织架构调整，原《旧版考勤管理制度》中多项条款与现行流程冲突。新版《考勤管理办法》V3.2已于2026年6月正式发布并替代本版本，涵盖弹性工作制、远程考勤等新场景。经部门评审一致同意废止旧版，避免制度冗余。",
  });

  const selectedStandard = {
    id: "SYS-2026-002",
    name: "旧版考勤管理制度",
    version: "V2.0",
    type: "制度" as "制度" | "流程",
    dept: "人力资源部",
    owner: "孙七",
  };

  const attachments = [
    { id: "att1", name: "废止申请表.docx", size: "120KB", type: "docx" },
    { id: "att2", name: "替代制度说明.pdf", size: "200KB", type: "pdf" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return (
          <span
            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${abolish.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            进行中
          </span>
        );
      case "completed":
        return (
          <span
            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${abolish.id}`, "_blank")}
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
              <h1 className="text-xl font-bold text-slate-900">废止详情</h1>
              {getStatusBadge(abolish.status)}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">编号: {abolish.id} · 发起时间: {abolish.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {abolish.status === "draft" && (
            <button
              onClick={() => navigate(`/abolish/${abolish.id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={16} /> 编辑
            </button>
          )}
          {(abolish.status === "in_progress" || abolish.status === "completed") && (
            <button
              onClick={() => window.open(`https://flow.example.com/form/${abolish.id}`, "_blank")}
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
                <p className="text-sm text-slate-700">{abolish.initiator}</p>
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
                <p className="text-sm text-slate-700">{abolish.date}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">废止时间</label>
                <p className="text-sm text-slate-700">{abolish.abolishDate}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">废止原因</label>
                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">{abolish.abolishReason}</p>
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
