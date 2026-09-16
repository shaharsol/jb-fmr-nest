export const TOKEN_EVENTS_CLIENT = 'TOKEN_EVENTS_CLIENT';

/** Fire-and-forget event when a symbol is followed for the first time (any user). */
export const DISTINCT_TOKEN_EVENT = 'token.distinct';

export type DistinctTokenEvent = {
  symbol: string;
};
