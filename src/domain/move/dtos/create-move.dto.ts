import { MoveCategory } from "../../shared/enums/move-category.enum";
import { PokemonType } from "../../shared/enums/pokemon-type.enum";
import { z } from "zod";


export class CreateMoveDto {

  static schema = z.object({
    name: z.string().min(1, "name is required"),

    type: z.nativeEnum(PokemonType).refine(
      (value) => Object.values(PokemonType).includes(value),
      { message: "Invalid move type" }
    ),

    category: z.nativeEnum(MoveCategory).refine(
      (value) => Object.values(MoveCategory).includes(value),
      { message: "Invalid move category" }
    ),

    power: z.union([z.string(), z.number()]).transform((val) => {
      if (val === "—") return 0;
      const n = Number(val);
      if (isNaN(n) || n < 0) throw new Error("power must be a positive number");
      return n;
    }),

    accuracy: z.union([z.string(), z.number()]).transform((val) => {
      if (val === "—") return 100;
      const n = Number(val);
      if (isNaN(n) || n < 0 || n > 100) throw new Error("accuracy must be between 0 and 100");
      return n;
    }),

    pp: z.union([z.string(), z.number()]).transform((val) => {
      const n = Number(val);
      if (isNaN(n) || n <= 0) throw new Error("pp must be a positive number");
      return n;
    }),

    effect: z.string().optional().default(""),

    probability: z.union([z.string(), z.number(), z.null(), z.undefined()]).transform((val) => {
      if (val === "—" || val === undefined) return null;
      const n = Number(val);
      if (isNaN(n) || n < 0 || n > 100) throw new Error("probability must be between 0 and 100");
      return n;
    }),
  });

  private constructor(
    public readonly name: string,
    public readonly type: PokemonType,
    public readonly category: MoveCategory,
    public readonly power: number,
    public readonly accuracy: number,
    public readonly pp: number,
    public readonly effect: string,
    public readonly probability: number | null,
  ) {}

  static create(props: any): [string | undefined, CreateMoveDto?] {

    const result = this.schema.safeParse(props);

    if (!result.success) {
      return [result.error.issues[0]?.message];
    }

    const { name, type, category, power, accuracy, pp, effect, probability } = result.data;

    return [
      undefined,
      new CreateMoveDto(name, type, category, power, accuracy, pp, effect, probability)
    ];
  }
}