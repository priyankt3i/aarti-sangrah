import { Aarti } from '../types';

const aartiModules: Record<string, { default?: Aarti } | Aarti> = import.meta.glob('./aartis/*.json', { eager: true });

export const aartis: Aarti[] = Object.values(aartiModules).map(
  (module) => ((module as { default?: Aarti }).default || module) as Aarti
);
