export type Track = {
  file: string;
  kind: string;
  label?: string;
  default?: boolean;
};

type IntroOutro = {
  start: number;
  end: number;
};

export type UnencryptedSrc = {
  file: string;
  type: string;
};

export type ExtractedSrc = {
  sources?: string | UnencryptedSrc[];
  tracks?: Track[];
  encrypted?: boolean;
  intro?: IntroOutro;
  outro?: IntroOutro;
  server?: number;
};