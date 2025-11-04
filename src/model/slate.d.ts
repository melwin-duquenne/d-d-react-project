import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export type ParagraphElement = {
  type: "paragraph";
  children: Text[];
};

export type Text = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement;
    Text: Text;
  }
}

export interface SlateEditorProps {
  initialText?: string;
  partyId: string;
  insertMonsterName?: string | null;
  onMonsterInserted?: () => void;
}