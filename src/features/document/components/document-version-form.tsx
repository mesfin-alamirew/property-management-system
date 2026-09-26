'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

type DocumentVersionFormProps = {
  documentId: string;
  onSuccess?: () => void;
};

type DocumentVersionUploadResponse = {
  success: boolean;
  data?: {
    id: string;
  };
  message?: string;
};

export function DocumentVersionForm({
  documentId,
  onSuccess,
}: DocumentVersionFormProps) {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error('File is required');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/documents/${documentId}/versions`, {
        method: 'POST',
        body: formData,
      });

      const result = (await response.json()) as DocumentVersionUploadResponse;

      if (response.ok && result.success) {
        toast.success('Document version uploaded successfully');

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        router.refresh();

        onSuccess?.();
      } else {
        toast.error(result.message ?? 'Something went wrong');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Document File</p>

        <label
          htmlFor="document-version-file"
          className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-6 text-center transition-colors hover:bg-muted/50"
        >
          <span className="text-sm font-medium">Choose a file</span>

          <span className="mt-1 text-xs text-muted-foreground">
            PDF, DOCX, XLSX, JPG, JPEG, PNG, or WEBP
          </span>

          <span className="mt-1 text-xs text-muted-foreground">
            Maximum size: Configured by the system administrator
          </span>
        </label>

        <input
          ref={fileInputRef}
          id="document-version-file"
          type="file"
          accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png,.webp"
          disabled={isSubmitting}
          className="sr-only"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Upload New Version'}
      </Button>
    </form>
  );
}
