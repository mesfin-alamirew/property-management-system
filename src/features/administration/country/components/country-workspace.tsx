'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { Country } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateCountryAction } from '../actions/country.actions';

import { CountryDialog } from './country-dialog';
import { CountryTable } from './country-table';

type CountryWorkspaceProps = {
  countries: Country[];
};

export function CountryWorkspace({ countries }: CountryWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [countryToDeactivate, setCountryToDeactivate] =
    useState<Country | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedCountry(null);
    setIsDialogOpen(true);
  }

  function handleEdit(country: Country) {
    setSelectedCountry(country);
    setIsDialogOpen(true);
  }

  function handleDeactivate(country: Country) {
    setCountryToDeactivate(country);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!countryToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(countryToDeactivate.id);

      const result = await deactivateCountryAction(countryToDeactivate.id);

      if (result.success) {
        toast.success('Country deactivated successfully');

        setIsConfirmationOpen(false);
        setCountryToDeactivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Countries"
      description="Manage countries."
      actions={<Button onClick={handleCreate}>Add Country</Button>}
    >
      <CountryTable
        countries={countries}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <CountryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        country={selectedCountry}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Country"
        description={
          countryToDeactivate
            ? `Are you sure you want to deactivate "${countryToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
