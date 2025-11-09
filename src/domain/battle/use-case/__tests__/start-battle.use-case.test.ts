import { StartBattle } from '../start-battle.use-case';
import { StartBattleDto } from '../../dto/start-battle.dto';
import { BattleRepository } from '../../repository/battle.repository';
import { PokemonRepository } from '../../../pokemon/repository/pokemon.repository';
import { Battle } from '../../entities/battle.entity';
import { Pokemon } from '../../../pokemon/entities/pokemon.entity';
import { PokemonType } from '../../../shared/enums/pokemon-type.enum';

describe('StartBattle Use Case', () => {
  let battleRepository: jest.Mocked<BattleRepository>;
  let pokemonRepository: jest.Mocked<PokemonRepository>;
  let startBattle: StartBattle;

  const mockPokemonA = new Pokemon(
    1,
    25,
    'Pikachu',
    PokemonType.Electric,
    100,
    100,
    55,
    40,
    50,
    50,
    90,
    []
  );

  const mockPokemonB = new Pokemon(
    2,
    30,
    'Charizard',
    PokemonType.Fire,
    120,
    120,
    84,
    78,
    85,
    85,
    100,
    []
  );

  const mockBattle = new Battle(
    1,
    mockPokemonA,
    mockPokemonB,
    'in_progress',
    null,
    []
  );

  beforeEach(() => {
    battleRepository = {
      startBattle: jest.fn(),
      getBattle: jest.fn(),
      recordTurn: jest.fn(),
      finishBattle: jest.fn(),
    } as any;

    pokemonRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
      assignMoves: jest.fn(),
      removeMove: jest.fn(),
    } as any;

    startBattle = new StartBattle(battleRepository, pokemonRepository);
  });

  describe('execute', () => {
    it('should start a battle successfully', async () => {
      const dto = new StartBattleDto(1, 2);

      pokemonRepository.findById
        .mockResolvedValueOnce(mockPokemonA)
        .mockResolvedValueOnce(mockPokemonB);

      battleRepository.startBattle.mockResolvedValue(mockBattle);

      const result = await startBattle.execute(dto);

      expect(pokemonRepository.findById).toHaveBeenCalledTimes(2);
      expect(pokemonRepository.findById).toHaveBeenCalledWith(1);
      expect(pokemonRepository.findById).toHaveBeenCalledWith(2);
      expect(battleRepository.startBattle).toHaveBeenCalledWith(1, 2);
      expect(result).toEqual(mockBattle);
    });

    it('should throw error when pokemonA is not found', async () => {
      const dto = new StartBattleDto(1, 2);

      pokemonRepository.findById.mockRejectedValueOnce(
        new Error('Pokemon with id 1 not found')
      );

      await expect(startBattle.execute(dto)).rejects.toThrow(
        'Pokemon with id 1 not found'
      );

      expect(battleRepository.startBattle).not.toHaveBeenCalled();
    });

    it('should throw error when pokemonB is not found', async () => {
      const dto = new StartBattleDto(1, 2);

      pokemonRepository.findById
        .mockResolvedValueOnce(mockPokemonA)
        .mockRejectedValueOnce(new Error('Pokemon with id 2 not found'));

      await expect(startBattle.execute(dto)).rejects.toThrow(
        'Pokemon with id 2 not found'
      );

      expect(battleRepository.startBattle).not.toHaveBeenCalled();
    });

    it('should propagate errors from battleRepository', async () => {
      const dto = new StartBattleDto(1, 2);

      pokemonRepository.findById
        .mockResolvedValueOnce(mockPokemonA)
        .mockResolvedValueOnce(mockPokemonB);

      battleRepository.startBattle.mockRejectedValueOnce(
        new Error('Failed to start battle')
      );

      await expect(startBattle.execute(dto)).rejects.toThrow(
        'Failed to start battle'
      );
    });
  });
});

