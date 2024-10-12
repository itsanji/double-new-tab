export interface INote {
  id: string;
  style: INoteStyle;
  position: { x: number; y: number };
}

export interface INoteStyle {
  background: string;
  boder: string;
  color: string;
}

type ContentType = 'text' | 'link';

export interface NoteContent extends TextConfig {
  id: string;
  text: string;
  type: ContentType;
}
