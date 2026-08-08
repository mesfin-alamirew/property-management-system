import { AppError } from '@/lib/errors';

import { findWoredas, findWoredaById } from '../repositories/woreda.repository';

import type { WoredaWithZone } from '../types/woreda.types';
import { findActiveZonesForLookup } from '@/features/zone/repositories/zone.repository';

export async function getZonesForLookup() {
  return findActiveZonesForLookup();
}

export async function getWoredas() {
  return findWoredas();
}

export async function getWoredaById(id: string): Promise<WoredaWithZone> {
  const woreda = await findWoredaById(id);

  if (!woreda) {
    throw new AppError('Woreda not found', 'NOT_FOUND');
  }

  return woreda;
}
