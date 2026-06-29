import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Save, Send, Paperclip, Info, Plus, Trash2, List, Settings } from "lucide-react";
import clsx from "clsx";

type PlanItem = {
  id: string;
  systemId?: string;
  name: string;
  type: "制度" | "流程";
  version?: string;
  publishDate?: string;
  owner: string;
  dept: string;
  dueDate: string;
};

export function PlanForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    type: "制订",
    reason: "",
  });

  const [items, setItems] = useState<PlanItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "type") {
      setItems([]); // 重置明细项
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id: string, field: keyof PlanItem, value: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addCreateItem = () => {
    setItems(prev => [
      ...prev, 
      { id: Date.now().toString(), name: "", type: "制度", owner: "张三", dept: "信息中心", dueDate: "" }
    ]);
  };

  const mockSelectSystem = () => {
    setItems(prev => [
      ...prev, 
      { 
        id: Date.now().toString(), 
        systemId: "SYS-2026-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        name: "示例管理规范", 
        type: "制度", 
        version: "V1.0",
        publishDate: "2025-05-20",
        owner: "张三", 
        dept: "信息中心", 
        dueDate: "" 
      }
    ]);
  };

  const mockSelectProcess = () => {
    setItems(prev => [
      ...prev, 
      { 
        id: Date.now().toString(), 
        systemId: "PRC-2026-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        name: "示例审批流程", 
        type: "流程", 
        version: "V2.1",
        publishDate: "2025-08-15",
        owner: "李四", 
        dept: "业务部", 
        dueDate: "" 
      }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("请至少添加一项拟制修订制度/流程！");
      return;
    }
    // Check if any empty values
    const hasEmpty = items.some(i => !i.name || !i.owner || !i.dept || !i.dueDate);
    if (hasEmpty && formData.type === "制订") {
      alert("请完整填写明细表中的信息！");
      return;
    }
    alert("制修订计划已提交至审批流程！");
    navigate("/plan");
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
            <h1 className="text-xl font-bold text-slate-900">填写制修订计划</h1>
            <p className="text-sm text-slate-500 mt-0.5">请填写相关制度/标准的新增、修订或废止计划</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Save size={16} /> 保存草稿
          </button>
          <button 
            onClick={handleSubmit}
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Send size={16} /> 提交审批
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Block 1: 基础信息 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Info size={18} className="text-blue-500" />
              基础信息
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-slate-700">计划名称 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="例如：2026年度关于《安全管理办法》的修订计划"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-slate-700">计划类型 <span className="text-red-500">*</span></label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="制订">制订 (新建)</option>
                <option value="修订">修订 (更新)</option>
                <option value="废止">废止 (淘汰)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Block 2: 拟制修订明细 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <List size={18} className="text-blue-500" />
              拟{formData.type}明细
            </h2>
            <div className="flex gap-2">
              {formData.type === "制订" ? (
                <button 
                  type="button" 
                  onClick={addCreateItem}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  <Plus size={16} /> 添加一行
                </button>
              ) : (
                <>
                  <button 
                    type="button" 
                    onClick={mockSelectSystem}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                  >
                    <Plus size={16} /> 选择制度
                  </button>
                  <button 
                    type="button" 
                    onClick={mockSelectProcess}
                    className="px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                  >
                    <Plus size={16} /> 选择流程
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto p-4">
            {formData.type === "制订" ? (
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-tl-lg w-16">序号</th>
                    <th className="px-4 py-3 font-medium">名称 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-32">类型 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-32">责任人 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-40">责任部门 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-48">计划完成日期 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-16 rounded-tr-lg">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 group">
                      <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.name} 
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} 
                          required 
                          placeholder="请输入名称" 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white transition-all" 
                          value={item.type} 
                          onChange={(e) => handleItemChange(item.id, 'type', e.target.value as any)}
                        >
                          <option value="制度">制度</option>
                          <option value="流程">流程</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.owner} 
                          onChange={(e) => handleItemChange(item.id, 'owner', e.target.value)} 
                          required 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.dept} 
                          onChange={(e) => handleItemChange(item.id, 'dept', e.target.value)} 
                          required 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="date" 
                          className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.dueDate} 
                          onChange={(e) => handleItemChange(item.id, 'dueDate', e.target.value)} 
                          required 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          type="button" 
                          onClick={() => removeItem(item.id)} 
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-500 text-sm">
                        请点击上方“添加一行”按钮录入拟制订的制度/流程信息
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-tl-lg">编号</th>
                    <th className="px-4 py-3 font-medium">名称</th>
                    <th className="px-4 py-3 font-medium">类型</th>
                    <th className="px-4 py-3 font-medium">版本</th>
                    <th className="px-4 py-3 font-medium">发布日期</th>
                    <th className="px-4 py-3 font-medium w-28">责任人 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-36">责任部门 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-44">计划完成日期 <span className="text-red-500">*</span></th>
                    <th className="px-4 py-3 font-medium w-16 rounded-tr-lg">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 group">
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">{item.systemId}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                      <td className="px-4 py-3">
                        <span className={clsx(
                          "px-2 py-0.5 text-xs rounded",
                          item.type === "制度" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                        )}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{item.version}</td>
                      <td className="px-4 py-3 text-slate-600">{item.publishDate}</td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          className="w-full px-2 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.owner} 
                          onChange={(e) => handleItemChange(item.id, 'owner', e.target.value)} 
                          required 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          className="w-full px-2 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.dept} 
                          onChange={(e) => handleItemChange(item.id, 'dept', e.target.value)} 
                          required 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="date" 
                          className="w-full px-2 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                          value={item.dueDate} 
                          onChange={(e) => handleItemChange(item.id, 'dueDate', e.target.value)} 
                          required 
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          type="button" 
                          onClick={() => removeItem(item.id)} 
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="移除"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-slate-500 text-sm">
                        请点击上方按钮选择拟{formData.type}的制度或流程
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Block 3: 详细信息与附件 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Settings size={18} className="text-blue-500" />
              补充说明与附件
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">立项缘由/说明背景 <span className="text-red-500">*</span></label>
              <textarea 
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                placeholder="请详细描述本次计划实施的背景、目的及主要解决的问题..."
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="border-t border-slate-100 pt-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">相关附件</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <Paperclip size={24} />
                  </div>
                  <p className="text-sm text-slate-600 mb-1">点击或拖拽文件到此处上传</p>
                  <p className="text-xs text-slate-400">支持 docx, pdf, xlsx 等格式，单个文件不超过 50MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
