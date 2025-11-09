import { Move } from "../../../move/entities/move.entity";
import { PokemonType } from "../../../shared/enums/pokemon-type.enum";
import { z } from "zod";

export class UpdatePokemonDto {

  static schema = z.object({
    id: z.number().int().positive("id must be a valid number"),

    name: z.string().min(1).optional(),
    level: z.number().int().positive().optional(),
    type: z.nativeEnum(PokemonType).optional(),

    currentHp: z.number().int().nonnegative().optional(),
    totalHp: z.number().int().positive().optional(),

    attack: z.number().int().nonnegative().optional(),
    defense: z.number().int().nonnegative().optional(),
    specialAttack: z.number().int().nonnegative().optional(),
    specialDefense: z.number().int().nonnegative().optional(),
    speed: z.number().int().nonnegative().optional(),

    moves: z.array(z.any()).max(4, "moves cannot exceed 4").optional(),
  });

  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly level?: number,
    public readonly type?: PokemonType,
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
    const updatedFields: { [key: string]: any } = {};

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
    
    const parsed = this.schema.safeParse({
      ...props,
      id: Number(props.id),
      level: props.level !== undefined ? Number(props.level) : undefined,
      currentHp: props.currentHp !== undefined ? Number(props.currentHp) : undefined,
      totalHp: props.totalHp !== undefined ? Number(props.totalHp) : undefined,
      attack: props.attack !== undefined ? Number(props.attack) : undefined,
      defense: props.defense !== undefined ? Number(props.defense) : undefined,
      specialAttack: props.specialAttack !== undefined ? Number(props.specialAttack) : undefined,
      specialDefense: props.specialDefense !== undefined ? Number(props.specialDefense) : undefined,
      speed: props.speed !== undefined ? Number(props.speed) : undefined,
    });

    if (!parsed.success) {
      return [parsed.error.issues[0]?.message];
    }

    const data = parsed.data;

    let parsedMoves: Move[] | undefined = undefined;

    if (data.moves !== undefined) {
      parsedMoves = data.moves.map((m: any) =>
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
    }

    return [
      undefined,
      new UpdatePokemonDto(
        data.id,
        data.name,
        data.level,
        data.type,
        data.currentHp,
        data.totalHp,
        data.attack,
        data.defense,
        data.specialAttack,
        data.specialDefense,
        data.speed,
        parsedMoves
      )
    ];
  }
}