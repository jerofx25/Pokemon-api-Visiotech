
export type MoveCategory = 'physical' | 'special' | 'status';

export class Move {

  constructor(
    public readonly name: string,
    public readonly type: string,      
    public readonly category: MoveCategory,
    public readonly power: number,
    public readonly accuracy: number,
    public readonly pp: number,
    public readonly effect: string,
    public readonly probability: number | null,
  ) {}

}