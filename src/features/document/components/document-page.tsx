import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getDocumentTypes } from '../document-type/queries/document-type.queries';
import {
  getDocumentEntityOptions,
  getDocuments,
} from '../queries/document.queries';

import { DocumentWorkspace } from './document-workspace';

export async function DocumentPage() {
  const user = await requireCurrentUser();

  let documents;
  let documentTypes;
  let entityOptions;

  try {
    [documents, documentTypes, entityOptions] = await Promise.all([
      getDocuments(user.id),
      getDocumentTypes(user.id),
      getDocumentEntityOptions(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <DocumentWorkspace
      documents={documents}
      documentTypes={documentTypes}
      entityOptions={entityOptions}
    />
  );
}
