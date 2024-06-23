// ポケモンのタイプ一覧
export const PokeTypeList = [
  "ノーマル",
  "かくとう",
  "ひこう",
  "どく",
  "じめん",
  "いわ",
  "むし",
  "ゴースト",
  "はがね",
  "ほのお",
  "みず",
  "くさ",
  "でんき",
  "エスパー",
  "こおり",
  "ドラゴン",
  "あく",
  "フェアリー",
] as const;

export type PokeType = (typeof PokeTypeList)[number];
