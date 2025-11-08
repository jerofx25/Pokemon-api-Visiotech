


export class StartBattleDto {

    private constructor(
        public readonly pokemonAId: number,
        public readonly pokemonBId: number,
    ) { }

    static create(props: { [key: string]: any }): [string | undefined, StartBattleDto?] {

        const { pokemonAId, pokemonBId } = props;

        if(!pokemonAId || isNaN(pokemonAId)) return ['pokemonAId is required and must be a number'];
        if(!pokemonBId || isNaN(pokemonBId)) return ['pokemonBId is required and must be a number'];

        if(pokemonAId === pokemonBId) return ['pokemonAId and pokemonBId must be different'];
        
        return [undefined, new StartBattleDto(
            Number(pokemonAId), 
            Number(pokemonBId)
        )];
    }
}