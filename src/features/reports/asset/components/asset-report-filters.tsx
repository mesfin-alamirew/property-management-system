'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type {
  AssetAssignmentStatus,
  AssetReportFilters,
} from '../types/asset.types';

type LookupOption = {
  id: string;
  code: string;
  name: string;
};

type AssetReportFiltersProps = {
  assetTypes: LookupOption[];
  assetCategories: LookupOption[];
  statuses: LookupOption[];
  conditions: LookupOption[];
  organizationUnits: LookupOption[];
  locations: LookupOption[];
  acquisitionMethods: LookupOption[];
  onApply: (filters: AssetReportFilters) => void;
};

export function AssetReportFilters({
  assetTypes,
  assetCategories,
  statuses,
  conditions,
  organizationUnits,
  locations,
  acquisitionMethods,
  onApply,
}: AssetReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [assetTypeId, setAssetTypeId] = useState('');
  const [assetCategoryId, setAssetCategoryId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [conditionId, setConditionId] = useState('');
  const [organizationUnitId, setOrganizationUnitId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState<
    AssetAssignmentStatus | 'ALL'
  >('ALL');
  const [acquisitionMethodId, setAcquisitionMethodId] = useState('');
  const [acquisitionDateFrom, setAcquisitionDateFrom] = useState('');
  const [acquisitionDateTo, setAcquisitionDateTo] = useState('');

  function handleApply() {
    onApply({
      search: search.trim() || undefined,
      assetTypeId: assetTypeId || undefined,
      assetCategoryId: assetCategoryId || undefined,
      statusId: statusId || undefined,
      conditionId: conditionId || undefined,
      organizationUnitId: organizationUnitId || undefined,
      locationId: locationId || undefined,
      assignmentStatus,
      acquisitionMethodId: acquisitionMethodId || undefined,
      acquisitionDateFrom: acquisitionDateFrom || undefined,
      acquisitionDateTo: acquisitionDateTo || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setAssetTypeId('');
    setAssetCategoryId('');
    setStatusId('');
    setConditionId('');
    setOrganizationUnitId('');
    setLocationId('');
    setAssignmentStatus('ALL');
    setAcquisitionMethodId('');
    setAcquisitionDateFrom('');
    setAcquisitionDateTo('');

    onApply({
      assignmentStatus: 'ALL',
    });
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="asset-report-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            id="asset-report-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Asset code, tag, name or serial"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="asset-report-type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset Type
          </label>
          <select
            id="asset-report-type"
            value={assetTypeId}
            onChange={(event) => setAssetTypeId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Asset Types</option>
            {assetTypes.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-category"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset Category
          </label>
          <select
            id="asset-report-category"
            value={assetCategoryId}
            onChange={(event) => setAssetCategoryId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Asset Categories</option>
            {assetCategories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="asset-report-status"
            value={statusId}
            onChange={(event) => setStatusId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            {statuses.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-condition"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Condition
          </label>
          <select
            id="asset-report-condition"
            value={conditionId}
            onChange={(event) => setConditionId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Conditions</option>
            {conditions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-organization-unit"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Organization Unit
          </label>
          <select
            id="asset-report-organization-unit"
            value={organizationUnitId}
            onChange={(event) => setOrganizationUnitId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Organization Units</option>
            {organizationUnits.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-location"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <select
            id="asset-report-location"
            value={locationId}
            onChange={(event) => setLocationId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Locations</option>
            {locations.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-assignment"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Assignment Status
          </label>
          <select
            id="asset-report-assignment"
            value={assignmentStatus}
            onChange={(event) =>
              setAssignmentStatus(
                event.target.value as AssetAssignmentStatus | 'ALL',
              )
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="ALL">All</option>
            <option value="CURRENT">Current</option>
            <option value="UNASSIGNED">Unassigned</option>
            <option value="RETURNED">Returned</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-acquisition-method"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Acquisition Method
          </label>
          <select
            id="asset-report-acquisition-method"
            value={acquisitionMethodId}
            onChange={(event) => setAcquisitionMethodId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Acquisition Methods</option>
            {acquisitionMethods.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} - {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="asset-report-acquisition-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Acquisition Date From
          </label>
          <input
            id="asset-report-acquisition-from"
            type="date"
            value={acquisitionDateFrom}
            onChange={(event) => setAcquisitionDateFrom(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="asset-report-acquisition-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Acquisition Date To
          </label>
          <input
            id="asset-report-acquisition-to"
            type="date"
            value={acquisitionDateTo}
            onChange={(event) => setAcquisitionDateTo(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>

        <Button type="button" variant="primary" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
