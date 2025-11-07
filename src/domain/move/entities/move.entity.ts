import { MoveCategory } from "../../shared/enums/move-category.enum";
import { PokemonType } from "../../shared/enums/pokemon-type.enum";

export class Move {

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type: PokemonType,      
    public readonly category: MoveCategory,
    public readonly power: number,
    public readonly accuracy: number,
    public readonly pp: number,
    public readonly effect: string,
    public readonly probability: number | null,
  ) {}

  static fromObject(object: { [key: string]: any }): Move {

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
    } = object;

    if (!id) throw 'Move id is required';
    if (!name) throw 'Move name is required';
    if (!type) throw 'Move type is required';
    if (!category) throw 'Move category is required';

    const enumType = String(type) as keyof PokemonType;
    if (!(enumType in PokemonType)) throw `Move type '${type}' is not valid`;

    const enumCategory = String(category) as keyof MoveCategory;
    if (!(enumCategory in MoveCategory)) throw `Move category '${category}' is not valid`;

    const parsedPower = Number(power);
    if (isNaN(parsedPower)) throw 'Move power must be a valid number';

    const parsedAccuracy = Number(accuracy);
    if (isNaN(parsedAccuracy)) throw 'Move accuracy must be a valid number';

    const parsedPp = Number(pp);
    if (isNaN(parsedPp)) throw 'Move pp must be a valid number';

    const parsedProbability =
      probability === null || probability === undefined ? null : Number(probability);

    if (parsedProbability !== null && isNaN(parsedProbability)) {
      throw 'Move probability must be a number or null';
    }

    return new Move(
      Number(id),
      name,
      type,
      category,
      parsedPower,
      parsedAccuracy,
      parsedPp,
      effect ?? '',
      parsedProbability
    );
  }
}