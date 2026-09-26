'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  documentTypeSchema,
  type DocumentTypeFormData,
} from '../schemas/document-type.schema';

import {
  createDocumentTypeAction,
  updateDocumentTypeAction,
} from '../actions/document-type.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { DocumentTypeRecord } from '../types/document.types';

type DocumentTypeFormProps = {
  documentType?: DocumentTypeRecord | null;
  onSuccess?: () => void;
};

export function DocumentTypeForm({
  documentType,
  onSuccess,
}: DocumentTypeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof documentTypeSchema>,
    unknown,
    z.output<typeof documentTypeSchema>
  >({
    resolver: zodResolver(documentTypeSchema),

    defaultValues: {
      code: documentType?.code ?? '',
      name: documentType?.name ?? '',
      description: documentType?.description ?? '',
    },
  });

  async function onSubmit(data: DocumentTypeFormData) {
    const result = documentType
      ? await updateDocumentTypeAction(documentType.id, data)
      : await createDocumentTypeAction(data);

    if (result.success) {
      toast.success(
        documentType
          ? 'Document type updated successfully'
          : 'Document type created successfully',
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Document Type Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Define the code, name, and description used to identify this
            document type.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Document Type Code"
            required
            error={errors.code?.message}
            {...register('code')}
          />

          <TextField
            label="Document Type Name"
            required
            error={errors.name?.message}
            {...register('name')}
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

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? documentType
              ? 'Updating Document Type...'
              : 'Saving Document Type...'
            : documentType
              ? 'Update Document Type'
              : 'Save Document Type'}
        </Button>
      </div>
    </form>
  );
}
