type StatusBadgeProps = {
  active: boolean;
};

export function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        active
          ? 'bg-success-surface text-success'
          : 'bg-danger-surface text-danger',
      ].join(' ')}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}
