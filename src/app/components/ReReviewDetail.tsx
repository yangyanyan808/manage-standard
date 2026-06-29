import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit3, FileText, Search, Paperclip, FileDown, CheckCircle, XCircle } from "lucide-react";

export function ReReviewDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [reReview] = useState({
    id: id || "RER-2026-003",
    date: "2026-06-28",
    status: "in_progress" as "draft" | "in_progress" | "completed",
    reviewer: "张三",
    title: "安全生产管理制度复审",
    reviewReason: "根据公司制度管理规定，所有已发布制度需每年至少复审一次。安全生产管理制度已运行两年，需对其适用性、有效性和合规性进行全面复审，确保与实际安全管理需求保持一致。本次复审范围涵盖制度的完整性、适用性、与现行法规的符合性等方面。",
  });

  const standards = [
    { entryId: "rev1", id: "SYS-2026-001", name: "安全生产管理制度", version: "V2.0", type: "制度" as "制度" | "流程", dept: "安全管理部", owner: "张三", validDate: "2026-12-31", isValid: true },
    { entryId: "rev2", id: "SYS-2026-002", name: "考勤管理办法", version: "V3.1", type: "制度" as "制度" | "流程", dept: "人力资源部", owner: "孙七", validDate: "2025-06-30", isValid: false },
  ];

  const attachments = [
    { id: "att1", name: "安全生产管理制度-复审报告.docx", size: "220KB", type: "docx" },
    { id: "att2", name: "制度有效性评估表.xlsx", size: "150KB", type: "xlsx" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return (
          <span
            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${reReview.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            进行中
          </span>
        );
      case "completed":
        return (
          <span
            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${reReview.id}`, "_blank")}
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
              <h1 className="text-xl font-bold text-slate-900">复审详情</h1>
              {getStatusBadge(reReview.status)}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">编号: {reReview.id} · 复审人: {reReview.reviewer} · 发起时间: {reReview.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {reReview.status === "draft" && (
            <button
              onClick={() => navigate(`/re-review/${reReview.id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={16} /> 编辑
            </button>
          )}
          {(reReview.status === "in_progress" || reReview.status === "completed") && (
            <button
              onClick={() => window.open(`https://flow.example.com/form/${reReview.id}`, "_blank")}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              查看流程表单
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: 基本信息 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              基本信息
            </h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">单据编号</label>
                <p className="text-sm font-mono text-slate-900">{reReview.id}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">复审人</label>
                <p className="text-sm text-slate-700">{reReview.reviewer}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">发起时间</label>
                <p className="text-sm text-slate-700">{reReview.date}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">单据标题</label>
              <p className="text-sm font-medium text-slate-900">{reReview.title}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">复审原因</label>
              <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">{reReview.reviewReason}</p>
            </div>
          </div>
        </div>

        {/* Section 2: 复审标准 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Search size={18} className="text-blue-500" />
              复审标准
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {standards.map((std, idx) => (
                <div key={std.entryId} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      复审标准 {idx + 1}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">编号</label>
                        <p className="text-sm font-mono text-slate-900">{std.id}</p>
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs text-slate-500">名称</label>
                        <p className="text-sm font-medium text-slate-900">{std.name}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">版本</label>
                        <p className="text-sm text-slate-700">{std.version}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">类型</label>
                        <p>{getTypeBadge(std.type)}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">责任部门</label>
                        <p className="text-sm text-slate-700">{std.dept}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">责任人</label>
                        <p className="text-sm text-slate-700">{std.owner}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">有效日期</label>
                        <p className="text-sm text-slate-700">{std.validDate}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">是否有效</label>
                        <div className="pt-0.5">
                          {std.isValid ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200">
                              <CheckCircle size={12} /> 有效
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-500 rounded-full text-xs font-medium border border-red-200">
                              <XCircle size={12} /> 已过期
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: 附件 */}
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
