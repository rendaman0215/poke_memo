<template>
  <div class="container">
    <h1>ポケメモ</h1>
    <div class="main">
      <section class="selected">
        <h2>相手の選出</h2>
        <div class="selected__poke">
          <PokemonCard
            class="selected__poke__card"
            v-for="(poke, index) in selectedPoke"
            :key="poke.id"
            :pokemon="poke"
            @removeFromParty="removeFromSelected(poke)"
          />
        </div>
      </section>
      <section class="party">
        <h2>
          相手のパーティ<span class="party__clear" @click="clear()"
            >リセット</span
          >
        </h2>
        <div class="party__poke">
          <PokeButton
            v-for="poke in partyPokes"
            class="party__poke__button"
            :key="poke.id"
            :poke="poke"
            :deletable="true"
            @selected="selectPokeFromParty(poke)"
            @remove="removeFromParty(poke)"
          />
        </div>
      </section>
      <section class="ranking">
        <h2>使用率ランキング</h2>
        <SearchBox
          class="searchbox"
          @searchWord="(newVal:string) => (keyword = newVal)"
        />
        <div v-if="keyword == ''" class="ranking__list">
          <PokeButton
            v-for="poke in baseRankedPokes"
            :key="poke.rank"
            :ranked="true"
            class="ranking__list__poke"
            :poke="poke"
            @selected="selectPokeFromRank(poke)"
          />
        </div>
        <div class="ranking__list">
          <PokeButton
            v-for="poke in grepedPokes"
            :key="poke.rank"
            :ranked="true"
            class="ranking__list__poke"
            :poke="poke"
            @selected="selectPokeFromRank(poke)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pokeRank } from "@/data/data";

const baseRankedPokes = ref<Pokemon[]>([]);
const allPokes = ref<Pokemon[]>([]);
const partyPokes = ref<Pokemon[]>([]);
const selectedPoke = ref<Pokemon[]>([]);
const keyword = ref<string>("");

onMounted(() => {
  for (const poke of pokeRank) {
    baseRankedPokes.value.push(NewPokemon(poke.id, poke.form, true));
  }

  const keys = Object.keys(PokemonListWithFrom);
  for (const key of keys) {
    const idAndForm = key.split("_");
    let idString = idAndForm[0];
    let id = 0;
    let form = parseInt(key.split("_")[1]);
    if (
      idString.charAt(0) === "A" ||
      idString.charAt(0) === "B" ||
      idString.charAt(0) === "D"
    ) {
      id = parseInt(idString.slice(1));
    } else if (idString.charAt(0) === "X") {
      continue;
    } else {
      id = DEX_NO_LIST[key];
    }

    const sameBaseOtherForm = [
      25, 664, 665, 666, 667, 668, 669, 670, 671, 585, 586, 422, 423, 774, 869,
      999,
    ];
    if (sameBaseOtherForm.includes(id)) {
      form = 0;
    }
    allPokes.value.push(NewPokemon(id, form));
  }
});

const grepedPokes = computed(() => {
  keyword.value = hiraganaToKatakana(keyword.value);
  return allPokes.value.filter((poke) => poke.name.includes(keyword.value));
});

const selectPokeFromRank = (poke: Pokemon) => {
  if (partyPokes.value.length >= 6) {
    return;
  }
  if (partyPokes.value.includes(poke)) {
    return;
  }
  partyPokes.value.push(poke);
};

const selectPokeFromParty = (poke: Pokemon) => {
  if (selectedPoke.value.length >= 3) {
    return;
  }
  if (selectedPoke.value.includes(poke)) {
    return;
  }
  selectedPoke.value.push(poke);
};

const removeFromParty = (poke: Pokemon) => {
  partyPokes.value = partyPokes.value.filter((p) => p !== poke);
  selectedPoke.value = selectedPoke.value.filter((p) => p.id !== poke.id);
};

const removeFromSelected = (poke: Pokemon) => {
  selectedPoke.value = selectedPoke.value.filter((p) => {
    return p.id !== poke.id;
  });
};

const clear = () => {
  partyPokes.value = [];
  selectedPoke.value = [];
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 28px;
  font-weight: 600;
  color: white;
  background-color: #f53b4c;
  padding: 1rem 0;
  text-align: center;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  padding: 0rem 0;
  margin-left: 1rem;
}

.container {
  margin: 0 auto;
  max-width: 1024px;
}

.main {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0.5rem;
  flex-wrap: wrap;
}

.selected {
  flex: 1 1 100%;
  height: 500px;
  display: block;
  &__poke {
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;
    &__card {
      margin: 0 1rem;
    }
  }
}

.party {
  margin-top: 1rem;
  display: block;
  width: 100%;
  &__poke {
    height: auto;
    justify-content: center;
    padding: 1rem auto;
    display: grid;
    grid-template-rows: 50px 50px;
    grid-template-columns: 180px 180px 180px;
    grid-gap: 5%;
    @media (max-width: 768px) {
      grid-template-columns: 180px 180px;
    }
    &__button {
      flex: 3 2 33%;
      margin: 1rem 0;
    }
  }
  &__clear {
    font-size: 12px;
    cursor: pointer;
    color: red;
    margin-left: 1rem;
    font-family: "Arial";
  }
}

.ranking {
  margin-top: 1rem;
  flex: 1 1 100%;
  align-items: center;
  &__list {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    &__poke {
      display: flex;
      align-items: center;
      margin: 0.5rem;
      box-sizing: content-box;
    }
  }
}

.searchbox {
  margin: 1rem;
}
</style>
