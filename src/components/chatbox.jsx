import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

function ChatBox({ item }) {
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!msg.trim()) return;

    try {
      setSending(true);
      await addDoc(collection(db, "chats"), {
        message: msg,
        senderEmail: auth.currentUser?.email || "Anonymous",
        senderName: auth.currentUser?.displayName || "User",
        itemName: item?.name,
        timestamp: new Date(),
      });
      setMsg("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setList(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
    });
    return unsubscribe;
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-green-50 to-white rounded-lg border border-green-200">
      {/* Messages Area */}
      <div className="flex-1 h-64 overflow-y-auto p-4 space-y-3">
        {list.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">No messages yet. Be the first to message!</p>
        ) : (
          list.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${
                chat.senderEmail === auth.currentUser?.email ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  chat.senderEmail === auth.currentUser?.email
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-xs font-semibold mb-1">
                  {chat.senderName}
                </p>
                <p className="text-sm">{chat.message}</p>
                <p className={`text-xs mt-1 ${
                  chat.senderEmail === auth.currentUser?.email
                    ? "text-green-100"
                    : "text-gray-500"
                }`}>
                  {new Date(chat.timestamp?.toDate?.()).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-green-200 p-4 space-y-2">
        <textarea
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none min-h-[3rem] max-h-20 bg-white"
          placeholder="Type your message... (Shift+Enter for new line)"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="2"
        />
        <button
          onClick={send}
          disabled={sending || !msg.trim()}
          className="btn-primary w-full disabled:opacity-50"
        >
          {sending ? "📤 Sending..." : "📤 Send Message"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;