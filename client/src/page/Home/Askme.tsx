/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";

const LoadingDots = () => (
  <div className="flex space-x-1">
    {[1, 2, 3].map((dot) => (
      <motion.div
        key={dot}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.2 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="w-2 h-2 bg-black rounded-full"
      />
    ))}
  </div>
);

const ThinkingAnimation = () => (
  <motion.div
    className="flex items-center space-x-2 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Bot className="w-6 h-6" />
    <LoadingDots />
  </motion.div>
);

interface MessageContentProps {
  content: string;
  role: "user" | "assistant";
}

const MessageContent = ({ content, role }: MessageContentProps) => {
  if (role === "user") {
    return <div className="text-white">{content}</div>;
  }

  return (
    <MarkdownPreview
      source={content}
      style={{
        background: "white",
        color: "black",
        fontSize: "19px",
        lineHeight: "1.6",
      }}
      components={{
        code: ({ children }) => (
          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-50 p-4 rounded-lg my-4 overflow-x-auto">
            {children}
          </pre>
        ),
      }}
    />
  );
};

const Askme = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      //@ts-expect-error input ref
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://task.devguy.live/api/v1/ask",
        { question: input },
        { withCredentials: true }
      );

      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="flex flex-col h-screen bg-white mt-20">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map(
            (
              msg: { role: string; content: string },
              index: React.Key | null | undefined
            ) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && <Bot className="w-6 h-6 mt-1" />}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <MessageContent
                    content={msg.content}
                    //@ts-expect-error message
                    role={msg.role}
                  />
                </div>
                {msg.role === "user" && <User className="w-6 h-6 mt-1" />}
              </motion.div>
            )
          )}
          {isLoading && <ThinkingAnimation />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Type your message..."
            //@ts-expect-error input ref
            ref={inputRef}
          />
          <button
            onClick={clearChat}
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Askme;
