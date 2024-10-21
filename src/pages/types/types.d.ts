export interface INote {
  id: string;
  style: INoteStyle;
  position: { x: number; y: number };
  content: string;
}

export interface INoteStyle {
  width: number;
  background: string;
  boder: string;
  color: string;
}
