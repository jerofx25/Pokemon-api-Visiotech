import { Move, MoveCategory } from "../entities/move.entity";

export class CreateMoveDto {

  private constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly category: MoveCategory,
    public readonly power: number,
    public readonly accuracy: number,
    public readonly pp: number,
    public readonly effect: string,
    public readonly probability: number | null,
  ) {}

  static create(props: any): [string | undefined, CreateMoveDto?] {
    let { name, type, category, power, accuracy, pp, effect, probability } = props;

    if (!name) return ['name is required'];
    if (!type) return ['type is required'];
    if (!category) return ['category is required'];

    power = (power === '—') ? 0 : Number(power);
    accuracy = (accuracy === '—') ? 100 : Number(accuracy);

    if (isNaN(power)) return ['power must be a number or —'];
    if (isNaN(accuracy)) return ['accuracy must be a number or —'];
    if (isNaN(pp) || pp <= 0) return ['pp must be a positive number'];

    probability = (probability === undefined || probability === '—')
      ? null
      : Number(probability);

    return [undefined, new CreateMoveDto(
      name, type, category, power, accuracy, Number(pp), effect ?? '', probability
    )];
  }
}