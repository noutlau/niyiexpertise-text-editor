import React from "react";

function Editor({ content, onChange }) {
  const lines = content.split("\n");

  return (
    <div className="flex h-full border rounded-lg overflow-hidden">
      
      {/* Line numbers */}
      <div className="bg-gray-100 text-gray-500 text-sm p-2 select-none">
        {lines.map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={onChange}
        className="flex-1 p-4 font-mono resize-none outline-none"
      />
    </div>
  );
}

export default React.memo(Editor);
