import { PokemonCharacter } from "./pokemon-character";

export interface PokemonResponseTs {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: PokemonCharacter[];
}