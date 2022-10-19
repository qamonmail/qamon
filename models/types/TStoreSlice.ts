export type TStoreSlice<T extends object, E extends object = T> = (
  set: any,
  get: any,
) => T;
