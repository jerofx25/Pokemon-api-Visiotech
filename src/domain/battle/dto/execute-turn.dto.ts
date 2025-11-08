
export class ExecuteTurnDto {

  private constructor(
    public readonly battleId: number,
  ) {}

  static create(props: any): [string | undefined, ExecuteTurnDto?] {
    const { battleId } = props;

    if (!battleId || isNaN(battleId))
      return ['battleId must be a number'];

    return [undefined, new ExecuteTurnDto(Number(battleId))];
  }
}