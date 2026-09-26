'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  documentSchema,
  type DocumentFormData,
} from '../schemas/document.schema';

import { updateDocumentAction } from '../actions/document.actions';

import {
  DOCUMENT_ENTITY_TYPES,
  type DocumentEntityType,
  DocumentRecord,
  DocumentTypeRecord,
} from '../document-type/types/document.types';

import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

type DocumentEntityOption = {
  id: string;
  label: string;
};

type DocumentFormProps = {
  document?: DocumentRecord | null;

  documentTypes: DocumentTypeRecord[];

  entityOptions: Record<DocumentEntityType, DocumentEntityOption[]>;

  onSuccess?: () => void;
};

type DocumentUploadResponse = {
  success: boolean;
  data?: {
    id: string;
  };
  message?: string;
};

export function DocumentForm({
  document,
  documentTypes,
  entityOptions,
  onSuccess,
}: DocumentFormProps) {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof documentSchema>,
    unknown,
    z.output<typeof documentSchema>
  >({
    resolver: zodResolver(documentSchema),

    defaultValues: {
      documentTypeId: document?.documentTypeId ?? '',
      entityType: document?.entityType ?? 'ASSET',
      entityId: document?.entityId ?? '',
      title: document?.title ?? '',
      description: document?.description ?? '',
    },
  });

  const selectedEntityType = useWatch({
    control,
    name: 'entityType',
  });

  const availableEntityOptions = entityOptions[selectedEntityType] ?? [];

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(file);
  }

  async function uploadDocument(
    data: DocumentFormData,
    file: File,
  ): Promise<DocumentUploadResponse> {
    const formData = new FormData();

    formData.append('documentTypeId', data.documentTypeId);
    formData.append('entityType', data.entityType);
    formData.append('entityId', data.entityId);
    formData.append('title', data.title);

    if (data.description) {
      formData.append('description', data.description);
    }

    formData.append('file', file);

    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData,
    });

    const result = (await response.json()) as DocumentUploadResponse;

    if (!response.ok) {
      return {
        success: false,
        message: result.message ?? 'Something went wrong',
      };
    }

    return result;
  }

  async function onSubmit(data: DocumentFormData) {
    if (document) {
      const result = await updateDocumentAction(document.id, data);

      if (result.success) {
        toast.success('Document updated successfully');

        reset();

        router.refresh();

        onSuccess?.();
      } else {
        toast.error(result.message);
      }

      return;
    }

    if (!selectedFile) {
      toast.error('Document file is required');
      return;
    }

    const result = await uploadDocument(data, selectedFile);

    if (result.success) {
      toast.success('Document created successfully');

      reset();
      setSelectedFile(null);

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message ?? 'Something went wrong');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Document Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Define the document type, title, and description.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Document Type"
            required
            options={documentTypes.map((documentType) => ({
              value: documentType.id,
              label: documentType.name,
            }))}
            placeholder="Select document type"
            error={errors.documentTypeId?.message}
            {...register('documentTypeId')}
          />

          <TextField
            label="Title"
            required
            error={errors.title?.message}
            {...register('title')}
          />
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Related Record
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Select the PMS record to which this document belongs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Entity Type"
            required
            options={DOCUMENT_ENTITY_TYPES.map((entityType) => ({
              value: entityType,
              label: entityType.replaceAll('_', ' '),
            }))}
            placeholder="Select entity type"
            error={errors.entityType?.message}
            {...register('entityType')}
          />

          <SelectField
            label="Related Record"
            required
            options={availableEntityOptions.map((option) => ({
              value: option.id,
              label: option.label,
            }))}
            placeholder="Select related record"
            error={errors.entityId?.message}
            {...register('entityId')}
          />
        </div>
      </section>

      {!document && (
        <section className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-5 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">
              Document File
            </h3>

            <p className="text-xs leading-5 text-muted-foreground">
              Upload a PDF, DOCX, XLSX, JPG, JPEG, PNG, or WEBP file. The
              maximum file size is configured by the system administrator.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="document-file"
              className="block text-sm font-medium text-foreground"
            >
              File <span className="text-danger">*</span>
            </label>

            <input
              id="document-file"
              type="file"
              accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
            />

            {selectedFile && (
              <p className="text-xs text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
        </section>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? document
              ? 'Updating Document...'
              : 'Uploading Document...'
            : document
              ? 'Update Document'
              : 'Upload Document'}
        </Button>
      </div>
    </form>
  );
}
