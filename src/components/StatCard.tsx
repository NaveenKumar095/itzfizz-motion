type StatCardProps = { value: string; label: string; detail: string };

export function StatCard({ value, label, detail }: StatCardProps) {
  return (
    <article className="stat-card">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
      <p className="stat-detail">{detail}</p>
    </article>
  );
}
