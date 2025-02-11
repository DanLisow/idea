export type ButtonProps = {
  loading?: boolean;
  children: React.ReactNode;
};

export const Button = ({ loading = false, children }: ButtonProps) => {
  return (
    <button type="submit" className="form-button" disabled={loading}>
      {loading ? "Отправка..." : children}
    </button>
  );
};
