export interface Pawn {
  id: number;
  x: number;
  y: number;
  color: string;
  label: string;
}

export interface SelectImageProps {
  images: string[];
  value: string;
  onChange: (url: string) => void;
}

export interface UploadImageProps {
  onUpload: (url: string) => void;
}
