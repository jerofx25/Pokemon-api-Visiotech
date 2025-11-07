import { Move, MoveCategory } from "../entities/move.entity";

export class UpdateMoveDto {

  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly type?: string,
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

    const {
      id,
      name,
      type,
      category,
      power,
      accuracy,
      pp,
      effect,
      probability
    } = props;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      return ['id must be a valid number', undefined];
    }

    // Validate numeric fields when present
    if (power !== undefined && (isNaN(Number(power)) || Number(power) < 0)) {
      return ['power must be a non-negative number', undefined];
    }

    if (accuracy !== undefined && (isNaN(Number(accuracy)) || Number(accuracy) < 0 || Number(accuracy) > 100)) {
      return ['accuracy must be between 0 and 100', undefined];
    }

    if (pp !== undefined && (isNaN(Number(pp)) || Number(pp) <= 0)) {
      return ['pp must be a positive number', undefined];
    }

    let normalizedProbability: number | null | undefined = probability;

    if (probability !== undefined && probability !== null) {
      normalizedProbability = Number(probability);
      if (isNaN(normalizedProbability) || normalizedProbability < 0 || normalizedProbability > 100) {
        return ['probability must be a number between 0 and 100', undefined];
      }
    }

    return [
      undefined,
      new UpdateMoveDto(
        Number(id),
        name,
        type,
        category,
        power !== undefined ? Number(power) : undefined,
        accuracy !== undefined ? Number(accuracy) : undefined,
        pp !== undefined ? Number(pp) : undefined,
        effect,
        normalizedProbability,
      )
    ];
  }
}