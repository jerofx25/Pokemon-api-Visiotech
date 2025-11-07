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

  static create(props: { [key: string]: any }): [string | undefined, CreateMoveDto?] {

    let {
      name,
      type,
      category,
      power,
      accuracy,
      pp,
      effect,
      probability,
    } = props;

    // Required fields
    if (!name) return ['name is required'];
    if (!type) return ['type is required'];
    if (!category) return ['category is required'];

    // Normalize power
    power = (power === '—') ? 0 : Number(power);
    if (isNaN(power) || power < 0) return ['power must be a non-negative number or —'];

    // Normalize accuracy
    accuracy = (accuracy === '—') ? 100 : Number(accuracy);
    if (isNaN(accuracy) || accuracy < 0 || accuracy > 100)
      return ['accuracy must be between 0 and 100 or —'];

    // PP must be positive
    if (isNaN(pp) || Number(pp) <= 0)
      return ['pp must be a positive number'];

    // Normalize probability
    probability = (probability === undefined || probability === '—')
      ? null
      : Number(probability);

    if (probability !== null && (isNaN(probability) || probability < 0 || probability > 100))
      return ['probability must be between 0 and 100 or —'];

    return [
      undefined,
      new CreateMoveDto(
        name,
        type,
        category,
        Number(power),
        Number(accuracy),
        Number(pp),
        effect ?? '',
        probability,
      )
    ];
  }
}
