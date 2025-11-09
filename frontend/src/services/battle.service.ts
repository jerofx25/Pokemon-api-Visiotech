import { api } from '../config/api';
import type { Battle } from '../types';

export const battleService = {
  start: async (pokemonAId: number, pokemonBId: number): Promise<Battle> => {
    return api.post<Battle>('/battle/start', { pokemonAId, pokemonBId });
  },

  getById: async (id: number): Promise<Battle> => {
    return api.get<Battle>(`/battle/${id}`);
  },

  executeTurn: async (battleId: number): Promise<Battle> => {
    return api.post<Battle>(`/battle/${battleId}/turn`, {});
  },
};

