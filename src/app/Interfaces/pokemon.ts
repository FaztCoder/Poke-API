export interface Sprite {
  front_default: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetails {
  sprites: {
    other: {
      dream_world: Sprite;
    };
  };
}

export interface PokemonWithSprite extends Pokemon {
  sprite: string;
}
