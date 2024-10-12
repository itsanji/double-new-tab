import { TextConfig } from 'konva/lib/shapes/Text';

export interface INote {
  id: string;
  position: { x: number; y: number };
}

type ContentType = 'text' | 'link';

export interface NoteContent extends TextConfig {
  id: string;
  text: string;
  type: ContentType;
}
