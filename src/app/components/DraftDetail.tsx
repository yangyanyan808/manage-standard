import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit3, Info, Users, FileText, Paperclip, MessageSquare, FileDown } from "lucide-react";

export function DraftDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mock data - in real app would fetch by id
  const [draft] = useState({
    id: id || "DFT-2026-005",
    name: "《安全生产管理制度》征求意见稿",
    version: "V2.0",
    type: "制度" as "制度" | "流程",
    dept: "安全管理部",
    owner: "张三",
    drafter: "李四",
    date: "2026-06-20",
    status: "in_progress" as "draft" | "in_progress" | "completed",
    remark: "根据2026年度安全管理要求，对该制度进行全面修订。",
  });

  const consultedPersons = [
    { id: "cp1", name: "王五", dept: "业务发展部", position: "部门经理" },
    { id: "cp2", name: "赵六", dept: "财务部", position: "主管" },
  ];

  const contentFile = { name: "安全管理办法-征求意见稿.docx", size: 256, editorUrl: "#" };

  const attachments = [
    { id: "att1", name: "安全管理办法-征求意见稿.docx", size: "256KB", type: "docx" },
    { id: "att2", name: "附件参考材料.pdf", size: "1.2MB", type: "pdf" },
  ];

  const opinions = [
    { id: "op1", person: "王五", dept: "业务发展部", content: "建议在第三章增加安全检查频率的具体要求。", date: "2026-06-22", status: "已反馈" },
    { id: "op2", person: "赵六", dept: "财务部", content: "第六章涉及的费用标准需要与财务制度保持一致。", date: "2026-06-23", status: "已反馈" },
    { id: "op3", person: "孙七", dept: "人力资源部", content: "", date: "", status: "待反馈" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return (
          <span
            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${draft.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            进行中
          </span>
        );
      case "completed":
        return (
          <span
            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${draft.id}`, "_blank")}
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

  const getOpinionStatusBadge = (status: string) => {
    switch (status) {
      case "已反馈":
        return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs border border-emerald-200">已反馈</span>;
      case "待反馈":
        return <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs border border-amber-200">待反馈</span>;
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
              <h1 className="text-xl font-bold text-slate-900">起草详情</h1>
              {getStatusBadge(draft.status)}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">编号: {draft.id} · 发起时间: {draft.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {draft.status === "draft" && (
            <>
              <button
                onClick={() => navigate(`/draft/${draft.id}/edit`)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Edit3 size={16} /> 编辑
              </button>
            </>
          )}
          {(draft.status === "in_progress" || draft.status === "completed") && (
            <button
              onClick={() => window.open(`https://flow.example.com/form/${draft.id}`, "_blank")}
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
              <Info size={18} className="text-blue-500" />
              基本信息
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs text-slate-500">编号</label>
              <p className="text-sm font-medium text-slate-900 font-mono">{draft.id}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">名称</label>
              <p className="text-sm font-medium text-slate-900">{draft.name}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">版本</label>
              <p className="text-sm font-medium text-slate-900">{draft.version}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">类型</label>
              <p>{getTypeBadge(draft.type)}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">责任部门</label>
              <p className="text-sm font-medium text-slate-900">{draft.dept}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">责任人</label>
              <p className="text-sm font-medium text-slate-900">{draft.owner}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">起草人</label>
              <p className="text-sm font-medium text-slate-900">{draft.drafter}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">发起时间</label>
              <p className="text-sm font-medium text-slate-900">{draft.date}</p>
            </div>

            {draft.remark && (
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-slate-500">备注</label>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">{draft.remark}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: 被征询人 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              被征询人
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-medium w-16">序号</th>
                  <th className="px-6 py-3 font-medium">姓名</th>
                  <th className="px-6 py-3 font-medium">部门</th>
                  <th className="px-6 py-3 font-medium">岗位</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultedPersons.map((person, index) => (
                  <tr key={person.id}>
                    <td className="px-6 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-6 py-3 font-medium text-slate-900">{person.name}</td>
                    <td className="px-6 py-3 text-slate-600">{person.dept}</td>
                    <td className="px-6 py-3 text-slate-600">{person.position}</td>
                  </tr>
                ))}
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
          <div className="p-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{contentFile.name}</p>
                  <p className="text-xs text-slate-500">{contentFile.size} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("打开在线编辑器...")}
                className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                在线预览/编辑
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: 附件 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Paperclip size={18} className="text-blue-500" />
              附件
            </h2>
          </div>
          <div className="p-6">
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
          </div>
        </div>

        {/* Section 5: 征询意见 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500" />
              征询意见
            </h2>
          </div>
          <div className="p-6">
            {opinions.length > 0 ? (
              <div className="space-y-4">
                {opinions.map((opinion) => (
                  <div key={opinion.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm flex-shrink-0">
                          {opinion.person.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{opinion.person}</p>
                          <p className="text-xs text-slate-500">{opinion.dept}{opinion.date ? ` · ${opinion.date}` : ""}</p>
                        </div>
                      </div>
                      <div>{getOpinionStatusBadge(opinion.status)}</div>
                    </div>
                    {opinion.content ? (
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed">{opinion.content}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic px-2">暂未提交反馈意见</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">暂无征询意见</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
