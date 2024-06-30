<template>
  <div class="card" :style="shadowStyle">
    <div class="card__header">
      <div class="card__header__name">
        {{ pokemon.name }}
      </div>
      <div class="card__header__type" v-if="pokemon.teraType === undefined">
        <div
          v-for="pokeType in pokemon.types"
          class="card__header__type__typeContainer"
          :style="{ backgroundColor: pokeType.info.color }"
        >
          <div
            class="card__header__type__typeContainer__inner"
            :style="{
              backgroundImage: `url(${iconTypeUrl})`,
              backgroundPosition: pokeType.info.position,
            }"
          />
        </div>
      </div>
      <div class="card__header__teras" v-else>
        <img :src="GetTerastalIconName(pokemon.teraType.id)" alt="tera" />
      </div>
    </div>
    <div class="card__body">
      <img
        class="card__body__icon"
        :src="GetPokeiIcon128Name(pokemon.id, pokemon.form)"
        alt="poke"
      />
      <ul class="card__body__bases">
        <li>H: {{ pokemon.base.HP }}</li>
        <li>A: {{ pokemon.base.Attack }}</li>
        <li>B: {{ pokemon.base.Defense }}</li>
        <li>C: {{ pokemon.base.SpAtk }}</li>
        <li>D: {{ pokemon.base.SpDef }}</li>
        <li>S: {{ pokemon.base.Speed }}</li>
      </ul>
      <select
        v-model="pokemon.teraType"
        class="card__body__tera"
        :style="{
          border: pokemon.teraType
            ? `1px solid ${pokemon.teraType.info.color}`
            : '0.5px solid #777',
        }"
        @change="handleTeras"
      >
        <option :value="noneTeras">テラスタル</option>
        <option
          v-for="(teraType, key) in TeraTypeDict"
          :key="key"
          :value="{
            id: key,
            info: {
              name: teraType.name,
              color: teraType.color,
            },
          }"
        >
          {{ teraType.name }}
        </option>
      </select>
    </div>
    <div class="card__custom">
      <p class="card__custom__key">
        <div class="card__custom__key__key">
          <img
            src="https://resource.pokemon-home.com/battledata/img/item/item_0158.png"
            alt="tera"
            style="width: 16px; height: 16px; margin-right: 2px"
          />
          <span>アイテム</span>
        </div>
        <SuggestInputBox /> 
      </p>
      <p class="card__custom__key">
        <div class="card__custom__key__key">
          <img
            src="https://resource.pokemon-home.com/battledata/img/item/item_1606.png"
            alt="tera"
            style="width: 16px; height: 16px; margin-right: 1px"
          />
          <span>とくせい</span>
        </div>
        <SuggestInputBox />
      </p>
    </div>
    <div class="card__wazalist">
      <div class="card__wazalist__waza">
        a
      </div>
      <div class="card__wazalist__waza">
        a
      </div>
      <div class="card__wazalist__waza">
        a
      </div>
      <div class="card__wazalist__waza">
        a
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pokemon: {
    type: Object as PropType<Pokemon>,
    required: true,
  },
});

const iconTypeUrl = ref(
  "https://resource.pokemon-home.com/battledata/sprite/icons3/icons.png"
);

const pokemon = ref<CustomizedPokemon>({
  id: props.pokemon.id,
  form: props.pokemon.form,
  name: props.pokemon.name,
  types: props.pokemon.types,
  base: props.pokemon.base,
  teraType: undefined,
  seikaku: undefined,
  item: undefined,
  tokusei: undefined,
  waza: undefined,
});

const shadowStyle = computed(() => {
  if (pokemon.value.teraType && pokemon.value.teraType.info) {
    if (pokemon.value.teraType.id === 99)
      return {
        boxShadow: "",
      };
    return {
      boxShadow: `0px 0px 30px ${pokemon.value.teraType.info.color}`,
      backgroundColor: `${lightenColor(
        pokemon.value.teraType.info.color,
        0.8
      )}`,
    };
  }
  return {
    boxShadow: "5px 5px 20px rgba(123, 123, 132, 0.5)",
  };
});

const noneTeras = ref<TeraType>({
  id: 100,
  info: {
    name: "none",
    color: "#ffffff",
  },
});

const handleTeras = () => {
  if (pokemon.value.teraType === noneTeras.value) {
    pokemon.value.teraType = undefined;
  }
};

const lightenColor = (color: string, factor: number) => {
  // 16進数カラーコードからRGB値を抽出
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // 各RGB値を白 (255) に近づける
  const newR = Math.round(r + (255 - r) * factor);
  const newG = Math.round(g + (255 - g) * factor);
  const newB = Math.round(b + (255 - b) * factor);

  // 新しいRGB値を16進数カラーコードに変換
  const newColor = `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;

  return newColor;
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 16px;
  padding: 10px;
  width: 300px;
  height: 400px;
  &__header {
    display: flex;
    justify-content: space-around;
    &__name {
      margin-left: 5px;
      text-align: left;
      width: 160px;
      font-size: 24px;
      font-weight: 500;
      margin-right: 10px;
    }
    &__type {
      text-align: right;
      width: 130px;
      &__typeContainer {
        width: 42px;
        height: 42px;
        margin-right: 5px;
        border-radius: 5px;
        display: inline-block;

        &__inner {
          width: 52px;
          height: 52px;
          position: relative;
          top: -5px;
          left: -5px;
          margin: 0;
          padding: 0;
          transform: scale(0.8);
        }
      }
    }
    &__teras {
      text-align: right;
      width: 130px;
      img {
        width: 46.5px;
        height: 46.5px;
      }
    }
  }

  &__body {
    position: relative;
    justify-content: space-around;
    height: 150px;
    &__icon {
      position: absolute;
      top: 0;
      left: 25%;
      width: 128px;
      height: 128px;
      filter: drop-shadow(5px 10px 5px #999);
    }
    &__bases {
      position: absolute;
      top: 20%;
      left: -10%;
      width: 100px;
      list-style: none;
      color: #777;
      font-size: 12px;
      padding: 0;
      margin: 0;
      text-align: center;
    }
    &__tera {
      position: absolute;
      cursor: pointer;
      top: 5%;
      right: 0%;
      width: 80px;
      height: 30px;
      font-size: 12px;
      font-weight: 500;
      text-align: right;
      border: 0.5px solid #777;
      border-radius: 20px;
      text-align: center;
    }
  }

  &__custom {
    height: 50px;
    font-size: 14px;
    display: block;
    &__key {
      display: block;
      margin: 3px 0;
      color: #333;
      padding: 0;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
  }

  &__wazalist {
    height: 120px;
    display: grid;
    grid-template-rows: 50px 50px;
    grid-template-columns: 45% 45%;
    grid-gap: 5%;
    justify-content: center;
    padding-top: 5px;
    &__waza {
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
