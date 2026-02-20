import React from "react";

function Header({
  documentName,
  setDocumentName,
  connectionStatus,
  onUndo,
  onRedo,
  darkMode,
  setDarkMode,
  latency,
  history,
  future,
}) {
  return (
 <header className="flex w-full shadow-md">

  
  <div className="flex items-center justify-center w-1/3 bg-blue-500 dark:bg-blue-900 px-6 py-4">
    <input
      value={documentName}
      onChange={(e) => setDocumentName(e.target.value)}
      placeholder="Nom du document"
      className="text-xl font-bold text-center bg-transparent text-white placeholder-white/60 outline-none w-full"
    />
  </div>

  
  <div className="flex-1 bg-white dark:bg-gray-900"></div>

  
  <div className="flex items-center justify-end gap-3 w-1/3 px-6 py-4 bg-white dark:bg-gray-900">

    
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="h-9 w-9 flex items-center justify-center
                 bg-gray-200 dark:bg-gray-700
                 rounded
                 hover:scale-105 transition"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>

    
    <button
      onClick={onUndo}
      disabled={history.length === 0}
      className={`h-9 px-4 flex items-center justify-center
        rounded text-sm font-medium transition
        ${
          history.length === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm"
        }`}
    >
      ↺ Undo
    </button>

   
    <button
      onClick={onRedo}
      disabled={future.length === 0}
      className={`h-9 px-4 flex items-center justify-center
        rounded text-sm font-medium transition
        ${
          future.length === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm"
        }`}
    >
      ↻ Redo
    </button>

    
    <span
      className={`h-9 px-3 flex items-center justify-center
        rounded text-xs font-semibold
        ${
          latency < 300
            ? "bg-green-100 text-green-700"
            : latency < 800
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
    >
      ⚡ {latency} ms
    </span>

    
    <span
      className={`h-9 px-3 flex items-center justify-center
        rounded text-xs font-semibold
        ${
          connectionStatus === "Connecté"
            ? "bg-green-100 text-green-700"
            : connectionStatus === "Synchronisation..."
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
    >
      {connectionStatus}
    </span>

  </div>
</header>
  );
}

export default React.memo(Header);