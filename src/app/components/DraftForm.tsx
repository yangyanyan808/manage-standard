import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Save, Send, Info, Users, FileText, Paperclip, Plus, Trash2, Upload, X, FileDown } from "lucide-react";

interface ConsultedPerson {
  id: string;
  name: string;
  dept: string;
  position: string;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

export function DraftForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    code: isEdit ? "DFT-2026-005" : "",
    name: isEdit ? "《安全生产管理制度》征求意见稿" : "",
    version: isEdit ? "V2.0" : "",
    type: "制度" as "制度" | "流程",
    dept: isEdit ? "安全管理部" : "",
    owner: isEdit ? "张三" : "",
    drafter: isEdit ? "李四" : "",
    remark: isEdit ? "根据2026年度安全管理要求，对该制度进行全面修订。" : "",
  });

  const [consultedPersons, setConsultedPersons] = useState<ConsultedPerson[]>(
    isEdit ? [
      { id: "cp1", name: "王五", dept: "业务发展部", position: "部门经理" },
      { id: "cp2", name: "赵六", dept: "财务部", position: "主管" },
    ] : []
  );

  const [contentFile, setContentFile] = useState<File | null>(null);
  const [contentMode, setContentMode] = useState<"upload" | "template">("upload");
  const [attachments, setAttachments] = useState<Attachment[]>(
    isEdit ? [
      { id: "att1", name: "安全管理办法-征求意见稿.docx", size: "256KB", type: "docx" },
    ] : []
  );

  const [showPersonSelector, setShowPersonSelector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  // Mock person data for selector
  const mockPersons = [
    { id: "p1", name: "王五", dept: "业务发展部", position: "部门经理" },
    { id: "p2", name: "赵六", dept: "财务部", position: "主管" },
    { id: "p3", name: "孙七", dept: "人力资源部", position: "总监" },
    { id: "p4", name: "周八", dept: "研发部", position: "技术负责人" },
    { id: "p5", name: "吴九", dept: "采购部", position: "采购主管" },
  ];

  // Mock templates
  const templates = [
    { id: "t1", name: "管理制度标准模板", desc: "适用于各类管理制度的起草" },
    { id: "t2", name: "流程规范标准模板", desc: "适用于业务流程规范的起草" },
    { id: "t3", name: "安全管理制度模板", desc: "适用于安全管理类制度" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addConsultedPerson = (person: typeof mockPersons[0]) => {
    if (consultedPersons.some(cp => cp.name === person.name)) return;
    setConsultedPersons(prev => [...prev, { ...person }]);
  };

  const removeConsultedPerson = (id: string) => {
    setConsultedPersons(prev => prev.filter(cp => cp.id !== id));
  };

  const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setContentFile(file);
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
    if (!formData.name || !formData.dept || !formData.owner || !formData.drafter) {
      alert("请填写完整的基本信息！");
      return;
    }
    const msg = action === "draft" ? "草稿已保存！" : "已提交至审批流程！";
    alert(msg);
    navigate("/draft");
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
              {isEdit ? "编辑起草" : "发起起草"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit ? "修改起草内容并重新提交" : "填写制度/流程的起草信息，并征询相关人员意见"}
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
              <Info size={18} className="text-blue-500" />
              基本信息
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">编号</label>
              <input
                type="text" name="code" value={formData.code}
                onChange={handleChange}
                placeholder="自动生成或手动输入"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-slate-50"
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">名称 <span className="text-red-500">*</span></label>
              <input
                type="text" name="name" value={formData.name}
                onChange={handleChange} required
                placeholder="请输入起草的制度/流程名称"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">版本 <span className="text-red-500">*</span></label>
              <input
                type="text" name="version" value={formData.version}
                onChange={handleChange} required
                placeholder="例如：V1.0"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">类型 <span className="text-red-500">*</span></label>
              <select
                name="type" value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="制度">制度</option>
                <option value="流程">流程</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">责任部门 <span className="text-red-500">*</span></label>
              <input
                type="text" name="dept" value={formData.dept}
                onChange={handleChange} required
                placeholder="请输入责任部门"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">责任人 <span className="text-red-500">*</span></label>
              <input
                type="text" name="owner" value={formData.owner}
                onChange={handleChange} required
                placeholder="请输入责任人"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">起草人 <span className="text-red-500">*</span></label>
              <input
                type="text" name="drafter" value={formData.drafter}
                onChange={handleChange} required
                placeholder="请输入起草人"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">备注</label>
              <textarea
                name="remark" value={formData.remark}
                onChange={handleChange}
                rows={3}
                placeholder="请输入备注信息..."
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 被征询人 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              被征询人
            </h2>
            <button
              type="button"
              onClick={() => setShowPersonSelector(!showPersonSelector)}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <Plus size={16} /> 添加被征询人
            </button>
          </div>

          {/* Person Selector Dropdown */}
          {showPersonSelector && (
            <div className="px-6 py-4 border-b border-slate-100 bg-blue-50/30">
              <p className="text-xs text-slate-500 mb-3">从以下列表中选择被征询人：</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockPersons.filter(p => !consultedPersons.some(cp => cp.name === p.name)).map(person => (
                  <div
                    key={person.id}
                    onClick={() => addConsultedPerson(person)}
                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm flex-shrink-0">
                      {person.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800">{person.name}</p>
                      <p className="text-xs text-slate-500">{person.dept} · {person.position}</p>
                    </div>
                  </div>
                ))}
              </div>
              {mockPersons.filter(p => !consultedPersons.some(cp => cp.name === p.name)).length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">所有人员已添加</p>
              )}
            </div>
          )}

          {/* Selected Persons Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-medium w-16">序号</th>
                  <th className="px-6 py-3 font-medium">姓名</th>
                  <th className="px-6 py-3 font-medium">部门</th>
                  <th className="px-6 py-3 font-medium">岗位</th>
                  <th className="px-6 py-3 font-medium w-16 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultedPersons.length > 0 ? (
                  consultedPersons.map((person, index) => (
                    <tr key={person.id} className="hover:bg-slate-50 group">
                      <td className="px-6 py-3 text-slate-500">{index + 1}</td>
                      <td className="px-6 py-3 font-medium text-slate-900">{person.name}</td>
                      <td className="px-6 py-3 text-slate-600">{person.dept}</td>
                      <td className="px-6 py-3 text-slate-600">{person.position}</td>
                      <td className="px-6 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeConsultedPerson(person.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="移除"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                      请点击上方"添加被征询人"按钮选择征询对象
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: 正文 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              正文
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Mode Toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setContentMode("upload")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${contentMode === "upload" ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-slate-600 bg-white border border-slate-200 hover:bg-slate-50"}`}
              >
                <Upload size={16} className="inline mr-1.5" />
                上传正文
              </button>
              <button
                type="button"
                onClick={() => setContentMode("template")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${contentMode === "template" ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-slate-600 bg-white border border-slate-200 hover:bg-slate-50"}`}
              >
                <FileText size={16} className="inline mr-1.5" />
                选择模板
              </button>
            </div>

            {contentMode === "upload" ? (
              <div>
                {contentFile ? (
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{contentFile.name}</p>
                        <p className="text-xs text-slate-500">{Math.round(contentFile.size / 1024)} KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert("打开在线编辑器...")}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        在线编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => setContentFile(null)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">点击此处上传正文</p>
                    <p className="text-xs text-slate-400">支持 docx, pdf 等格式，Word 文件可在线编辑</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,.doc,.pdf,.txt"
                  onChange={handleContentFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(tpl => (
                  <div
                    key={tpl.id}
                    onClick={() => alert(`已选择模板: ${tpl.name}，进入在线编辑器...`)}
                    className="p-4 border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                      <FileText size={20} />
                    </div>
                    <p className="text-sm font-medium text-slate-800 mb-1">{tpl.name}</p>
                    <p className="text-xs text-slate-500">{tpl.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: 附件 */}
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
