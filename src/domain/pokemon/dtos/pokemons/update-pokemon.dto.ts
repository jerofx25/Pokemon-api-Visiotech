import { Move } from "../../entities/move.entity";


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
    const v: Record<string, any> = {};
    for (const key in this) {
      if (this[key as keyof this] !== undefined && key !== "id") {
        v[key] = this[key as keyof this];
      }
    }
    return v;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdatePokemonDto?] {

    const { id, moves, ...rest } = props;

    if (!id || isNaN(Number(id))) {
      return ['id must be a valid number'];
    }

    if (moves && Array.isArray(moves) && moves.length > 4) {
      return ['moves cannot exceed 4'];
    }

    let parsedMoves: Move[] | undefined;
    if (moves) {
      parsedMoves = moves.map((m: any) => new Move(m.name, Number(m.power)));
    }

    return [
      undefined,
      new UpdatePokemonDto(
        Number(id),
        rest.name,
        rest.level ? Number(rest.level) : undefined,
        rest.type,
        rest.currentHp ? Number(rest.currentHp) : undefined,
        rest.totalHp ? Number(rest.totalHp) : undefined,
        rest.attack ? Number(rest.attack) : undefined,
        rest.defense ? Number(rest.defense) : undefined,
        rest.specialAttack ? Number(rest.specialAttack) : undefined,
        rest.specialDefense ? Number(rest.specialDefense) : undefined,
        rest.speed ? Number(rest.speed) : undefined,
        parsedMoves,
      ),
    ];
  }
}