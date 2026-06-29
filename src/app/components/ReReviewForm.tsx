import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Save, Send, FileText, Search, Paperclip, Plus, Trash2, FileDown, CheckCircle, XCircle } from "lucide-react";

interface StandardItem {
  id: string;
  name: string;
  version: string;
  type: "制度" | "流程";
  dept: string;
  owner: string;
  validDate: string;
}

interface ReviewedStandard extends StandardItem {
  entryId: string;
  isValid: boolean;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

const mockStandards: StandardItem[] = [
  { id: "SYS-2026-001", name: "安全生产管理制度", version: "V2.0", type: "制度", dept: "安全管理部", owner: "张三", validDate: "2026-12-31" },
  { id: "SYS-2026-002", name: "考勤管理办法", version: "V3.1", type: "制度", dept: "人力资源部", owner: "孙七", validDate: "2025-06-30" },
  { id: "SYS-2026-003", name: "研发项目管理规范", version: "V1.0", type: "制度", dept: "研发部", owner: "陈一", validDate: "2027-03-15" },
  { id: "PRC-2026-001", name: "采购审批流程", version: "V1.0", type: "流程", dept: "采购部", owner: "王五", validDate: "2025-12-01" },
  { id: "PRC-2026-002", name: "费用报销流程", version: "V2.5", type: "流程", dept: "财务部", owner: "吴九", validDate: "2026-08-20" },
];

function isDateValid(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const validDate = new Date(dateStr);
  return validDate >= today;
}

export function ReReviewForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [title, setTitle] = useState(isEdit ? "安全生产管理制度复审" : "");
  const [reviewReason, setReviewReason] = useState(
    isEdit ? "根据公司制度管理规定，所有已发布制度需每年至少复审一次。安全生产管理制度已运行两年，需对其适用性、有效性和合规性进行全面复审，确保与实际安全管理需求保持一致。" : ""
  );

  const [selectedStandards, setSelectedStandards] = useState<ReviewedStandard[]>(
    isEdit ? [
      { ...mockStandards[0], entryId: "rev1", isValid: isDateValid(mockStandards[0].validDate) },
      { ...mockStandards[1], entryId: "rev2", isValid: isDateValid(mockStandards[1].validDate) },
    ] : []
  );
  const [showStandardSelector, setShowStandardSelector] = useState(false);
  const [standardSearch, setStandardSearch] = useState("");

  const [attachments, setAttachments] = useState<Attachment[]>(
    isEdit ? [
      { id: "att1", name: "安全生产管理制度-复审报告.docx", size: "220KB", type: "docx" },
      { id: "att2", name: "制度有效性评估表.xlsx", size: "150KB", type: "xlsx" },
    ] : []
  );
  const attachInputRef = useRef<HTMLInputElement>(null);

  const availableStandards = mockStandards.filter(s =>
    !selectedStandards.some(sel => sel.id === s.id)
  );
  const filteredStandards = availableStandards.filter(s =>
    !standardSearch ||
    s.name.includes(standardSearch) ||
    s.id.includes(standardSearch) ||
    s.dept.includes(standardSearch)
  );

  const selectStandard = (std: StandardItem) => {
    const reviewed: ReviewedStandard = {
      ...std,
      entryId: Date.now().toString(),
      isValid: isDateValid(std.validDate),
    };
    setSelectedStandards(prev => [...prev, reviewed]);
    setShowStandardSelector(false);
    setStandardSearch("");
  };

  const removeStandard = (entryId: string) => {
    setSelectedStandards(prev => prev.filter(s => s.entryId !== entryId));
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
    if (!reviewReason.trim()) {
      alert("请填写复审原因！");
      return;
    }
    if (selectedStandards.length === 0) {
      alert("请至少选择一个制度或流程进行复审！");
      return;
    }
    const msg = action === "draft" ? "草稿已保存！" : "已提交至审批流程！";
    alert(msg);
    navigate("/re-review");
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
              {isEdit ? "编辑复审" : "发起复审"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit ? "修改复审内容并重新提交" : "选择需要复审的制度或流程，填写复审原因"}
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
                placeholder="请输入复审单据标题，如：安全生产管理制度复审"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">复审原因 <span className="text-red-500">*</span></label>
              <textarea
                value={reviewReason}
                onChange={(e) => setReviewReason(e.target.value)}
                rows={3}
                placeholder="请说明复审的原因、目的和复审范围..."
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 复审标准 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Search size={18} className="text-blue-500" />
              复审标准
            </h2>
            {availableStandards.length > 0 && (
              <button
                type="button"
                onClick={() => setShowStandardSelector(!showStandardSelector)}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <Plus size={16} /> 添加标准/流程
              </button>
            )}
          </div>

          {/* Standard Selector */}
          {showStandardSelector && availableStandards.length > 0 && (
            <div className="px-6 py-4 border-b border-slate-100 bg-blue-50/30">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="搜索制度/流程名称、编号或部门..."
                  value={standardSearch}
                  onChange={(e) => setStandardSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all w-full bg-white"
                />
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredStandards.map(std => (
                  <div
                    key={std.id}
                    onClick={() => selectStandard(std)}
                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-xs text-slate-500 flex-shrink-0">{std.id}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{std.name}</p>
                        <p className="text-xs text-slate-500">{std.version} · {std.dept} · {std.owner}</p>
                      </div>
                    </div>
                    {getTypeBadge(std.type)}
                  </div>
                ))}
                {filteredStandards.length === 0 && (
                  <p className="text-sm text-slate-400 text-center py-4">未找到匹配的制度/流程</p>
                )}
              </div>
            </div>
          )}

          {/* Selected Standards List */}
          <div className="p-6">
            {selectedStandards.length > 0 ? (
              <div className="space-y-4">
                {selectedStandards.map((std, idx) => (
                  <div key={std.entryId} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <FileText size={14} className="text-slate-400" />
                        复审标准 {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeStandard(std.entryId)}
                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="移除此标准"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400">
                  {availableStandards.length === 0
                    ? "所有制度/流程均已添加"
                    : '请点击「添加标准/流程」按钮，选择需要复审的制度或流程'}
                </p>
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
