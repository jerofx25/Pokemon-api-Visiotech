import { CreateMoveDto } from '../create-move.dto';
import { PokemonType } from '../../../shared/enums/pokemon-type.enum';
import { MoveCategory } from '../../../shared/enums/move-category.enum';

describe('CreateMoveDto', () => {
  const validMoveData = {
    name: 'Thunderbolt',
    type: PokemonType.Electric,
    category: MoveCategory.Special,
    power: 90,
    accuracy: 100,
    pp: 15,
    effect: '',
    probability: null,
  };

  describe('create', () => {
    it('should create a valid DTO with correct data', () => {
      const [error, dto] = CreateMoveDto.create(validMoveData);

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto?.name).toBe('Thunderbolt');
      expect(dto?.type).toBe(PokemonType.Electric);
      expect(dto?.category).toBe(MoveCategory.Special);
      expect(dto?.power).toBe(90);
      expect(dto?.accuracy).toBe(100);
      expect(dto?.pp).toBe(15);
    });

    it('should accept power as string and convert to number', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        power: '90',
      });

      expect(error).toBeUndefined();
      expect(dto?.power).toBe(90);
    });

    it('should convert "—" power to 0', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        power: '—',
      });

      expect(error).toBeUndefined();
      expect(dto?.power).toBe(0);
    });

    it('should accept accuracy as string and convert to number', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        accuracy: '95',
      });

      expect(error).toBeUndefined();
      expect(dto?.accuracy).toBe(95);
    });

    it('should convert "—" accuracy to 100', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        accuracy: '—',
      });

      expect(error).toBeUndefined();
      expect(dto?.accuracy).toBe(100);
    });

    it('should return error when accuracy is greater than 100', () => {
      expect(() => {
        CreateMoveDto.create({
          ...validMoveData,
          accuracy: 150,
        });
      }).toThrow('accuracy must be between 0 and 100');
    });

    it('should return error when accuracy is negative', () => {
      expect(() => {
        CreateMoveDto.create({
          ...validMoveData,
          accuracy: -10,
        });
      }).toThrow('accuracy must be between 0 and 100');
    });

    it('should accept pp as string and convert to number', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        pp: '20',
      });

      expect(error).toBeUndefined();
      expect(dto?.pp).toBe(20);
    });

    it('should return error when pp is not positive', () => {
      expect(() => {
        CreateMoveDto.create({
          ...validMoveData,
          pp: 0,
        });
      }).toThrow('pp must be a positive number');
    });

    it('should return error when name is empty', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        name: '',
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when type is invalid', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        type: 'invalid' as PokemonType,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should return error when category is invalid', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        category: 'invalid' as MoveCategory,
      });

      expect(error).toBeDefined();
      expect(dto).toBeUndefined();
    });

    it('should accept probability as number', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        probability: 30,
      });

      expect(error).toBeUndefined();
      expect(dto?.probability).toBe(30);
    });

    it('should convert "—" probability to null', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        probability: '—',
      });

      expect(error).toBeUndefined();
      expect(dto?.probability).toBeNull();
    });

    it('should default effect to empty string', () => {
      const [error, dto] = CreateMoveDto.create({
        ...validMoveData,
        effect: undefined,
      });

      expect(error).toBeUndefined();
      expect(dto?.effect).toBe('');
    });

    it('should return error when probability is greater than 100', () => {
      expect(() => {
        CreateMoveDto.create({
          ...validMoveData,
          probability: 150,
        });
      }).toThrow('probability must be between 0 and 100');
    });
  });
});

