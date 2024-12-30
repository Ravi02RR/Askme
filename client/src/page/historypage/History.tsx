import { useState, useEffect } from "react";
import { Bot, User, ChevronDown, Search } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  question: string;
  ans: string;
  createdAt: string;
  user: string;
}

interface MessageProps {
  content: string;
  type: "user" | "assistant";
}

const Message = ({ content, type }: MessageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex gap-3 ${type === "user" ? "justify-end" : "justify-start"}`}
  >
    {type === "assistant" && (
      <motion.div whileHover={{ scale: 1.1 }}>
        <Bot className="w-6 h-6 mt-1" />
      </motion.div>
    )}
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`max-w-[80%] rounded-xl p-4 ${
        type === "user"
          ? "bg-gradient-to-r from-gray-900 to-black text-white"
          : "bg-white border border-gray-100 shadow-lg"
      }`}
    >
      {type === "user" ? (
        <div className="text-white">{content}</div>
      ) : (
        <MarkdownPreview
          source={content}
          style={{
            background: "transparent",
            fontSize: "14px",
            lineHeight: "1.8",
            color: "black",
          }}
        />
      )}
    </motion.div>
    {type === "user" && (
      <motion.div whileHover={{ scale: 1.1 }}>
        <User className="w-6 h-6 mt-1" />
      </motion.div>
    )}
  </motion.div>
);

interface ChatThreadProps {
  message: Message;
}

const ChatThread = ({ message }: ChatThreadProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.01 }}
      className="border rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 rounded-xl transition-colors"
      >
        <div className="space-y-1">
          <div className="font-medium line-clamp-1">{message.question}</div>
          <div className="text-sm text-gray-500">
            {new Date(message.createdAt).toLocaleString()}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t bg-gray-50">
              <div className="space-y-6">
                <Message type="user" content={message.question} />
                <Message type="assistant" content={message.ans} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const History = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<{ historydata: Message[] }>(
          "http://localhost:3000/api/v1/history",
          {
            withCredentials: true,
          }
        );
        setHistory(response.data.historydata.reverse());
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to load chat history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter((message) =>
    message.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="rounded-full h-10 w-10 border-3 border-b-black"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-4 mt-10 min-h-screen"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        <div className="space-y-4">
          {filteredHistory.map((message) => (
            <ChatThread key={message._id} message={message} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default History;