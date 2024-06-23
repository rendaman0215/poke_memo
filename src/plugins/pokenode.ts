import { PokemonClient } from "pokenode-ts";

export default defineNuxtPlugin(() => {
  // pokemonClientインスタンスをコンテキストに追加
  const api = new PokemonClient();
  return {
    provide: {
      pokenode: api,
    },
  };
});
