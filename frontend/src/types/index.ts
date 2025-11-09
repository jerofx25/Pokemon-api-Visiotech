export const PokemonType = {
  Normal: "normal",
  Fire: "fire",
  Water: "water",
  Grass: "grass",
  Electric: "electric",
  Ice: "ice",
  Fighting: "fighting",
  Poison: "poison",
  Ground: "ground",
  Flying: "flying",
  Psychic: "psychic",
  Bug: "bug",
  Rock: "rock",
  Ghost: "ghost",
  Dark: "dark",
  Dragon: "dragon",
  Steel: "steel",
  Fairy: "fairy",
} as const;

export type PokemonType = typeof PokemonType[keyof typeof PokemonType];

export const MoveCategory = {
  Physical: "physical",
  Special: "special",
  Status: "status",
} as const;

export type MoveCategory = typeof MoveCategory[keyof typeof MoveCategory];

export interface Pokemon {
  id: number;
  name: string;
  level: number;
  type: PokemonType;
  currentHp: number;
  totalHp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  moves: Move[];
}

export interface Move {
  id: number;
  name: string;
  type: PokemonType;
  category: MoveCategory;
  power: number;
  accuracy: number;
  pp: number;
  effect: string;
  probability: number | null;
}

export interface Battle {
  id: number;
  pokemonA: Pokemon;
  pokemonB: Pokemon;
  status: string;
  winnerId: number | null;
  turns: BattleTurn[];
}

export interface BattleTurn {
  id: number;
  turnNumber: number;
  attacker: Pokemon;
  defender: Pokemon;
  move: Move;
  damage: number;
  hit: boolean;
  message: string;
}

