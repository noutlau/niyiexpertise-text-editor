import React from "react";

function Editor({ content, onChange, remoteCursor }) {

  const lines = content.split("\n");

  return (
    <div className="relative h-full flex bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-inner">
      
  
      <div className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 select-none px-2 py-4 text-right font-mono text-sm">
        {lines.map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>

      
      <textarea
        value={content}
        onChange={onChange}
        className="flex-1 font-mono p-4 resize-none outline-none bg-transparent text-gray-900 dark:text-white"
      />

      
      {remoteCursor && (
        <div
          className={`absolute w-1 h-5 ${
            remoteCursor.user === "Bob" ? "bg-blue-500" : "bg-green-500"
          }`}
          style={{
            bottom: 20,
            right: 20
          }}
        />
      )}

    </div>
  );
}

export default React.memo(Editor);