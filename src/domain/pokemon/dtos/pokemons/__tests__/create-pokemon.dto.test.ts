import { CreatePokemonDto } from '../create-pokemon.dto';
import { PokemonType } from '../../../../shared/enums/pokemon-type.enum';

describe('CreatePokemonDto', () => {
  const validPokemonData = {
    name: 'Pikachu',
    level: 25,
    type: PokemonType.Electric,
    totalHp: 100,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
  };

  describe('create', () => {
    it('should create a valid DTO with correct data', () => {
      const [error, dto] = CreatePokemonDto.create(validPokemonData);

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto?.name).toBe('Pikachu');
      expect(dto?.level).toBe(25);
      expect(dto?.type).toBe(PokemonType.Electric);
      expect(dto?.totalHp).toBe(100);
      expect(dto?.currentHp).toBe(100); // Should default to totalHp
    });

    it('should set currentHp to totalHp when not provided', () => {
      const [error, dto] = CreatePokemonDto.create(validPokemonData);

      expect(error).toBeUndefined();
      expect(dto?.currentHp).toBe(dto?.totalHp);
    });

    it('should accept custom currentHp when provided', () => {
      const [error, dto] = CreatePokemonDto.create({
        ...validPokemonData,
        currentHp: 75,
      });

      expect(error).toBeUndefined();
      expect(dto?.currentHp).toBe(75);
    });

    it('should return error when currentHp is greater than totalHp', () => {
      expect(() => {
        CreatePokemonDto.create({
          ...validPokemonData,
          currentHp: 150,
          totalHp: 100,
        });
      }).toThrow('currentHp must be between 0 and totalHp');
    });

    it('should return error when currentHp is negative', () => {
      expect(() => {
        CreatePokemonDto.create({
          ...validPokemonData,
          currentHp: -10,
        });
      }).toThrow('currentHp must be between 0 and totalHp');
    });

    it('should return error when name is empty', () => {
      const [error, dto] = CreatePokemonDto.create({
        ...validPokemonData,
        name: '',
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when level is not positive', () => {
      const [error, dto] = CreatePokemonDto.create({
        ...validPokemonData,
        level: 0,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when type is invalid', () => {
      const [error, dto] = CreatePokemonDto.create({
        ...validPokemonData,
        type: 'invalid' as PokemonType,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when totalHp is not positive', () => {
      const [error, dto] = CreatePokemonDto.create({
        ...validPokemonData,
        totalHp: 0,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should accept moveIds array', () => {
      const [error, dto] = CreatePokemonDto.create({
        ...validPokemonData,
        moveIds: [1, 2, 3],
      });

      expect(error).toBeUndefined();
      expect(dto?.moveIds).toEqual([1, 2, 3]);
    });

    it('should default moveIds to empty array', () => {
      const [error, dto] = CreatePokemonDto.create(validPokemonData);

      expect(error).toBeUndefined();
      expect(dto?.moveIds).toEqual([]);
    });
  });
});

