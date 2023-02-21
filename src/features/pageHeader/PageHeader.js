import CurrencyMenu from './CurrencyMenu';

export default function PageHeader() {
  const style = {
    backgroundColor: 'royalblue',
    color: '#fff',
    marginBottom: '2rem',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <div style={style}>
      <h1 style={{ margin: 0 }}>Expense and income control app</h1>
      <CurrencyMenu />
    </div>
  );
}
