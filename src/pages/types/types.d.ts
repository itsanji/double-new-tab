import { TextConfig } from 'konva/lib/shapes/Text';

export interface ShapeAttr {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
}

export interface Note {
  id: string;
  shapeAttr: ShapeAttr;
  content: NoteContent[];
}

type ContentType = 'text' | 'link';

export interface NoteContent extends TextConfig {
  id: string;
  type: ContentType;
}
