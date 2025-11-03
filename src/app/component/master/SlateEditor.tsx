"use client";
import React, { useMemo, useState } from "react";
import { Slate, Editable, withReact, useSlateStatic, ReactEditor } from "slate-react";
import { createEditor, Transforms, Editor, Element as SlateElement, BaseEditor, Node, Descendant, Text } from "slate";

// Define custom Slate element types
type ParagraphElement = {
  type: "paragraph";
  children: Text[];
};

type BulletedListElement = {
  type: "bulleted-list";
  children: ListItemElement[];
};

type NumberedListElement = {
  type: "numbered-list";
  children: ListItemElement[];
};

type ListItemElement = {
  type: "list-item";
  children: Text[];
};

type MonsterTagElement = {
  type: "monster-tag";
  name: string;
  children: Text[];
};

type CustomElement = ParagraphElement | BulletedListElement | NumberedListElement | ListItemElement | MonsterTagElement;
type CustomDescendant = CustomElement | Text;





const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Écris ton texte ici..." }],
  },
];

// Custom monster tag element type
interface SlateEditorProps {
  initialText?: string;
  partyId: string;
  insertMonsterName?: string | null;
  onMonsterInserted?: () => void;
}

export default function SlateEditor({ initialText = "", partyId, insertMonsterName, onMonsterInserted }: SlateEditorProps) {
  const editor = useMemo(() => {
    const e = withReact(createEditor());
    // Declare monster-tag as inline and void for Slate
    const { isInline, isVoid } = e;
    e.isInline = (element: SlateElement) => {
      return (element as CustomElement).type === "monster-tag" ? true : isInline(element);
    };
    e.isVoid = (element: SlateElement) => {
      return (element as CustomElement).type === "monster-tag" ? true : isVoid(element);
    };
    return e;
  }, []);

  // Insert a bulleted or numbered list at the current selection
  function insertList(type: "bulleted-list" | "numbered-list") {
    const list: BulletedListElement | NumberedListElement = {
      type,
      children: [
        {
          type: "list-item",
          children: [{ text: "" }],
        },
      ],
    };
  Transforms.insertNodes(editor, list as Node);
  }
  // Insertion automatique de balise monstre
  React.useEffect(() => {
    if (insertMonsterName) {
      const { selection } = editor;
      const monsterTag: MonsterTagElement = {
        type: "monster-tag",
        name: insertMonsterName,
        children: [{ text: "" }],
      };
      if (selection) {
        // Insert the monster tag inline at the current selection
    Transforms.insertNodes(editor, monsterTag as Node, { at: selection });
        // Insert a space after the tag for easier editing
        Transforms.insertText(editor, " ");
        // Move cursor after the space
        const anchor = selection.anchor;
        const nextPath = [...anchor.path.slice(0, -1), anchor.path[anchor.path.length - 1] + 2];
        Transforms.select(editor, { path: nextPath, offset: 0 });
      } else {
        // Fallback: insert at end of first paragraph
        const firstParagraphPath = [0];
  const firstParagraph = Editor.node(editor, firstParagraphPath)[0];
  const len = Array.isArray((firstParagraph as ParagraphElement).children) ? (firstParagraph as ParagraphElement).children.length : 0;
  Transforms.insertNodes(editor, monsterTag as Node, { at: [0, len] });
  Transforms.insertText(editor, " ");
  Transforms.select(editor, { path: [0, len + 1], offset: 0 });
      }
      if (onMonsterInserted) onMonsterInserted();
    }
  }, [insertMonsterName, editor, onMonsterInserted]);
  // Parse initialText to convert [monster:Name] tags into monster-tag elements
  function parseAdventureText(text: string): Descendant[] {
    if (!text) return initialValue;
    // Split by monster tags
    const parts = text.split(/(\[monster:[^\]]+\])/g);
    const children: CustomDescendant[] = parts.map(part => {
      const match = part.match(/^\[monster:(.+?)\]$/);
      if (match) {
        return {
          type: "monster-tag",
          name: match[1],
          children: [{ text: "" }],
        };
      }
      return { text: part };
    });
    return [
      {
        type: "paragraph",
        children: children.filter(Boolean) as Text[],
      },
    ];
  }
  // Charger le texte initial : si c'est du JSON, le parser, sinon parser l'ancien format texte
  let initialSlateValue: Descendant[] = initialValue;
  try {
    if (initialText) {
      if (initialText.trim().startsWith("[{")) {
        initialSlateValue = JSON.parse(initialText);
      } else {
        initialSlateValue = parseAdventureText(initialText);
      }
    }
  } catch {
    initialSlateValue = initialValue;
  }
  const [value, setValue] = useState<Descendant[]>(initialSlateValue);
  const [saving, setSaving] = useState(false);

  // Format toggle helpers
  const toggleFormat = (format: "bold" | "italic") => {
    const isActive = Editor.marks(editor)?.[format] === true;
    Transforms.setNodes(
      editor,
      { [format]: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  };

  // Enregistrement manuel
  const handleSave = async () => {
    setSaving(true);
    // Enregistrer le contenu Slate (JSON) pour garder la structure, le format et les tags
    await fetch("/api/party", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partyId, adventureText: JSON.stringify(value) }),
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
            G
          </button>
          <button
            type="button"
            className="px-2 py-1 text-black rounded hover:bg-amber-200 italic"
            onMouseDown={event => {
              event.preventDefault();
              toggleFormat("italic");
            }}
          >
            I
          </button>
          <button
            type="button"
            className="px-2 py-1 text-black rounded hover:bg-amber-200"
            onMouseDown={event => {
              event.preventDefault();
              insertList("bulleted-list");
            }}
          >
            •
          </button>
          <button
            type="button"
            className="px-2 py-1 text-black rounded hover:bg-amber-200"
            onMouseDown={event => {
              event.preventDefault();
              insertList("numbered-list");
            }}
          >
            1.
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
          onKeyDown={event => {
            if (event.key === "Enter") {
              const { selection } = editor;
              if (selection) {
                const parent = Editor.parent(editor, selection)[0];
                function isListItemElement(node: unknown): node is ListItemElement {
                  return typeof node === "object" && node !== null && (node as ListItemElement).type === "list-item";
                }
                if (
                  isListItemElement(parent) && Editor.string(editor, selection.anchor.path) === ""
                ) {
                  event.preventDefault();
                  // Trouve le chemin du parent (la liste)
                  const listPath = Editor.parent(editor, selection.anchor.path)[1].slice(0, -1);
                  const listIndex = listPath[0];
                  // Supprime le list-item vide
                  Transforms.removeNodes(editor, { at: selection.anchor.path });
                  // Insère un nouveau paragraphe à la racine juste après la liste
                  Transforms.insertNodes(
                    editor,
                    { type: "paragraph", children: [{ text: "" }] } as unknown as Node,
                    { at: [listIndex + 1] }
                  );
                  // Place le curseur dans le nouveau paragraphe
                  Transforms.select(editor, { path: [listIndex + 1, 0], offset: 0 });
                }
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

// Custom leaf renderer for bold/italic
interface LeafProps {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  leaf: Text;
}
function Leaf({ attributes, children, leaf }: LeafProps) {
  let rendered = children;
  if (leaf.bold) {
    rendered = <strong>{rendered}</strong>;
  }
  if (leaf.italic) {
    rendered = <em>{rendered}</em>;
  }
  return <span {...attributes}>{rendered}</span>;
}

// Custom element renderer for lists and monster tags
interface ElementProps {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  element: CustomElement;
}
function Element({ attributes, children, element }: ElementProps) {
  const editor = useSlateStatic();
  if (element.type === "monster-tag") {
    const name = (element as MonsterTagElement).name;
    // Remove the monster tag node on close button click
    const removeTag = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const path = ReactEditor.findPath(editor, element as unknown as Node);
      Transforms.removeNodes(editor, { at: path });
    };
    return (
      <span
        {...attributes}
        contentEditable={false}
        style={{ background: '#ffe082', color: '#6d4c41', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer', fontWeight: 'bold', margin: '0 2px', display: 'inline-block', position: 'relative' }}
        title={`Voir le monstre ${name}`}
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
          window.dispatchEvent(new CustomEvent('openMonsterModal', { detail: { monsterName: name } }));
        }}
      >
        <span style={{ cursor: 'pointer' }}>{`[${name}]`}</span>
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
  if (element.type === "bulleted-list") {
    return <ul {...attributes} className="list-disc ml-6">{children}</ul>;
  }
  if (element.type === "numbered-list") {
    return <ol {...attributes} className="list-decimal ml-6">{children}</ol>;
  }
  if (element.type === "list-item") {
    return <li {...attributes}>{children}</li>;
  }
  return <span {...attributes}>{children}</span>;
}
