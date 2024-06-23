export const TeraTypeDict = {
  0: "ノーマル",
  1: "かくとう",
  2: "ひこう",
  3: "どく",
  4: "じめん",
  5: "いわ",
  6: "むし",
  7: "ゴースト",
  8: "はがね",
  9: "ほのお",
  10: "みず",
  11: "くさ",
  12: "でんき",
  13: "エスパー",
  14: "こおり",
  15: "ドラゴン",
  16: "あく",
  17: "フェアリー",
  99: "ステラ",
};

export type TeraType = {
  id: keyof typeof TeraTypeDict;
  name: (typeof TeraTypeDict)[keyof typeof TeraTypeDict];
};
