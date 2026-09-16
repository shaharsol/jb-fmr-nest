export const TOKEN_EVENTS_CLIENT = 'TOKEN_EVENTS_CLIENT';

/** Fire-and-forget event when a symbol is followed for the first time (any user). */
export const DISTINCT_TOKEN_EVENT = 'token.distinct';

// this is actually better implemented as a library
// i.e. published as a npm module,  (or jfrog, artifactory etc, whatever your org 
// uses to share code libraries)
export type DistinctTokenEvent = {
  symbol: string;
};
