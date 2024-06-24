//const config = useRuntimeConfig();
const apiURL = "https://resource.pokemon-home.com/battledata";

export const GetPokeiIconName = (id: number, form: number): string => {
  const pokemonIconName =
    apiURL +
    "/img/pokei/icon" +
    ("000" + id).slice(-4) +
    "_f" +
    ("0" + form).slice(-2) +
    "_s0" +
    ".png";
  return pokemonIconName;
};

export const GetTypeIconName = (type: string): string => {
  const typeIconName = apiURL + "/img/types/" + type + ".png";
  return typeIconName;
};

export const GetItemIconName = (iconno: string) => {
  let t = apiURL + "/img/item/item_" + ("000" + iconno).slice(-4);
  return (t += ".png"), t;
};

export const GetTerastalIconName = (teraTypeId: number) => {
  let t = apiURL + "/img/terastal/";
  switch (teraTypeId) {
    case 0:
      t += "icon_terastal_type_normal";
      break;
    case 1:
      t += "icon_terastal_type_fighting";
      break;
    case 2:
      t += "icon_terastal_type_flying";
      break;
    case 3:
      t += "icon_terastal_type_poison";
      break;
    case 4:
      t += "icon_terastal_type_ground";
      break;
    case 5:
      t += "icon_terastal_type_rock";
      break;
    case 6:
      t += "icon_terastal_type_bug";
      break;
    case 7:
      t += "icon_terastal_type_ghost";
      break;
    case 8:
      t += "icon_terastal_type_steel";
      break;
    case 9:
      t += "icon_terastal_type_fire";
      break;
    case 10:
      t += "icon_terastal_type_water";
      break;
    case 11:
      t += "icon_terastal_type_grass";
      break;
    case 12:
      t += "icon_terastal_type_electric";
      break;
    case 13:
      t += "icon_terastal_type_psychic";
      break;
    case 14:
      t += "icon_terastal_type_ice";
      break;
    case 15:
      t += "icon_terastal_type_dragon";
      break;
    case 16:
      t += "icon_terastal_type_dark";
      break;
    case 17:
      t += "icon_terastal_type_fairy";
      break;
    case 99:
      t += "icon_terastal_type_stellar";
      break;
    default:
      t += "icon_terastal_type_normal";
  }
  return (t += ".png"), t;
};
