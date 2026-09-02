import {
  findRetirements,
  findRetirementById,
  findRetirementByReferenceNumber,
  findAssets,
  findConditions,
  findActiveUsers,
} from '../repositories/retirement.repository';

export async function getRetirements() {
  return findRetirements();
}

export async function getRetirementById(id: string) {
  return findRetirementById(id);
}

export async function getRetirementByReferenceNumber(referenceNumber: string) {
  return findRetirementByReferenceNumber(referenceNumber);
}

export async function getAssets() {
  return findAssets();
}
export async function getConditions() {
  return findConditions();
}
export async function getActiveUsers() {
  return findActiveUsers();
}
