export default function PageHeader() {
  const style = {
    backgroundColor: 'royalblue',
    color: '#fff',
    marginBottom: '2rem',
    padding: '1rem',
  };

  return (
    <div style={style}>
      <h1 style={{ margin: 0 }}>Expense and income control app</h1>
    </div>
  );
}
