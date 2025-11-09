
import { z } from "zod";

export class StartBattleDto {

    static schema = z.object({
        pokemonAId: z.number().int().positive("pokemonAId is required and must be a number"),
        pokemonBId: z.number().int().positive("pokemonBId is required and must be a number"),
    }).refine(
        (data) => data.pokemonAId !== data.pokemonBId,
        { message: "pokemonAId and pokemonBId must be different" }
    );

    private constructor(
        public readonly pokemonAId: number,
        public readonly pokemonBId: number,
    ) { }

    static create(props: { [key: string]: any }): [string | undefined, StartBattleDto?] {

        const result = this.schema.safeParse({
            pokemonAId: Number(props.pokemonAId),
            pokemonBId: Number(props.pokemonBId),
        });

        if (!result.success) {
        return [result.error.issues[0]?.message];
        }

        const { pokemonAId, pokemonBId } = result.data;

        return [
            undefined,
            new StartBattleDto(pokemonAId, pokemonBId)
        ];
    }
}