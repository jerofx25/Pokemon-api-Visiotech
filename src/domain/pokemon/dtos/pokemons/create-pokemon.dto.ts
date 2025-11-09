
import { PokemonType } from "../../../shared/enums/pokemon-type.enum";
import { z } from "zod";

export class CreatePokemonDto {

  static schema = z.object({

    name: z.string().min(1, "name is required"),
    level: z.number().int().positive("level must be a positive number"),
    type: z.nativeEnum(PokemonType).refine(
      (value) => Object.values(PokemonType).includes(value),
      { message: "Invalid pokemon type" }
    ),
    totalHp: z.number().int().positive("totalHp must be a positive number"),
    currentHp: z.number().int().optional(),

    attack: z.number().int().nonnegative("attack must be a non-negative number"),
    defense: z.number().int().nonnegative("defense must be a non-negative number"),
    specialAttack: z.number().int().nonnegative("specialAttack must be a non-negative number"),
    specialDefense: z.number().int().nonnegative("specialDefense must be a non-negative number"),
    speed: z.number().int().nonnegative("speed must be a non-negative number"),

    moveIds: z.array(z.number().int().positive()).optional().default([]),
  })
  .transform((data) => {

    const currentHp = data.currentHp ?? data.totalHp;

    if (currentHp < 0 || currentHp > data.totalHp) {
      throw new Error("currentHp must be between 0 and totalHp");
    }

    return { ...data, currentHp };
  });

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
    public readonly moveIds: number[] = [],
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreatePokemonDto?] {

    const result = this.schema.safeParse(props);

    if(!result.success){
      return [result.error.issues[0]?.message]
    }

    const {
      name, level, type,
      currentHp, totalHp,
      attack, defense, specialAttack, specialDefense, speed,
      moveIds = []
    } = result.data!;


    return [
      undefined,
      new CreatePokemonDto(
        name,
        level,
        type,
        currentHp,
        totalHp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
        moveIds,
      ),
    ];
  }
}