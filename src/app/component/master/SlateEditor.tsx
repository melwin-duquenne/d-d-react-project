"use client";
import React, { useMemo, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Transforms } from "slate";

import { Descendant, Text } from "slate";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Écris ton texte ici..." }],
  },
];
export default function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  console.log(value);
  // Format toggle helpers
  const toggleFormat = (format: "bold" | "italic") => {
    Transforms.setNodes(
      editor,
      { [format]: true },
      { match: n => Text.isText(n), split: true }
    );
  };

  return (
    <div className="bg-white opacity-80 overflow-auto rounded-xl shadow-lg p-4 border border-amber-300 w-full h-full mx-auto">
  <Slate editor={editor} initialValue={initialValue} onChange={val => setValue(val.length === 0 ? initialValue : val)}>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="px-2 text-black py-1 rounded hover:bg-amber-200 font-bold"
            onMouseDown={event => {
              event.preventDefault();
              toggleFormat("bold");
            }}
          >
            Gras
          </button>
          <button
            type="button"
            className="px-2 py-1 text-black rounded hover:bg-amber-200 italic"
            onMouseDown={event => {
              event.preventDefault();
              toggleFormat("italic");
            }}
          >
            Italique
          </button>
        </div>
        <Editable
          className="h-auto p-2 outline-none text-black"
          renderLeaf={props => <Leaf {...props} />}
          placeholder="Écris ton texte ici..."
        />
        {/* Toolbar simple */}
        
      </Slate>
    </div>
  );
}

// Custom leaf renderer for bold/italic
function Leaf({ attributes, children, leaf }: { attributes: Record<string, unknown>; children: React.ReactNode; leaf: Text }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  return <span {...attributes}>{children}</span>;
}
