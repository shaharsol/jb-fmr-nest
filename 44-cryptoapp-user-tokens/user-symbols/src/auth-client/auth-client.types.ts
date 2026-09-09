import { Request } from 'express';

export type AuthUser = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthenticatedRequest = Request & { user: AuthUser };
