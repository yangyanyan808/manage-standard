import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit3, FileText, Upload, Paperclip, FileDown } from "lucide-react";

export function ImportDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [importDoc] = useState({
    id: id || "IMP-2026-003",
    date: "2026-06-28",
    status: "in_progress" as "draft" | "in_progress" | "completed",
    importer: "赵六",
    title: "ISO 45001职业健康安全管理体系标准导入",
    importReason: "为完善公司职业健康安全管理体系，对标国际先进标准，提升安全管理水平，决定导入ISO 45001:2018标准。该标准为国际通用的职业健康安全管理体系规范，导入后将有助于公司通过相关认证，并提升在行业内的竞争力。",
  });

  const standards = [
    { id: "std1", code: "SYS-EXT-001", name: "ISO 45001 职业健康安全管理体系要求", version: "2018", type: "制度" as "制度" | "流程", receiver: "张三", receiveDate: "2026-06-28", applicable: "是", imported: "是", method: "直接采用", remark: "已翻译为中文版本" },
    { id: "std2", code: "SYS-EXT-002", name: "ISO 45001 实施指南", version: "2018", type: "制度" as "制度" | "流程", receiver: "李四", receiveDate: "2026-06-28", applicable: "是", imported: "否", method: "参考借鉴", remark: "部分条款不适用" },
  ];

  const attachments = [
    { id: "att1", name: "ISO-45001-2018-原文.pdf", size: "1.2MB", type: "pdf" },
    { id: "att2", name: "ISO-45001-中文译稿.docx", size: "850KB", type: "docx" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return (
          <span
            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${importDoc.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            进行中
          </span>
        );
      case "completed":
        return (
          <span
            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${importDoc.id}`, "_blank")}
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
              <h1 className="text-xl font-bold text-slate-900">导入详情</h1>
              {getStatusBadge(importDoc.status)}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">编号: {importDoc.id} · 导入人: {importDoc.importer} · 发起时间: {importDoc.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {importDoc.status === "draft" && (
            <button
              onClick={() => navigate(`/import/${importDoc.id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={16} /> 编辑
            </button>
          )}
          {(importDoc.status === "in_progress" || importDoc.status === "completed") && (
            <button
              onClick={() => window.open(`https://flow.example.com/form/${importDoc.id}`, "_blank")}
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
                <p className="text-sm font-mono text-slate-900">{importDoc.id}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">导入人</label>
                <p className="text-sm text-slate-700">{importDoc.importer}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">发起时间</label>
                <p className="text-sm text-slate-700">{importDoc.date}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">单据标题</label>
              <p className="text-sm font-medium text-slate-900">{importDoc.title}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">导入原因</label>
              <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">{importDoc.importReason}</p>
            </div>
          </div>
        </div>

        {/* Section 2: 外来标准 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Upload size={18} className="text-blue-500" />
              外来标准
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {standards.map((std, idx) => (
                <div key={std.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      标准 {idx + 1}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">编号</label>
                        <p className="text-xs font-mono text-slate-900">{std.code}</p>
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
                        <label className="text-xs text-slate-500">接收人</label>
                        <p className="text-sm text-slate-700">{std.receiver}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">接收时间</label>
                        <p className="text-sm text-slate-700">{std.receiveDate}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">是否适用</label>
                        <p><span className={`px-2 py-0.5 rounded text-xs font-medium ${std.applicable === "是" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>{std.applicable}</span></p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">是否导入</label>
                        <p><span className={`px-2 py-0.5 rounded text-xs font-medium ${std.imported === "是" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"}`}>{std.imported}</span></p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">承接方式</label>
                        <p className="text-sm text-slate-700">{std.method}</p>
                      </div>
                      <div className="space-y-1 md:col-span-5">
                        <label className="text-xs text-slate-500">备注</label>
                        <p className="text-sm text-slate-700">{std.remark || "—"}</p>
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
