import type { ComponentType } from 'react';
export type CaseEntry = { title: string; Component: ComponentType };
let registry: Record<string, CaseEntry> = {};
export const setCases = (r: Record<string, CaseEntry>) => { registry = r; };
export const getCase = (slug: string): CaseEntry | undefined => registry[slug];
