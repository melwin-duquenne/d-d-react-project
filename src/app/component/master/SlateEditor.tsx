"use client";
import React, { useMemo, useState } from "react";
import { Slate, Editable, withReact, useSlateStatic, ReactEditor } from "slate-react";
import { createEditor, Transforms, Editor, Element as SlateElement } from "slate";

import { Descendant, Text, BaseElement } from "slate";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Écris ton texte ici..." }],
  },
];

// Custom monster tag element type
type MonsterTagElement = BaseElement & { type: "monster-tag"; name: string; children: [{ text: "" }] };
interface SlateEditorProps {
  initialText?: string;
  partyId: string;
  insertMonsterName?: string | null;
  onMonsterInserted?: () => void;
}

export default function SlateEditor({ initialText = "", partyId, insertMonsterName, onMonsterInserted }: SlateEditorProps) {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Insertion automatique de balise monstre
  React.useEffect(() => {
    if (insertMonsterName) {
      const { selection } = editor;
      if (selection) {
        // Insert a custom monster-tag element at the cursor
        Transforms.insertNodes(editor, {
          type: "monster-tag",
          name: insertMonsterName,
          children: [{ text: "" }],
        } as any);
        if (onMonsterInserted) onMonsterInserted();
      }
    }
  }, [insertMonsterName, editor, onMonsterInserted]);
  // Parse initialText to convert [monster:Name] tags into monster-tag elements
  function parseAdventureText(text: string): Descendant[] {
    if (!text) return initialValue;
    // Split by monster tags
    const parts = text.split(/(\[monster:[^\]]+\])/g);
    const children: Descendant[] = parts.map(part => {
      const match = part.match(/^\[monster:(.+?)\]$/);
      if (match) {
        return {
          type: "monster-tag",
          name: match[1],
          children: [{ text: "" }],
        } as any;
      }
      return { text: part };
    });
    return [
      {
        type: "paragraph",
        children: children as any,
      } as any,
    ];
  }
  const [value, setValue] = useState<Descendant[]>(
    initialText ? parseAdventureText(initialText) : initialValue
  );
  const [saving, setSaving] = useState(false);

  // Format toggle helpers
  const toggleFormat = (format: "bold" | "italic") => {
    Transforms.setNodes(
      editor,
      { [format]: true },
      { match: n => Text.isText(n), split: true }
    );
  };

  // Enregistrement manuel
  const handleSave = async () => {
    setSaving(true);
    // Extraction robuste du texte pour tous les types de nœuds, y compris les balises monstre
    const extractText = (nodes: Descendant[]): string => {
      return nodes.map(n => {
        if ('type' in n && (n as any).type === 'monster-tag' && 'name' in n) {
          return `[monster:${(n as any).name}]`;
        }
        if ('children' in n && Array.isArray(n.children)) {
          return extractText(n.children as Descendant[]);
        }
        // @ts-ignore
        return n.text || "";
      }).join(" ");
    };
    const text = extractText(value);
    await fetch("/api/party", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partyId, adventureText: text }),
    });
    setSaving(false);
  };

  return (
    <div className="bg-white opacity-80 overflow-auto rounded-xl shadow-lg p-4 border border-amber-300 w-full h-full mx-auto">
      <Slate editor={editor} initialValue={value} onChange={val => setValue(val.length === 0 ? initialValue : val)}>
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
          <button
            type="button"
            className="px-2 py-1 text-white bg-amber-700 rounded ml-4"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
        <Editable
          className="h-auto p-2 outline-none text-black"
          renderLeaf={props => <Leaf {...props} />}
          renderElement={props => <Element {...props} />}
          placeholder="Écris ton texte ici..."
        />
      </Slate>
    </div>
  );
}

// Custom leaf renderer for bold/italic
function Leaf({ attributes, children, leaf }: { attributes: Record<string, unknown>; children: React.ReactNode; leaf: Text }) {
  let rendered = children;
  if (leaf.bold) {
    rendered = <strong>{rendered}</strong>;
  }
  if (leaf.italic) {
    rendered = <em>{rendered}</em>;
  }
  return <span {...attributes}>{rendered}</span>;
}

// Custom element renderer for monster tags
function Element({ attributes, children, element }: { attributes: any; children: React.ReactNode; element: SlateElement }) {
  const editor = useSlateStatic();
  if ((element as any).type === "monster-tag") {
    const name = (element as any).name;
    // Remove the monster tag node on close button click
    const removeTag = (e: React.MouseEvent) => {
      e.preventDefault();
      const path = ReactEditor.findPath(editor, element);
      Transforms.removeNodes(editor, { at: path });
    };
    return (
      <span
        {...attributes}
        contentEditable={false}
        style={{ background: '#ffe082', color: '#6d4c41', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer', fontWeight: 'bold', margin: '0 2px', display: 'inline-block', position: 'relative' }}
        title={`Voir le monstre ${name}`}
      >
        <span
          onMouseDown={e => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('openMonsterModal', { detail: { monsterName: name } }));
          }}
        >
          {`[${name}]`}
        </span>
        <span
          style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fff', color: '#d32f2f', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', border: '1px solid #d32f2f' }}
          title="Supprimer le tag"
          onMouseDown={removeTag}
        >
          ×
        </span>
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
}
