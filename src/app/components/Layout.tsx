import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { 
  Bot, 
  Search, 
  Bell, 
  Menu,
  FileText, 
  Edit3, 
  CheckCircle, 
  Send, 
  RefreshCcw, 
  Trash2, 
  DownloadCloud, 
  Clock, 
  BookOpen, 
  GitMerge,
  LayoutDashboard,
  Settings,
  HelpCircle,
  X,
  User,
  Sparkles
} from "lucide-react";
import clsx from "clsx";

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: '您好！我是您的智能管理助手。您可以直接向我提问，查询系统内的制度、流程或外来标准。' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isAIAssistantOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isAIAssistantOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: newMsg }]);
    setChatInput("");
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', content: `关于“${newMsg}”的检索结果：\n\n根据知识库，我们为您找到了相关信息。这里是模拟的返回数据，后续可接入真实的大模型接口。` }]);
    }, 600);
  };

  const mainNavItems = [
    { name: "工作台", path: "/", icon: LayoutDashboard },
    { name: "制修订计划", path: "/plan", icon: FileText },
    { name: "起草与意见征询", path: "/draft", icon: Edit3 },
    { name: "评议审核", path: "/review", icon: CheckCircle },
    { name: "发布管理", path: "/publish", icon: Send },
    { name: "更改管理", path: "/change", icon: RefreshCcw },
    { name: "废止管理", path: "/abolish", icon: Trash2 },
    { name: "外来标准导入", path: "/import", icon: DownloadCloud },
    { name: "管理标准复审", path: "/re-review", icon: Clock },
  ];

  const quickLinks = [
    { name: "制度文件库", path: "/docs", icon: BookOpen },
    { name: "流程文件库", path: "/processes", icon: GitMerge },
    { name: "常用制度流程", path: "/common", icon: FileText },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={clsx(
          "flex flex-col bg-white text-slate-700 border-r border-slate-200 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16",
          "hidden md:flex flex-shrink-0"
        )}
      >
        <div className="flex h-16 items-center justify-center px-4 border-b border-slate-100">
          {isSidebarOpen && <span className="text-slate-900 font-bold text-lg truncate">管理标准数字化平台</span>}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-2">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8">
            <nav className="space-y-1 px-2">
              {isSidebarOpen && <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">快捷访问</div>}
              {quickLinks.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 展开/收起按钮 */}
        <div className="border-t border-slate-100 p-3 flex justify-center">
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            title={isSidebarOpen ? "收起菜单" : "展开菜单"}
          >
            <Menu size={18} />
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/80 transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <aside className="relative flex w-64 flex-col bg-white text-slate-700 border-r border-slate-200">
            <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100">
              <span className="text-slate-900 font-bold text-lg truncate">管理标准数字化平台</span>
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              <nav className="space-y-1 px-2">
                <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">标准生命周期</div>
                {mainNavItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      <item.icon size={18} className="flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-8">
                <nav className="space-y-1 px-2">
                  <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">快捷访问</div>
                  {quickLinks.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={clsx(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <item.icon size={18} className="flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden relative z-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-10 relative">
          <div className="flex items-center flex-1">
            {/* Mobile menu button */}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-md"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
                placeholder="搜索标准、制度、流程..." 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => setIsAIAssistantOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline">AI 助手</span>
            </button>
            
            <button type="button" className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button type="button" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Global AI Assistant Floating Button */}
      <button 
        type="button"
        onClick={() => setIsAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white text-slate-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 flex items-center justify-center hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all z-40 group"
      >
        <Sparkles size={24} className="text-blue-600" />
      </button>

      {/* AI Assistant - Floating Chat Widget */}
      {isAIAssistantOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.16)] border border-slate-200 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Sparkles size={16} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 text-base tracking-tight">AI 智能助手</h3>
              <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium ml-1">Beta</span>
            </div>
            <button 
              type="button"
              onClick={() => setIsAIAssistantOpen(false)}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scroll-smooth custom-scrollbar bg-slate-50/50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={clsx("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {msg.role === 'ai' ? (
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                      <Sparkles size={14} />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
                      <User size={14} />
                    </div>
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={clsx(
                  "flex-1 text-[14px] leading-relaxed max-w-[85%]",
                  msg.role === 'user' ? "flex justify-end" : "text-slate-800"
                )}>
                  {msg.role === 'user' ? (
                    <div className="bg-blue-600 px-4 py-2.5 rounded-2xl rounded-tr-sm text-white inline-block shadow-sm">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm text-slate-800 shadow-sm whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
            {/* Guided Questions (Only show when chat is mostly empty) */}
            {chatMessages.length <= 2 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  "查询安全生产制度", 
                  "差旅费报销流程？"
                ].map((q, i) => (
                  <button 
                    key={i}
                    type="button"
                    onClick={() => setChatInput(q)}
                    className="text-[11px] bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            
            {/* Input Box */}
            <form 
              className="relative rounded-xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all flex items-end"
              onSubmit={handleSendMessage}
            >
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="向 AI 助手提问..."
                className="w-full bg-transparent border-0 px-3 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:ring-0 rounded-xl outline-none resize-none min-h-[44px] max-h-[120px] custom-scrollbar"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="p-1.5 shrink-0">
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:hover:bg-blue-600 flex items-center justify-center h-8 w-8"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
