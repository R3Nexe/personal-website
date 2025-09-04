import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
                if (!input.trim()) return;

                // Add user message immediately
                setMessages((prev) => [...prev, { role: "user", text: input }]);

                // Clear input
                const userInput = input;
                setInput("");

                try {
                  const res = await fetch("http://localhost:5000/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: userInput }),
                  });

                  const data = await res.json();

                  // Add bot response (only if backend exists)
                  setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
                } catch (err) {
                  // For now, simulate a bot reply when backend is missing
                  setMessages((prev) => [...prev, { role: "bot", text: "⚠️ Backend not connected yet!" }]);
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
        <div className="fixed bottom-20 z-20 right-6 md:w-[25vw] md:h-[60vh] w-[90vw] h-[50dvh] bg-white/20 backdrop-blur-3xl border-2 border-bright-purple/50 rounded-lg shadow-xl flex flex-col animate-fadeIn">
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
              className="ml-2 px-3 py-1 bg-bright-green text-black rounded-lg  hover:scale-120 transition duration-300"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
