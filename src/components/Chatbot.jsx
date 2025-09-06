import { useState } from "react";

// Error logging utility for chatbot operations
const logChatbotError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`🤖 CHATBOT ERROR [${context}]:`, errorInfo);
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    // Input validation
    if (!input || !input.trim()) {
      logChatbotError('EMPTY_INPUT', new Error('User attempted to send empty message'), {
        severity: 'LOW',
        impact: 'No action taken',
        inputValue: input,
        inputLength: input?.length || 0,
        solution: 'User should enter a message before sending'
      });
      return;
    }

    // Prevent multiple simultaneous requests
    if (isLoading) {
      logChatbotError('DUPLICATE_REQUEST', new Error('User attempted to send message while another is processing'), {
        severity: 'LOW',
        impact: 'Request ignored to prevent race conditions',
        currentInput: input,
        solution: 'Wait for current request to complete'
      });
      return;
    }

    setIsLoading(true);

    // Add user message immediately
    const userMessage = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    const userInput = input.trim();
    setInput("");

    try {
      // Validate backend URL
      const backendUrl = "http://localhost:5000/chat";
      if (!backendUrl.startsWith('http')) {
        throw new Error('Invalid backend URL format');
      }

      logChatbotError('API_REQUEST_START', null, {
        severity: 'INFO',
        impact: 'Sending request to backend',
        backendUrl,
        messageLength: userInput.length,
        messagePreview: userInput.substring(0, 50) + (userInput.length > 50 ? '...' : '')
      });

      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ query: userInput }),
      });

      // Check if response is ok
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
      }

      // Validate response content type
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response, got: ${contentType}`);
      }

      const data = await res.json();

      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format: expected object');
      }

      if (!data.answer || typeof data.answer !== 'string') {
        logChatbotError('INVALID_RESPONSE_STRUCTURE', new Error('Response missing or invalid answer field'), {
          severity: 'HIGH',
          impact: 'Cannot display bot response',
          responseData: data,
          solution: 'Backend should return { answer: "string" } format'
        });

        // Add fallback message
        setMessages((prev) => [...prev, {
          role: "bot",
          text: "⚠️ Received invalid response from server. Please try again."
        }]);
        return;
      }

      // Add bot response
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);

      console.log(`✅ Chatbot response received successfully for query: "${userInput.substring(0, 30)}..."`);

    } catch (err) {
      // Determine error type and provide appropriate user feedback
      let userMessage = "⚠️ Backend not connected yet!";
      let errorSeverity = 'MEDIUM';

      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorSeverity = 'HIGH';
        userMessage = "⚠️ Cannot connect to backend server. Please check if it's running.";
        logChatbotError('NETWORK_ERROR', err, {
          severity: errorSeverity,
          impact: 'Cannot communicate with backend',
          backendUrl: "http://localhost:5000/chat",
          errorType: 'Network/Fetch Error',
          solution: 'Ensure backend server is running on localhost:5000'
        });
      } else if (err.message.includes('HTTP')) {
        errorSeverity = 'HIGH';
        userMessage = `⚠️ Server error: ${err.message}`;
        logChatbotError('HTTP_ERROR', err, {
          severity: errorSeverity,
          impact: 'Backend server returned error',
          httpStatus: err.message.match(/HTTP (\d+)/)?.[1],
          solution: 'Check backend server logs and ensure it\'s handling requests properly'
        });
      } else if (err.message.includes('JSON')) {
        errorSeverity = 'HIGH';
        userMessage = "⚠️ Invalid response format from server.";
        logChatbotError('JSON_PARSE_ERROR', err, {
          severity: errorSeverity,
          impact: 'Cannot parse server response',
          solution: 'Backend should return valid JSON with { answer: "string" } format'
        });
      } else {
        logChatbotError('UNEXPECTED_ERROR', err, {
          severity: 'HIGH',
          impact: 'Unexpected error occurred',
          errorType: err.constructor.name,
          solution: 'Check browser console and backend server for more details'
        });
      }

      // Add error message to chat
      setMessages((prev) => [...prev, { role: "bot", text: userMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-20 bottom-20 right-6 size-14 rounded-full bg-white/20 border-2 backdrop-blur-3xl border-white/30  text-2xl shadow-lg flex items-center justify-center hover:border-bright-purple transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9A70F5" className="size-8">
  <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
</svg>

        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 z-20 right-6 md:w-[25vw] md:h-[60vh] w-[90vw] h-[50dvh] bg-gradient-to-b to-white/20 from-bright-purple/20 backdrop-blur-3xl border-2 border-bright-purple/50 rounded-lg shadow-xl flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="bg-bright-purple text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 text-white overflow-y-auto text-sm space-y-2">
            {messages.map((m, i) => (
              <p key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                {/* Chat Bubbles */}
                <span
                  className={`inline-block px-2 py-1 rounded-xl ${
                    m.role === "user"
                      ? "bg-bright-green/50 text-white my-2"
                      : "bg-bright-purple/70 text-white"
                  }`}
                >
                  {m.text}
                </span>
              </p>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t text-white border-gray-200 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // prevents accidental form submission/reload
                  sendMessage();
                }
              }}
              className="flex-1 px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-bright-purple"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className={`ml-2 px-3 py-1 rounded-lg transition duration-300 ${
                isLoading
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-bright-green text-black hover:scale-120'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
