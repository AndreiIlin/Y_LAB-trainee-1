import * as modules from './exports';

export type StoreModule = typeof modules;

export type StoreModuleName = keyof StoreModule;

export type StoreCustomActionName<Name extends string> = Name | `${Name}${string}`;

export type StoreActions = {
  [Key in StoreModuleName as StoreCustomActionName<Key>]: InstanceType<StoreModule[Key]>
}

export type ModuleConfig = {
  [Key in StoreModuleName as StoreCustomActionName<Key>]: StoreActions[Key]['config'];
}

export type StoreState = {
  [Key in StoreModuleName as StoreCustomActionName<Key>]: ReturnType<StoreActions[Key]['initState']>
}

export interface StoreConfig {
  modules: ModuleConfig;
  log: boolean;
}

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
  ? I
  : never

export type AllStoreActions = UnionToIntersection<StoreActions[keyof StoreActions]>;

export type AllStoreStates = UnionToIntersection<StoreState[keyof StoreState]>;
