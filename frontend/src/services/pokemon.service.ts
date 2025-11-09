import { api } from '../config/api';
import type { Pokemon } from '../types';

export const pokemonService = {
  getAll: async (): Promise<Pokemon[]> => {
    return api.get<Pokemon[]>('/pokemon');
  },

  getById: async (id: number): Promise<Pokemon> => {
    return api.get<Pokemon>(`/pokemon/${id}`);
  },

  create: async (data: Partial<Pokemon>): Promise<Pokemon> => {
    return api.post<Pokemon>('/pokemon', data);
  },

  update: async (id: number, data: Partial<Pokemon>): Promise<Pokemon> => {
    return api.put<Pokemon>(`/pokemon/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete<void>(`/pokemon/${id}`);
  },

  assignMoves: async (pokemonId: number, moveIds: number[]): Promise<Pokemon> => {
    return api.post<Pokemon>(`/pokemon/${pokemonId}/moves`, { moveIds });
  },

  getMoves: async (pokemonId: number): Promise<any[]> => {
    return api.get<any[]>(`/pokemon/${pokemonId}/moves`);
  },

  getPossibleMoves: async (pokemonId: number): Promise<any[]> => {
    return api.get<any[]>(`/pokemon/${pokemonId}/moves/possible`);
  },

  removeMove: async (pokemonId: number, moveId: number): Promise<void> => {
    return api.delete<void>(`/pokemon/${pokemonId}/moves/${moveId}`);
  },
};

