import { StartBattleDto } from '../start-battle.dto';

describe('StartBattleDto', () => {
  describe('create', () => {
    it('should create a valid DTO with correct data', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonAId: 1,
        pokemonBId: 2,
      });

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto?.pokemonAId).toBe(1);
      expect(dto?.pokemonBId).toBe(2);
    });

    it('should return error when pokemonAId and pokemonBId are the same', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonAId: 1,
        pokemonBId: 1,
      });

      expect(error).toBeDefined();
      expect(error).toContain('must be different');
      expect(dto).toBeUndefined();
    });

    it('should return error when pokemonAId is not a positive number', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonAId: -1,
        pokemonBId: 2,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when pokemonBId is not a positive number', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonAId: 1,
        pokemonBId: 0,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should convert string numbers to numbers', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonAId: '1',
        pokemonBId: '2',
      });

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto?.pokemonAId).toBe(1);
      expect(dto?.pokemonBId).toBe(2);
    });

    it('should return error when pokemonAId is missing', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonBId: 2,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when pokemonBId is missing', () => {
      const [error, dto] = StartBattleDto.create({
        pokemonAId: 1,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });
  });
});

