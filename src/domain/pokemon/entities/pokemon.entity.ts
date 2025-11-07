import { Move } from "./move.entity";


export class Pokemon {

  constructor(
    public readonly id: number,
    public level: number,
    public name: string,
    public type: string, 
    public currentHP: number,
    public totalHP: number,
    public baseAttack: number,
    public baseDefense: number,
    public baseSpecialAttack: number,
    public baseSpecialDefense: number,
    public baseSpeed: number,
    public moves: Move[] = [],
  ) {}
}