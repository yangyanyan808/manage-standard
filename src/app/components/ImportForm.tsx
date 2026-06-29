import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Save, Send, FileText, Upload, Paperclip, Plus, Trash2, FileDown } from "lucide-react";

interface ImportedStandard {
  id: string;
  code: string;
  name: string;
  version: string;
  type: "制度" | "流程";
  receiver: string;
  receiveDate: string;
  applicable: "是" | "否";
  imported: "是" | "否";
  method: string;
  remark: string;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

export function ImportForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [title, setTitle] = useState(isEdit ? "ISO 45001职业健康安全管理体系标准导入" : "");
  const [importReason, setImportReason] = useState(
    isEdit ? "为完善公司职业健康安全管理体系，对标国际先进标准，提升安全管理水平，决定导入ISO 45001:2018标准。" : ""
  );

  const [standards, setStandards] = useState<ImportedStandard[]>(
    isEdit ? [
      { id: "std1", code: "SYS-EXT-001", name: "ISO 45001 职业健康安全管理体系要求", version: "2018", type: "制度", receiver: "张三", receiveDate: "2026-06-28", applicable: "是", imported: "是", method: "直接采用", remark: "已翻译为中文版本" },
      { id: "std2", code: "SYS-EXT-002", name: "ISO 45001 实施指南", version: "2018", type: "制度", receiver: "李四", receiveDate: "2026-06-28", applicable: "是", imported: "否", method: "参考借鉴", remark: "部分条款不适用" },
    ] : []
  );
  const standardFileInputRef = useRef<HTMLInputElement>(null);

  const [attachments, setAttachments] = useState<Attachment[]>(
    isEdit ? [
      { id: "att1", name: "ISO-45001-2018-原文.pdf", size: "1.2MB", type: "pdf" },
      { id: "att2", name: "ISO-45001-中文译稿.docx", size: "850KB", type: "docx" },
    ] : []
  );
  const attachInputRef = useRef<HTMLInputElement>(null);

  const handleStandardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newStandards: ImportedStandard[] = Array.from(files).map((f, i) => {
        const dotIndex = f.name.lastIndexOf('.');
        const nameWithoutExt = dotIndex > 0 ? f.name.substring(0, dotIndex) : f.name;
        return {
          id: Date.now().toString() + i,
          code: "",
          name: nameWithoutExt,
          version: "",
          type: "制度" as "制度" | "流程",
          receiver: "",
          receiveDate: new Date().toISOString().split('T')[0],
          applicable: "是",
          imported: "是",
          method: "",
          remark: "",
        };
      });
      setStandards(prev => [...prev, ...newStandards]);
    }
    if (standardFileInputRef.current) standardFileInputRef.current.value = "";
  };

  const updateStandard = (id: string, field: keyof ImportedStandard, value: string) => {
    setStandards(prev => prev.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const removeStandard = (id: string) => {
    setStandards(prev => prev.filter(s => s.id !== id));
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map((f, i) => ({
        id: Date.now().toString() + i,
        name: f.name,
        size: `${Math.round(f.size / 1024)}KB`,
        type: f.name.split('.').pop() || '',
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent, action: "draft" | "submit") => {
    e.preventDefault();
    if (!title.trim()) {
      alert("请填写单据标题！");
      return;
    }
    if (!importReason.trim()) {
      alert("请填写导入原因！");
      return;
    }
    if (standards.length === 0) {
      alert("请至少导入一个外来标准文件！");
      return;
    }
    const msg = action === "draft" ? "草稿已保存！" : "已提交至审批流程！";
    alert(msg);
    navigate("/import");
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
            <h1 className="text-xl font-bold text-slate-900">
              {isEdit ? "编辑导入" : "新建导入"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit ? "修改外来标准导入内容并重新提交" : "上传外部标准文件，填写标准信息并提交导入申请"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e as any, "draft")}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Save size={16} /> 保存草稿
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e as any, "submit")}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Send size={16} /> 提交审批
          </button>
        </div>
      </div>

      <form className="space-y-6">
        {/* Section 1: 基本信息 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              基本信息
            </h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">单据标题 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="请输入导入单据标题，如：ISO 45001职业健康安全管理体系标准导入"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">导入原因 <span className="text-red-500">*</span></label>
              <textarea
                value={importReason}
                onChange={(e) => setImportReason(e.target.value)}
                rows={3}
                placeholder="请说明导入外来标准的原因、目的和预期效果..."
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 外来标准 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Upload size={18} className="text-blue-500" />
              外来标准
            </h2>
            <button
              type="button"
              onClick={() => standardFileInputRef.current?.click()}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <Plus size={16} /> 添加标准文件
            </button>
            <input
              ref={standardFileInputRef}
              type="file"
              multiple
              accept=".docx,.doc,.pdf,.xlsx,.xls,.pptx,.ppt,.txt"
              onChange={handleStandardFileChange}
              className="hidden"
            />
          </div>
          <div className="p-6">
            {standards.length > 0 ? (
              <div className="space-y-4">
                {standards.map((std, idx) => (
                  <div key={std.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <FileText size={14} className="text-slate-400" />
                        标准 {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeStandard(std.id)}
                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="删除此标准"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">编号</label>
                          <input
                            type="text"
                            value={std.code}
                            onChange={(e) => updateStandard(std.id, "code", e.target.value)}
                            placeholder="如: SYS-EXT-001"
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs text-slate-500">名称</label>
                          <input
                            type="text"
                            value={std.name}
                            onChange={(e) => updateStandard(std.id, "name", e.target.value)}
                            placeholder="标准名称"
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">版本</label>
                          <input
                            type="text"
                            value={std.version}
                            onChange={(e) => updateStandard(std.id, "version", e.target.value)}
                            placeholder="如: 2018"
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">类型</label>
                          <select
                            value={std.type}
                            onChange={(e) => updateStandard(std.id, "type", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all bg-white"
                          >
                            <option value="制度">制度</option>
                            <option value="流程">流程</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">接收人</label>
                          <input
                            type="text"
                            value={std.receiver}
                            onChange={(e) => updateStandard(std.id, "receiver", e.target.value)}
                            placeholder="接收人姓名"
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">接收时间</label>
                          <input
                            type="date"
                            value={std.receiveDate}
                            onChange={(e) => updateStandard(std.id, "receiveDate", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">是否适用</label>
                          <select
                            value={std.applicable}
                            onChange={(e) => updateStandard(std.id, "applicable", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all bg-white"
                          >
                            <option value="是">是</option>
                            <option value="否">否</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">是否导入</label>
                          <select
                            value={std.imported}
                            onChange={(e) => updateStandard(std.id, "imported", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all bg-white"
                          >
                            <option value="是">是</option>
                            <option value="否">否</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-500">承接方式</label>
                          <input
                            type="text"
                            value={std.method}
                            onChange={(e) => updateStandard(std.id, "method", e.target.value)}
                            placeholder="如: 直接采用、参考借鉴"
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-5">
                          <label className="text-xs text-slate-500">备注</label>
                          <input
                            type="text"
                            value={std.remark}
                            onChange={(e) => updateStandard(std.id, "remark", e.target.value)}
                            placeholder="其他补充说明..."
                            className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={() => standardFileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <Upload size={24} />
                </div>
                <p className="text-sm text-slate-600 mb-1">点击选择外来标准文件</p>
                <p className="text-xs text-slate-400">支持批量选择，选择后填写每个标准的详细信息</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: 附件 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Paperclip size={18} className="text-blue-500" />
              附件
            </h2>
            <button
              type="button"
              onClick={() => attachInputRef.current?.click()}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <Plus size={16} /> 上传附件
            </button>
            <input
              ref={attachInputRef}
              type="file"
              multiple
              accept=".docx,.doc,.pdf,.xlsx,.xls,.pptx,.ppt,.txt,.zip"
              onChange={handleAttachmentChange}
              className="hidden"
            />
          </div>
          <div className="p-6">
            {attachments.length > 0 ? (
              <div className="space-y-3">
                {attachments.map(att => (
                  <div key={att.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white transition-colors">
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
                      onClick={() => removeAttachment(att.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={() => attachInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <Paperclip size={24} />
                </div>
                <p className="text-sm text-slate-600 mb-1">点击或拖拽文件到此处上传附件</p>
                <p className="text-xs text-slate-400">支持 docx, pdf, xlsx, pptx 等格式，单个文件不超过 50MB</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
