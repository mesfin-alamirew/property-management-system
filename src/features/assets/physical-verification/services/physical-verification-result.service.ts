import { PhysicalVerificationResult } from '@/generated/prisma/client';

import type { VerifyPhysicalVerificationItemFormData } from '../schemas/physical-verification.schema';

type ExpectedVerificationData = {
  expectedAssetTag: string | null;
  expectedSerialNumber: string | null;

  expectedEmployeeNumber: string | null;
  expectedEmployeeName: string | null;

  expectedLocationCode: string | null;
  expectedLocationName: string | null;

  expectedConditionCode: string | null;
  expectedConditionName: string | null;
};

export function determinePhysicalVerificationResult(
  expected: ExpectedVerificationData,
  observed: VerifyPhysicalVerificationItemFormData,
): PhysicalVerificationResult {
  // 1. Asset was not physically found.
  if (!observed.assetFound) {
    return PhysicalVerificationResult.NOT_FOUND;
  }

  // 2. Identification checks.
  const assetTagMismatch =
    hasExpectedValue(expected.expectedAssetTag) &&
    normalize(observed.observedAssetTag) !==
      normalize(expected.expectedAssetTag);

  const serialNumberMismatch =
    hasExpectedValue(expected.expectedSerialNumber) &&
    normalize(observed.observedSerialNumber) !==
      normalize(expected.expectedSerialNumber);

  const identificationMismatch = assetTagMismatch || serialNumberMismatch;

  // 3. Custodian check.
  const custodianMismatch =
    hasExpectedValue(expected.expectedEmployeeNumber) &&
    normalize(observed.observedEmployeeNumber) !==
      normalize(expected.expectedEmployeeNumber);

  // 4. Location check.
  const locationMismatch =
    hasExpectedValue(expected.expectedLocationCode) &&
    normalize(observed.observedLocationCode) !==
      normalize(expected.expectedLocationCode);

  // 5. Condition check.
  const conditionMismatch =
    hasExpectedValue(expected.expectedConditionCode) &&
    normalize(observed.observedConditionCode) !==
      normalize(expected.expectedConditionCode);

  // 6. Count discrepancy categories.
  const mismatchCount = [
    identificationMismatch,
    custodianMismatch,
    locationMismatch,
    conditionMismatch,
  ].filter(Boolean).length;

  // 7. Everything matches.
  if (mismatchCount === 0) {
    return PhysicalVerificationResult.VERIFIED;
  }

  // 8. More than one discrepancy category.
  if (mismatchCount > 1) {
    return PhysicalVerificationResult.MULTIPLE_DISCREPANCIES;
  }

  // 9. Exactly one discrepancy category.
  if (identificationMismatch) {
    return PhysicalVerificationResult.IDENTIFICATION_MISMATCH;
  }

  if (locationMismatch) {
    return PhysicalVerificationResult.LOCATION_MISMATCH;
  }

  if (custodianMismatch) {
    return PhysicalVerificationResult.CUSTODIAN_MISMATCH;
  }

  return PhysicalVerificationResult.CONDITION_MISMATCH;
}

function hasExpectedValue(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim() !== '';
}

function normalize(value: string | null | undefined): string {
  return value?.trim().toLowerCase() ?? '';
}
