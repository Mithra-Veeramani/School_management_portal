function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
  description,
}) {
  return (
    <article className="summary-card">
      <div
        className="summary-card-icon"
        style={{
          backgroundColor: `${color}18`,
          color: color,
        }}
      >
        <Icon size={24} />
      </div>

      <div className="summary-card-content">
        <p className="summary-card-title">{title}</p>

        <h2 className="summary-card-value">{value}</h2>

        <p className="summary-card-description">
          {description}
        </p>
      </div>
    </article>
  );
}

export default SummaryCard;