import { MoveCategory } from "../entities/move.entity";


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
    if (isNaN(power) || power < 0) return ['power must be a positive number'];

    accuracy = (accuracy === '—') ? 100 : Number(accuracy);
    if (isNaN(accuracy) || accuracy < 0 || accuracy > 100)
      return ['accuracy must be between 0 and 100'];

    if (isNaN(pp) || pp <= 0) return ['pp must be a positive number'];

    probability = (probability === undefined || probability === '—')
      ? null
      : Number(probability);

    if (probability !== null && (isNaN(probability) || probability < 0 || probability > 100))
      return ['probability must be between 0 and 100'];

    return [undefined, new CreateMoveDto(
      name,
      type,
      category,
      power,
      accuracy,
      Number(pp),
      effect ?? '',
      probability,
    )];
  }
}