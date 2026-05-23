// ============================================
// SMARTDEBATE - CHAT PAGE
// src/components/pages/ChatPage.jsx
// Real-Time Chat using Firebase Firestore
// ============================================

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { getOtherUsers } from "../../firebase/userService";
import { getChatId, sendMessage, listenToMessages } from "../../firebase/chatService";

const ChatPage = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const messagesEndRef = useRef(null);
  const unsubscribeRef = useRef(null);

  // Fetch other users
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getOtherUsers(currentUser?.uid);
      setUsers(data);
      setLoadingUsers(false);
    };
    fetchUsers();
  }, [currentUser]);

  // Listen to messages when user selected
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    // Cleanup previous listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    const unsubscribe = listenToMessages(chatId, (msgs) => {
      setMessages(msgs);
    });

    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [selectedUser, currentUser]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    setSending(true);
    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    await sendMessage(chatId, newMessage.trim(), currentUser);
    setNewMessage("");
    setSending(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black gradient-text mb-6 flex items-center gap-2">
        <i className="fas fa-comments text-purple-400"></i> Real-Time Chat
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[75vh]">

        {/* Users List */}
        <div className="glass rounded-2xl border border-purple-500/20 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-700/50">
            <h2 className="font-bold text-sm gradient-text flex items-center gap-2">
              <i className="fas fa-users text-purple-400"></i>
              Users ({users.length})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {loadingUsers ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-user-slash text-3xl text-slate-600 mb-2 block"></i>
                <p className="text-slate-500 text-sm">No other users found</p>
              </div>
            ) : (
              users.map((user) => (
                <button
                  key={user.uid}
                  onClick={() => { setSelectedUser(user); setMessages([]); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    selectedUser?.uid === user.uid
                      ? "bg-purple-600/25 border border-purple-500/40"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-200 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      user.role === "admin"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-blue-600/20 text-blue-400"
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 glass rounded-2xl border border-cyan-500/20 overflow-hidden flex flex-col">

          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                  <i className="fas fa-comments text-4xl text-purple-400"></i>
                </div>
                <p className="text-slate-400 font-semibold text-lg">Select a user to chat</p>
                <p className="text-slate-600 text-sm mt-1">Choose from the list on the left</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-white text-sm font-bold">
                  {selectedUser.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-sm">{selectedUser.name}</p>
                  <p className="text-xs text-slate-500">{selectedUser.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-10">
                    <i className="fas fa-comment-dots text-4xl text-slate-600 mb-3 block"></i>
                    <p className="text-slate-500 text-sm">No messages yet</p>
                    <p className="text-slate-600 text-xs mt-1">Say hello! 👋</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderUid === currentUser?.uid;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                          {!isMe && (
                            <p className="text-xs text-slate-500 mb-1 px-1">{msg.senderName}</p>
                          )}
                          <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                            isMe
                              ? "btn-gradient text-white rounded-br-sm"
                              : "glass border border-slate-700/50 text-slate-200 rounded-bl-sm"
                          }`}>
                            {msg.text}
                          </div>
                          <p className="text-xs text-slate-600 mt-1 px-1">
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef}></div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex gap-3 items-end">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message... (Enter to send)"
                    rows={1}
                    className="flex-1 px-4 py-3 rounded-xl text-sm resize-none"
                    style={{ minHeight: "44px", maxHeight: "100px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || sending}
                    className="btn-gradient w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending
                      ? <i className="fas fa-spinner fa-spin text-sm"></i>
                      : <i className="fas fa-paper-plane text-sm"></i>
                    }
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;