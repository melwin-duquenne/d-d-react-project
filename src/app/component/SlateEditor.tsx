"use client";
import React, { useMemo, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Editor, Transforms, Descendant, BaseEditor } from "slate";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Écris ton texte ici..." }],
  },
];

export default function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  // Format toggle helpers
  const toggleFormat = (format: "bold" | "italic") => {
    Transforms.setNodes(
      editor,
      { [format]: true },
      { match: n => Text.isText(n), split: true }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-300 max-w-2xl mx-auto">
      <Slate editor={editor} initialValue={initialValue} onChange={setValue}>
        <Editable
          className="min-h-[200px] p-2 outline-none text-black"
          renderLeaf={props => <Leaf {...props} />}
          placeholder="Écris ton texte ici..."
        />
        {/* Toolbar simple */}
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
      </Slate>
    </div>
  );
}

// Utilitaire pour le typage
import { Text } from "slate";

// Custom leaf renderer for bold/italic
function Leaf({ attributes, children, leaf }: { attributes: Record<string, unknown>; children: React.ReactNode; leaf: any }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  return <span {...attributes}>{children}</span>;
}
