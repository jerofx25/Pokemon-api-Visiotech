import { ExecuteTurn } from '../execute-turn.use-case';
import { ExecuteTurnDto } from '../../dto/execute-turn.dto';
import { BattleRepository } from '../../repository/battle.repository';
import { PokemonRepository } from '../../../pokemon/repository/pokemon.repository';
import { Battle } from '../../entities/battle.entity';
import { Pokemon } from '../../../pokemon/entities/pokemon.entity';
import { Move } from '../../../move/entities/move.entity';
import { PokemonType } from '../../../shared/enums/pokemon-type.enum';
import { MoveCategory } from '../../../shared/enums/move-category.enum';
import { BattleTurn } from '../../entities/battle-turn.entity';

describe('ExecuteTurn Use Case', () => {
  let battleRepository: jest.Mocked<BattleRepository>;
  let pokemonRepository: jest.Mocked<PokemonRepository>;
  let executeTurn: ExecuteTurn;

  const mockMove = new Move(
    1,
    'Thunderbolt',
    PokemonType.Electric,
    MoveCategory.Special,
    90,
    100,
    15,
    '',
    null
  );

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
    [mockMove]
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

  const mockBattleAfterTurn = new Battle(
    1,
    mockPokemonA,
    mockPokemonB,
    'in_progress',
    null,
    [
      new BattleTurn(
        1,
        1,
        mockPokemonA,
        mockPokemonB,
        mockMove,
        50,
        true,
        'Pikachu used Thunderbolt!'
      ),
    ]
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

    executeTurn = new ExecuteTurn(battleRepository, pokemonRepository);
  });

  describe('execute', () => {
    it('should execute a turn successfully', async () => {
      const dto = new ExecuteTurnDto(1);

      battleRepository.getBattle.mockResolvedValue(mockBattle);
      battleRepository.recordTurn.mockResolvedValue(mockBattleAfterTurn);

      const result = await executeTurn.execute(dto);

      expect(battleRepository.getBattle).toHaveBeenCalledWith(1);
      expect(battleRepository.recordTurn).toHaveBeenCalledWith(1, 1, 1);
      expect(result).toEqual(mockBattleAfterTurn);
    });

    it('should select pokemonA as attacker when turns.length is even', async () => {
      const dto = new ExecuteTurnDto(1);

      battleRepository.getBattle.mockResolvedValue(mockBattle);
      battleRepository.recordTurn.mockResolvedValue(mockBattleAfterTurn);

      await executeTurn.execute(dto);

      expect(battleRepository.recordTurn).toHaveBeenCalledWith(1, 1, 1);
    });

    it('should select pokemonB as attacker when turns.length is odd', async () => {
      const dto = new ExecuteTurnDto(1);
      const pokemonBWithMoves = new Pokemon(
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
        [mockMove]
      );
      const battleWithOneTurn = new Battle(
        1,
        mockPokemonA,
        pokemonBWithMoves,
        'in_progress',
        null,
        [
          new BattleTurn(
            1,
            1,
            mockPokemonA,
            pokemonBWithMoves,
            mockMove,
            50,
            true,
            'Turn 1'
          ),
        ]
      );

      battleRepository.getBattle.mockResolvedValue(battleWithOneTurn);
      battleRepository.recordTurn.mockResolvedValue(mockBattleAfterTurn);

      await executeTurn.execute(dto);

      expect(battleRepository.recordTurn).toHaveBeenCalledWith(1, 2, expect.any(Number));
    });

    it('should throw error when attacker has no moves', async () => {
      const dto = new ExecuteTurnDto(1);
      const pokemonWithoutMoves = new Pokemon(
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
      const battleWithoutMoves = new Battle(
        1,
        pokemonWithoutMoves,
        mockPokemonB,
        'in_progress',
        null,
        []
      );

      battleRepository.getBattle.mockResolvedValue(battleWithoutMoves);

      await expect(executeTurn.execute(dto)).rejects.toThrow(
        'Attacker has no moves'
      );

      expect(battleRepository.recordTurn).not.toHaveBeenCalled();
    });

    it('should throw error when battle is not found', async () => {
      const dto = new ExecuteTurnDto(1);

      battleRepository.getBattle.mockRejectedValue(
        new Error('Battle with id 1 not found')
      );

      await expect(executeTurn.execute(dto)).rejects.toThrow(
        'Battle with id 1 not found'
      );
    });

    it('should select a random move from attacker moves', async () => {
      const dto = new ExecuteTurnDto(1);
      const move1 = new Move(
        1,
        'Thunderbolt',
        PokemonType.Electric,
        MoveCategory.Special,
        90,
        100,
        15,
        '',
        null
      );
      const move2 = new Move(
        2,
        'Quick Attack',
        PokemonType.Normal,
        MoveCategory.Physical,
        40,
        100,
        30,
        '',
        null
      );
      const pokemonWithMultipleMoves = new Pokemon(
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
        [move1, move2]
      );
      const battleWithMultipleMoves = new Battle(
        1,
        pokemonWithMultipleMoves,
        mockPokemonB,
        'in_progress',
        null,
        []
      );

      battleRepository.getBattle.mockResolvedValue(battleWithMultipleMoves);
      battleRepository.recordTurn.mockResolvedValue(mockBattleAfterTurn);

      await executeTurn.execute(dto);

      expect(battleRepository.recordTurn).toHaveBeenCalled();
      const callArgs = battleRepository.recordTurn.mock.calls[0];
      expect([1, 2]).toContain(callArgs[2]); // moveId should be 1 or 2
    });
  });
});

