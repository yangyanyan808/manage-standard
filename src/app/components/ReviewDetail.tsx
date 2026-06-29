import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit3, Info, Users, UserCheck, Paperclip, FileDown, MessageSquare } from "lucide-react";

export function ReviewDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [review] = useState({
    id: id || "REV-2026-005",
    date: "2026-06-22",
    status: "in_progress" as "draft" | "in_progress" | "completed",
    remark: "根据年度评议审核计划，对该制度进行合规性评议和最终审核。",
  });

  const selectedStandard = {
    id: "SYS-2026-001",
    name: "安全生产管理制度",
    version: "V2.0",
    type: "制度" as "制度" | "流程",
    dept: "安全管理部",
    owner: "张三",
    initiator: "李四",
  };

  // Reviewers with content and results
  const reviewPersons = [
    { id: "rp1", name: "王五", dept: "业务发展部", position: "部门经理", reviewContent: "制度/流程的合规性", result: "合规，符合现行法规要求。建议在第三章增加具体操作指引。", status: "已完成" },
    { id: "rp2", name: "赵六", dept: "财务部", position: "主管", reviewContent: "内容的完整性与准确性", result: "内容完整，数据准确。第六条费用标准需与财务制度对齐。", status: "已完成" },
    { id: "rp3", name: "孙七", dept: "人力资源部", position: "总监", reviewContent: "条款的可操作性", result: "", status: "待评议" },
  ];

  // Auditors with content and results
  const auditPersons = [
    { id: "ap1", name: "郑十", dept: "法务部", position: "法务顾问", auditContent: "法律合规审核", result: "经审核，制度内容符合相关法律法规要求，无合规风险。", status: "已完成" },
    { id: "ap2", name: "陈一", dept: "质量管理部", position: "质量总监", auditContent: "整体质量审核", result: "", status: "待审核" },
  ];

  const attachments = [
    { id: "att1", name: "安全管理办法-待评议稿.docx", size: "256KB", type: "docx" },
    { id: "att2", name: "评议审核标准对照表.xlsx", size: "48KB", type: "xlsx" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">草稿</span>;
      case "in_progress":
        return (
          <span
            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${review.id}`, "_blank")}
            title="点击跳转至流程表单"
          >
            进行中
          </span>
        );
      case "completed":
        return (
          <span
            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
            onClick={() => window.open(`https://flow.example.com/form/${review.id}`, "_blank")}
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

  const getResultStatusBadge = (status: string) => {
    switch (status) {
      case "已完成":
        return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs border border-emerald-200">已完成</span>;
      case "待评议":
        return <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs border border-amber-200">待评议</span>;
      case "待审核":
        return <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs border border-amber-200">待审核</span>;
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
              <h1 className="text-xl font-bold text-slate-900">评议审核详情</h1>
              {getStatusBadge(review.status)}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">编号: {review.id} · 发起时间: {review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {review.status === "draft" && (
            <button
              onClick={() => navigate(`/review/${review.id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={16} /> 编辑
            </button>
          )}
          {(review.status === "in_progress" || review.status === "completed") && (
            <button
              onClick={() => window.open(`https://flow.example.com/form/${review.id}`, "_blank")}
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
                <p className="text-sm text-slate-700">{selectedStandard.initiator}</p>
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
                <p className="text-sm text-slate-700">{review.date}</p>
              </div>
            </div>
            {review.remark && (
              <div className="border-t border-slate-100 pt-6">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">备注</label>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">{review.remark}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: 评议人及其评议内容与结果 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              评议人及评议结果
            </h2>
          </div>
          <div className="p-6">
            {reviewPersons.length > 0 ? (
              <div className="space-y-4">
                {reviewPersons.map((person) => (
                  <div key={person.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm flex-shrink-0">
                          {person.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{person.name}</p>
                          <p className="text-xs text-slate-500">{person.dept} · {person.position}</p>
                        </div>
                      </div>
                      <div>{getResultStatusBadge(person.status)}</div>
                    </div>
                    <div className="space-y-2 ml-11">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 flex-shrink-0">评议内容：</span>
                        <span className="text-sm text-slate-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{person.reviewContent}</span>
                      </div>
                      {person.result ? (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                          <p className="text-xs text-slate-400 mb-1">评议结果：</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{person.result}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400 italic">暂未提交评议结果</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">暂无评议人</p>
            )}
          </div>
        </div>

        {/* Section 3: 审核人及其审核内容与结果 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <UserCheck size={18} className="text-blue-500" />
              审核人及审核结果
            </h2>
          </div>
          <div className="p-6">
            {auditPersons.length > 0 ? (
              <div className="space-y-4">
                {auditPersons.map((person) => (
                  <div key={person.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-medium text-sm flex-shrink-0">
                          {person.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{person.name}</p>
                          <p className="text-xs text-slate-500">{person.dept} · {person.position}</p>
                        </div>
                      </div>
                      <div>{getResultStatusBadge(person.status)}</div>
                    </div>
                    <div className="space-y-2 ml-11">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 flex-shrink-0">审核内容：</span>
                        <span className="text-sm text-slate-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{person.auditContent}</span>
                      </div>
                      {person.result ? (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                          <p className="text-xs text-slate-400 mb-1">审核结果：</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{person.result}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400 italic">暂未提交审核结果</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">暂无审核人</p>
            )}
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
