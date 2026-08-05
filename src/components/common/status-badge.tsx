type StatusBadgeProps = {
  active: boolean;
};

export function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
      ].join(' ')}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}
