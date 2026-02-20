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
  latencyStatus

}) {
  return (
  <header className="bg-white dark:bg-gray-800 border-b px-6 py-3 flex items-center justify-between shadow-sm">

  <input
  value={documentName}
  onChange={(e) => setDocumentName(e.target.value)}
  placeholder="Nom du document"
  className="
    text-lg font-semibold
    px-3 py-2
    rounded-lg
    border border-gray-300 dark:border-gray-600
    bg-gray-100 dark:bg-gray-800
    outline-none
    focus:border-blue-500 dark:focus:border-blue-400
    focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
    transition
    placeholder-gray-400 dark:placeholder-gray-500
    w-64
  "
/>


  <div className="flex items-center gap-4">
   
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded transition"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>

    
    <button
      onClick={onUndo}
      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
    >
      Undo
    </button>
    <button
      onClick={onRedo}
      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
    >
      Redo
    </button>

   
 <div className="flex items-center gap-2 text-sm">
  <span className="font-medium text-gray-600 dark:text-gray-300">Latence :</span>
  <span
    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${latencyStatus.color}`}
  >
    ⚡ {latency} ms ({latencyStatus.label})
  </span>
</div>





    <span
      className={`px-3 py-1 text-xs rounded font-medium ${
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
