export const TeraTypeDict: {
  [key: number]: { name: string; color: string };
} = {
  0: {
    name: "ノーマル",
    color: "#999999",
  },
  1: {
    name: "かくとう",
    color: "#ce406a",
  },
  2: {
    name: "ひこう",
    color: "#8fa8dd",
  },
  3: {
    name: "どく",
    color: "#ab6ac8",
  },
  4: {
    name: "じめん",
    color: "#d97745",
  },
  5: {
    name: "いわ",
    color: "#c7b78b",
  },
  6: {
    name: "むし",
    color: "#90c12d",
  },
  7: {
    name: "ゴースト",
    color: "#6e4570",
  },
  8: {
    name: "はがね",
    color: "#598ea1",
  },
  9: {
    name: "ほのお",
    color: "#ff9c54",
  },
  10: {
    name: "みず",
    color: "#4e90d6",
  },
  11: {
    name: "くさ",
    color: "#63bb5b",
  },
  12: {
    name: "でんき",
    color: "#f4d23c",
  },
  13: {
    name: "エスパー",
    color: "#f97177",
  },
  14: {
    name: "こおり",
    color: "#73cec0",
  },
  15: {
    name: "ドラゴン",
    color: "#0a6dc4",
  },
  16: {
    name: "あく",
    color: "#5a5366",
  },
  17: {
    name: "フェアリー",
    color: "#ed8fe6",
  },
  99: {
    name: "ステラ",
    color: "#f4d23c",
  },
} as const;

export type TeraType = {
  id: keyof typeof TeraTypeDict;
  info: (typeof TeraTypeDict)[number];
};
