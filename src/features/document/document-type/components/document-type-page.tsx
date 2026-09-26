import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getDocumentTypes } from '../queries/document-type.queries';

import { DocumentTypeWorkspace } from './document-type-workspace';

export async function DocumentTypePage() {
  const user = await requireCurrentUser();

  let documentTypes;

  try {
    documentTypes = await getDocumentTypes(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <DocumentTypeWorkspace documentTypes={documentTypes} />;
}
