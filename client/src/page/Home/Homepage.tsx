import {
    Brain,
    MessageSquare,
    Sparkles,
    ArrowRight,
    Search,
    Zap,
  } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  
  const Homepage = () => {
    const navigate = useNavigate();
  
    return (
      <div className="min-h-screen bg-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/0 z-0" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-20 pb-24 text-center relative z-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    AI-Powered Q&A Platform
                  </span>
                </div>
  
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
                  Get Instant Answers to
                  <span className="block mt-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Any Question
                  </span>
                </h1>
  
                <p className="max-w-2xl mx-auto text-xl text-gray-600">
                  Unlock the power of AI to get accurate, instant answers to all
                  your questions. From simple queries to complex problems, AskMe
                  has you covered.
                </p>
  
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      window.open("http://localhost:3000/api-docs", "_blank")
                    }
                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    View Documentation <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate("/learn-more")}
                    className="px-8 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
  
              <div className="mt-16 max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Ask anything... (e.g., 'How does photosynthesis work?')"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      onFocus={() => navigate("/ask")} // Navigate to /ask on focus
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-black/5 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Intelligence</h3>
                <p className="text-gray-600">
                  Advanced AI algorithms provide accurate, nuanced answers to your
                  questions in seconds.
                </p>
              </div>
  
              <div className="space-y-4">
                <div className="h-12 w-12 bg-black/5 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Natural Conversations</h3>
                <p className="text-gray-600">
                  Engage in natural, flowing conversations with our AI for deeper
                  understanding.
                </p>
              </div>
  
              <div className="space-y-4">
                <div className="h-12 w-12 bg-black/5 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-gray-600">
                  Get immediate answers to your questions with lightning-fast
                  response times.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-4 text-gray-600">
                Get started with AskMe in three simple steps
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create your account in seconds",
                },
                {
                  step: "2",
                  title: "Ask a Question",
                  description: "Type your question in natural language",
                },
                {
                  step: "3",
                  title: "Get Answers",
                  description: "Receive instant, accurate responses",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Homepage;
  