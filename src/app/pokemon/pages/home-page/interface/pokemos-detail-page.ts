export interface PokemonCharacterDetail {

  id: number;
  name: string;

  sprites: {
    front_default: string;
  };

  types: {
    slot: number;
    type: { name: string };
  }[];

  abilities: {
    ability: { name: string };
    is_hidden: boolean;
    slot: number;
  }[];

  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string };
  }[];

  moves: {
    move: { name: string };
  }[];

  height: number;
  weight: number;
  base_experience: number;

}
