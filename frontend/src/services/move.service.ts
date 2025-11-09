import { api } from '../config/api';
import type { Move } from '../types';

export const moveService = {
  getAll: async (): Promise<Move[]> => {
    return api.get<Move[]>('/move');
  },

  getById: async (id: number): Promise<Move> => {
    return api.get<Move>(`/move/${id}`);
  },

  create: async (data: Partial<Move>): Promise<Move> => {
    return api.post<Move>('/move', data);
  },

  update: async (id: number, data: Partial<Move>): Promise<Move> => {
    return api.put<Move>(`/move/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete<void>(`/move/${id}`);
  },
};

