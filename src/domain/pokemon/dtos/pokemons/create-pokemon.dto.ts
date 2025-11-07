import { Move } from "../../../move/entities/move.entity";
import { PokemonType } from "../../../shared/enums/pokemon-type.enum";

export class CreatePokemonDto {

  private constructor(
    public readonly name: string,
    public readonly level: number,
    public readonly type: PokemonType,
    public readonly currentHp: number,
    public readonly totalHp: number,
    public readonly attack: number,
    public readonly defense: number,
    public readonly specialAttack: number,
    public readonly specialDefense: number,
    public readonly speed: number,
    public readonly moves: Move[],
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreatePokemonDto?] {

    const {
      name, level, type,
      currentHp, totalHp,
      attack, defense, specialAttack, specialDefense, speed,
      moves
    } = props;

    // Required validations
    if (!name) return ['name is required'];
    if (!type) return ['type is required'];

    if (isNaN(level) || level <= 0) return ['level must be a positive number'];
    if (isNaN(totalHp) || totalHp <= 0) return ['totalHp must be a positive number'];

    if (isNaN(currentHp) || currentHp < 0 || currentHp > totalHp)
      return ['currentHp must be between 0 and totalHp'];

    const stats = [
      ['attack', attack],
      ['defense', defense],
      ['specialAttack', specialAttack],
      ['specialDefense', specialDefense],
      ['speed', speed],
    ];

    for (const [statName, statValue] of stats) {
      if (isNaN(statValue) || statValue < 0)
        return [`${statName} must be a non-negative number`];
    }

    // Moves validation
    if (!Array.isArray(moves)) return ['moves must be an array'];
    if (moves.length > 4) return ['moves cannot exceed 4'];

    
    const parsedMoves = moves.map((m: any) =>
      new Move(
        Number(m.id),
        m.name,
        m.type,
        m.category,
        Number(m.power),
        Number(m.accuracy ?? 100),
        Number(m.pp ?? 5),
        m.effect ?? '',
        m.probability !== undefined ? Number(m.probability) : null
      )
    );

    return [
      undefined,
      new CreatePokemonDto(
        name,
        Number(level),
        type,
        Number(currentHp),
        Number(totalHp),
        Number(attack),
        Number(defense),
        Number(specialAttack),
        Number(specialDefense),
        Number(speed),
        parsedMoves,
      ),
    ];
  }
}