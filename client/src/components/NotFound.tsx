import { Ghost, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-4">
        <div className="flex justify-center mb-6">
          <Ghost className="h-24 w-24 text-gray-800 animate-bounce" />
        </div>

        <h1 className="text-4xl font-bold mb-2 text-gray-900">404</h1>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have vanished into thin
          air.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <Home className="h-5 w-5" />
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
