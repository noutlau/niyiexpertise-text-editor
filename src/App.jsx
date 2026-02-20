
import "./App.css";
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";


function App() {
 const [users, setUsers] = useState([
  { id: 1, name: "Alice", color: "bg-red-500", operations: 0 },
  { id: 2, name: "Bob", color: "bg-blue-500", operations: 0 },
  { id: 3, name: "Charlie", color: "bg-green-500", operations: 0 },
]);

const [content, setContent] = useState(() => {
  const saved = localStorage.getItem("document-content");
  return saved ? saved : "";
});

const [remoteCursor, setRemoteCursor] = useState(null);

const [darkMode, setDarkMode] = useState(false);


  const [typingUser, setTypingUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecté");
  const [latency, setLatency] = useState(0);
  const [activeTab, setActiveTab] = useState("logs");
  const [logs, setLogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [documentName, setDocumentName] = useState("Mon Document");
  const handleChange = useCallback((e) => {
  const newValue = e.target.value;

  setHistory((prev) => [...prev, content]);
  setFuture([]);


  setContent(newValue);

  setConnectionStatus("Synchronisation...");

  const delay = Math.random() * 1400 + 100;
  const latencyValue = Math.floor(delay);

  setLatency(latencyValue);
  setTypingUser("Alice");

  setTimeout(() => {
    setTypingUser(null);

  const packetLost = Math.random() < 0.01;

    if (packetLost) {
      setConnectionStatus("Erreur réseau");
      setLogs((prev) => [...prev, "❌ Erreur réseau détectée"]);
      setTimeout(() => setConnectionStatus("Connecté"), 1500);
    } else {
      setConnectionStatus("Connecté");

      setUsers((prev) =>
        prev.map((u) =>
          u.name === "Alice"
            ? { ...u, operations: u.operations + 1 }
            : u
        )
      );

      setLogs((prev) => [
        ...prev,
        `✅ Synchronisé (${latencyValue} ms)`,
      ]);
    }
  }, delay);
}, [content]);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

useEffect(() => {
  const interval = setInterval(() => {
  const randomUser = Math.random() < 0.5 ? "Bob" : "Charlie";

   
    setTypingUser(randomUser);

    setTimeout(() => {
      
      setContent((prev) => {
const newText = prev + `\nAjout par ${randomUser}`;

        
        setRemoteCursor({
          user: randomUser,
          position: newText.length,
        });

        return newText;
      });

      
      setUsers((prev) =>
        prev.map((u) =>
          u.name === randomUser ? { ...u, operations: u.operations + 1 } : u
        )
      );

      
      setLogs((prev) => [
        ...prev,
        `✏️ ${randomUser} a modifié le document`,
      ]);

      setTypingUser(null);
    }, 1000); 
  }, 6000); 

  return () => clearInterval(interval); 
}, []);


const handleUndo = () => {
  if (history.length === 0) return;

  const previous = history[history.length - 1];
  setFuture((prev) => [content, ...prev]);
  setHistory((prev) => prev.slice(0, -1));
  setContent(previous);
};

const handleRedo = () => {
  if (future.length === 0) return;

  const next = future[0];
  setHistory((prev) => [...prev, content]);
  setFuture((prev) => prev.slice(1));
  setContent(next);
};

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { user: "Alice", text: newMessage },
    ]);

    setNewMessage("");
  };
 useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [messages, darkMode]);

useEffect(() => {
  localStorage.setItem("document-content", content);
}, [content]);



const getLatencyStatus = () => {
  if (latency < 300) return { label: "Fluide", color: "text-green-500" };
  if (latency < 800) return { label: "Moyen", color: "text-yellow-500" };
  return { label: "Lent", color: "text-red-500" };
};

const latencyStatus = getLatencyStatus();



  


  return (
    <div className="h-screen flex flex-col">

     
     <Header
  documentName={documentName}
  setDocumentName={setDocumentName}
  connectionStatus={connectionStatus}
  onUndo={handleUndo}
  onRedo={handleRedo}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  latency={latency}
  latencyStatus={latencyStatus}
   history={history}
  future={future}
/>



   
<div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0 bg-white dark:bg-gray-900">
  <aside className="hidden md:block md:w-1/5 border-r bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto">
       <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider 
               text-gray-600 dark:text-gray-400 
               mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
               <span>👥</span>
               Utilisateurs actifs
        </h2>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${user.color}`}></div>
                <div className="flex flex-col">
               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user.name}
              </span>
              <span className="text-xs text-gray-400">
                Ops: {user.operations}
              </span>
            </div>

              </div>

              {typingUser === user.name && (
                <span className="text-xs text-blue-500">écrit...</span>
              )}
            </div>
          ))}
        </aside>

      
       <main className="flex-1 bg-white dark:bg-gray-900 p-4 min-h-0">
         <Editor
  content={content}
  onChange={handleChange}
  remoteCursor={remoteCursor}
/>
        </main>

        <aside className="hidden md:flex md:w-1/5 border-l bg-gray-50 dark:bg-gray-800 p-4 flex-col min-h-0">
          <div className="flex mb-4 shrink-0">
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-1 py-2 text-sm ${
                activeTab === "logs"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Logs
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2 text-sm ${
                activeTab === "chat"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Chat
            </button>
          </div>

        
          <div className="flex-1 flex flex-col min-h-0">

            {activeTab === "logs" && (
              <div className="flex-1 overflow-y-auto space-y-2 text-sm">
                {logs.map((log, index) => (
                  <div
                    key={index}
                   className="bg-white dark:bg-gray-700 p-2 rounded shadow-sm"
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "chat" && (
              <>
                <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-2">
       {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.user === "Alice" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                      msg.user === "Alice"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

                  <div ref={messagesEndRef} />
                </div>

              <div className="flex items-center gap-2 shrink-0">
 
<div className="flex items-center gap-2 w-full max-w-md">

  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") sendMessage();
    }}
    placeholder="Écrire..."
    className="
      flex-1
      border border-gray-300 dark:border-gray-600
      rounded-full
      px-4 py-2
      text-sm
      outline-none
      bg-gray-100 dark:bg-gray-800
      focus:ring-2 focus:ring-blue-400
      focus:border-blue-500
      transition
      min-w-0
    "
  />

  <button
    onClick={sendMessage}
    className="
      bg-blue-500 
      text-white 
      w-10 h-10 
      rounded-full 
      flex items-center justify-center 
      hover:bg-blue-600 
      transition
      flex-shrink-0
    "
  >
    ➤
  </button>
</div>



</div>



              </>
            )}

          </div>
        </aside>
      </div>
<footer className="bg-blue-500 dark:bg-blue-900 text-white p-4 text-sm flex justify-between shrink-0 shadow-md">
  <span className="font-medium">Taille : {content.length} caractères</span>
  <span className="font-medium">Latence : {latency} ms</span>
   <span>Versions : {history.length}</span>
  <span className="font-medium">Mode : Simulation</span>
</footer>

    </div>
  );
}

export default App;
