
import { z } from "zod";

export class ExecuteTurnDto {

    static schema = z.object({
    battleId: z.number().int().positive("battleId must be a number"),
  });

  private constructor(
    public readonly battleId: number,
  ) {}

  static create(props: any): [string | undefined, ExecuteTurnDto?] {
    const result = this.schema.safeParse({
      battleId: Number(props.battleId),
    });

    if (!result.success) {
      return [result.error.issues[0]?.message];
    }

    const { battleId } = result.data;

    return [undefined, new ExecuteTurnDto(battleId)];
  }
}