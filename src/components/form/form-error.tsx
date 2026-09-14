type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="text-sm text-danger" role="alert">
      {message}
    </p>
  );
}
