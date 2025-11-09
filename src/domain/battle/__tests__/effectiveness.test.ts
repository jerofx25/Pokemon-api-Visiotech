import { typeEffectiveness } from '../effectiveness';

describe('Type Effectiveness', () => {
  describe('Super effective (x2)', () => {
    it('fire should be super effective against grass', () => {
      expect(typeEffectiveness.fire?.grass).toBe(2);
    });

    it('water should be super effective against fire', () => {
      expect(typeEffectiveness.water?.fire).toBe(2);
    });

    it('electric should be super effective against water', () => {
      expect(typeEffectiveness.electric?.water).toBe(2);
    });

    it('grass should be super effective against water', () => {
      expect(typeEffectiveness.grass?.water).toBe(2);
    });
  });

  describe('Not very effective (0.5)', () => {
    it('fire should be not very effective against water', () => {
      expect(typeEffectiveness.fire?.water).toBe(0.5);
    });

    it('water should be not very effective against grass', () => {
      expect(typeEffectiveness.water?.grass).toBe(0.5);
    });

    it('electric should be not very effective against electric', () => {
      expect(typeEffectiveness.electric?.electric).toBe(0.5);
    });

    it('normal should be not very effective against rock', () => {
      expect(typeEffectiveness.normal?.rock).toBe(0.5);
    });
  });

  describe('No effect (0)', () => {
    it('normal should have no effect against ghost', () => {
      expect(typeEffectiveness.normal?.ghost).toBe(0);
    });

    it('electric should have no effect against ground', () => {
      expect(typeEffectiveness.electric?.ground).toBe(0);
    });

    it('fighting should have no effect against ghost', () => {
      expect(typeEffectiveness.fighting?.ghost).toBe(0);
    });

    it('dragon should have no effect against fairy', () => {
      expect(typeEffectiveness.dragon?.fairy).toBe(0);
    });
  });

  describe('Normal effectiveness (1)', () => {
    it('should return 1 for types not in the effectiveness table', () => {
      // Types not explicitly defined should default to 1
      const effectiveness = typeEffectiveness.normal?.normal;
      expect(effectiveness).toBeUndefined();
    });

    it('should handle missing type combinations gracefully', () => {
      const effectiveness = typeEffectiveness.fire?.normal;
      expect(effectiveness).toBeUndefined();
    });
  });

  describe('Type coverage', () => {
    it('should have effectiveness data for all major type combinations', () => {
      expect(typeEffectiveness.fire).toBeDefined();
      expect(typeEffectiveness.water).toBeDefined();
      expect(typeEffectiveness.grass).toBeDefined();
      expect(typeEffectiveness.electric).toBeDefined();
      expect(typeEffectiveness.ice).toBeDefined();
      expect(typeEffectiveness.fighting).toBeDefined();
      expect(typeEffectiveness.poison).toBeDefined();
      expect(typeEffectiveness.ground).toBeDefined();
      expect(typeEffectiveness.flying).toBeDefined();
      expect(typeEffectiveness.psychic).toBeDefined();
      expect(typeEffectiveness.bug).toBeDefined();
      expect(typeEffectiveness.rock).toBeDefined();
      expect(typeEffectiveness.ghost).toBeDefined();
      expect(typeEffectiveness.dragon).toBeDefined();
      expect(typeEffectiveness.dark).toBeDefined();
      expect(typeEffectiveness.steel).toBeDefined();
      expect(typeEffectiveness.fairy).toBeDefined();
    });
  });
});

