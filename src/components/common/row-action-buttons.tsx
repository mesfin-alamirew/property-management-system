import { Button } from '@/components/ui/button';

type RowActionButtonsProps = {
  onEdit?: () => void;
  onDeactivate?: () => void;

  loading?: boolean;

  showDeactivate?: boolean;
};

export function RowActionButtons({
  onEdit,
  onDeactivate,

  loading = false,

  showDeactivate = true,
}: RowActionButtonsProps) {
  return (
    <div className="flex gap-2">
      {onEdit && (
        <Button variant="secondary" onClick={onEdit} disabled={loading}>
          Edit
        </Button>
      )}

      {showDeactivate && onDeactivate && (
        <Button variant="danger" onClick={onDeactivate} disabled={loading}>
          {loading ? 'Processing...' : 'Deactivate'}
        </Button>
      )}
    </div>
  );
}
