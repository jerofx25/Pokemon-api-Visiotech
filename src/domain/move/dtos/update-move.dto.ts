import { MoveCategory } from "../../shared/enums/move-category.enum";
import { PokemonType } from "../../shared/enums/pokemon-type.enum";
import { z } from "zod";


export class UpdateMoveDto {

    static schema = z.object({
    id: z.number().int().positive("id must be a valid number"),

    name: z.string().min(1).optional(),

    type: z.nativeEnum(PokemonType).refine(
      (value) => Object.values(PokemonType).includes(value),
      { message: "Invalid move type" }
    ).optional(),

    category: z.nativeEnum(MoveCategory).refine(
      (value) => Object.values(MoveCategory).includes(value),
      { message: "Invalid move category" }
    ).optional(),

    power: z.union([z.string(), z.number()]).transform((val) => {
      if (val === undefined) return undefined;
      const n = Number(val);
      if (isNaN(n) || n < 0) throw new Error("power must be a non-negative number");
      return n;
    }).optional(),

    accuracy: z.union([z.string(), z.number()]).transform((val) => {
      if (val === undefined) return undefined;
      const n = Number(val);
      if (isNaN(n) || n < 0 || n > 100)
        throw new Error("accuracy must be between 0 and 100");
      return n;
    }).optional(),

    pp: z.union([z.string(), z.number()]).transform((val) => {
      if (val === undefined) return undefined;
      const n = Number(val);
      if (isNaN(n) || n <= 0)
        throw new Error("pp must be a positive number");
      return n;
    }).optional(),

    effect: z.string().optional(),

    probability: z.union([z.string(), z.number(), z.null(), z.undefined()]).transform((val) => {
      if (val === undefined || val === null) return undefined;
      const n = Number(val);
      if (isNaN(n) || n < 0 || n > 100)
        throw new Error("probability must be between 0 and 100");
      return n;
    }).optional(),
  });

  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly type?: PokemonType,
    public readonly category?: MoveCategory,
    public readonly power?: number,
    public readonly accuracy?: number,
    public readonly pp?: number,
    public readonly effect?: string,
    public readonly probability?: number | null,
  ) {}

  
  get values() {
    const updated: { [key: string]: any } = {};

    if (this.name !== undefined) updated.name = this.name;
    if (this.type !== undefined) updated.type = this.type;
    if (this.category !== undefined) updated.category = this.category;
    if (this.power !== undefined) updated.power = this.power;
    if (this.accuracy !== undefined) updated.accuracy = this.accuracy;
    if (this.pp !== undefined) updated.pp = this.pp;
    if (this.effect !== undefined) updated.effect = this.effect;
    if (this.probability !== undefined) updated.probability = this.probability;

    return updated;
  }


  static create(props: { [key: string]: any }): [string | undefined, UpdateMoveDto | undefined] {

    const parsed = this.schema.safeParse({
      ...props,
      id: Number(props.id),
    });

    if (!parsed.success) {
      return [parsed.error.issues[0]?.message, undefined];
    }

    const {
      id,
      name,
      type,
      category,
      power,
      accuracy,
      pp,
      effect,
      probability,
    } = parsed.data;

    return [
      undefined,
      new UpdateMoveDto(id, name, type, category, power, accuracy, pp, effect, probability)
    ];
  }
}