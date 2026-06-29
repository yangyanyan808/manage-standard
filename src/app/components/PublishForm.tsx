import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Save, Send, Info, Paperclip, Plus, Trash2, Search, FileDown } from "lucide-react";

interface SelectedStandard {
  id: string;
  name: string;
  version: string;
  type: "制度" | "流程";
  dept: string;
  owner: string;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

const mockStandards: SelectedStandard[] = [
  { id: "SYS-2026-001", name: "安全生产管理制度", version: "V2.0", type: "制度", dept: "安全管理部", owner: "张三" },
  { id: "SYS-2026-002", name: "考勤管理办法", version: "V3.1", type: "制度", dept: "人力资源部", owner: "孙七" },
  { id: "SYS-2026-003", name: "研发项目管理规范", version: "V1.0", type: "制度", dept: "研发部", owner: "陈一" },
  { id: "PRC-2026-001", name: "采购审批流程", version: "V1.0", type: "流程", dept: "采购部", owner: "王五" },
  { id: "PRC-2026-002", name: "费用报销流程", version: "V2.5", type: "流程", dept: "财务部", owner: "吴九" },
];

export function PublishForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [selectedStandard, setSelectedStandard] = useState<SelectedStandard | null>(
    isEdit ? mockStandards[0] : null
  );
  const [publishNote, setPublishNote] = useState(
    isEdit ? "该制度已通过评议审核，具备发布条件。正式发布后即日生效，旧版同时废止。" : ""
  );
  const [showStandardSelector, setShowStandardSelector] = useState(false);
  const [standardSearch, setStandardSearch] = useState("");

  const [attachments, setAttachments] = useState<Attachment[]>(
    isEdit ? [
      { id: "att1", name: "安全生产管理制度-正式发布版.docx", size: "280KB", type: "docx" },
      { id: "att2", name: "发布通知.pdf", size: "120KB", type: "pdf" },
    ] : []
  );
  const attachInputRef = useRef<HTMLInputElement>(null);

  const filteredStandards = mockStandards.filter(s =>
    !standardSearch ||
    s.name.includes(standardSearch) ||
    s.id.includes(standardSearch) ||
    s.dept.includes(standardSearch)
  );

  const selectStandard = (standard: SelectedStandard) => {
    setSelectedStandard(standard);
    setShowStandardSelector(false);
    setStandardSearch("");
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
    if (!selectedStandard) {
      alert("请选择一个制度或流程！");
      return;
    }
    const msg = action === "draft" ? "草稿已保存！" : "已提交至审批流程！";
    alert(msg);
    navigate("/publish");
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
              {isEdit ? "编辑发布" : "发起发布"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit ? "修改发布内容并重新提交" : "选择已通过评议审核的制度或流程进行正式发布"}
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
        {/* Section 1: 选择制度或流程 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Info size={18} className="text-blue-500" />
              选择制度或流程
            </h2>
            {!selectedStandard && (
              <button
                type="button"
                onClick={() => setShowStandardSelector(!showStandardSelector)}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <Search size={16} /> 选择制度/流程
              </button>
            )}
          </div>

          {/* Standard Selector */}
          {showStandardSelector && !selectedStandard && (
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

          {/* Selected Standard Info + Publish Note */}
          <div className="p-6 space-y-6">
            {selectedStandard ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">编号</label>
                      <p className="text-sm font-mono text-slate-900">{selectedStandard.id}</p>
                    </div>
                    <div className="space-y-1">
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
                      <label className="text-xs text-slate-500">责任部门</label>
                      <p className="text-sm text-slate-700">{selectedStandard.dept}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">责任人</label>
                      <p className="text-sm text-slate-700">{selectedStandard.owner}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedStandard(null)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0 ml-4"
                    title="取消选择"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">发布说明 <span className="text-red-500">*</span></label>
                    <textarea
                      value={publishNote}
                      onChange={(e) => setPublishNote(e.target.value)}
                      rows={4}
                      placeholder="请输入发布说明，包括发布范围、生效时间、旧版处理方式等..."
                      className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                请点击"选择制度/流程"按钮，从已通过评议审核的制度/流程中选择发布对象
              </p>
            )}
          </div>
        </div>

        {/* Section 2: 附件 */}
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
