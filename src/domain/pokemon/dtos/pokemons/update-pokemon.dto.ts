import { Move } from "../../../move/entities/move.entity";

export class UpdatePokemonDto {

  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly level?: number,
    public readonly type?: string,
    public readonly currentHp?: number,
    public readonly totalHp?: number,
    public readonly attack?: number,
    public readonly defense?: number,
    public readonly specialAttack?: number,
    public readonly specialDefense?: number,
    public readonly speed?: number,
    public readonly moves?: Move[],
  ) {}

  get values() {
    const updatedFields: any = {};

    if (this.name !== undefined) updatedFields.name = this.name;
    if (this.level !== undefined) updatedFields.level = this.level;
    if (this.type !== undefined) updatedFields.type = this.type;
    if (this.currentHp !== undefined) updatedFields.currentHp = this.currentHp;
    if (this.totalHp !== undefined) updatedFields.totalHp = this.totalHp;
    if (this.attack !== undefined) updatedFields.attack = this.attack;
    if (this.defense !== undefined) updatedFields.defense = this.defense;
    if (this.specialAttack !== undefined) updatedFields.specialAttack = this.specialAttack;
    if (this.specialDefense !== undefined) updatedFields.specialDefense = this.specialDefense;
    if (this.speed !== undefined) updatedFields.speed = this.speed;
    if (this.moves !== undefined) updatedFields.moves = this.moves;

    return updatedFields;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdatePokemonDto?] {
    
    const { id, moves, ...rest } = props;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      return ['id must be a valid number'];
    }

    // Validate and parse moves if provided
    let parsedMoves: Move[] | undefined = undefined;

    if (moves !== undefined) {

      if (!Array.isArray(moves)) return ['moves must be an array'];
      if (moves.length > 4) return ['moves cannot exceed 4'];

      parsedMoves = moves.map((m: any) =>
        new Move(
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
    }

    return [
      undefined,
      new UpdatePokemonDto(
        Number(id),
        rest.name,
        rest.level !== undefined ? Number(rest.level) : undefined,
        rest.type,
        rest.currentHp !== undefined ? Number(rest.currentHp) : undefined,
        rest.totalHp !== undefined ? Number(rest.totalHp) : undefined,
        rest.attack !== undefined ? Number(rest.attack) : undefined,
        rest.defense !== undefined ? Number(rest.defense) : undefined,
        rest.specialAttack !== undefined ? Number(rest.specialAttack) : undefined,
        rest.specialDefense !== undefined ? Number(rest.specialDefense) : undefined,
        rest.speed !== undefined ? Number(rest.speed) : undefined,
        parsedMoves
      )
    ];
  }
}