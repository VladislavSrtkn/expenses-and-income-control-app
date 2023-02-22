import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function addSumForCategories(year, month, type, operations, categories) {
  const categoriesCopy = { ...categories };

  operations.forEach((operation) => {
    if (operation.type === type && operation.year === year && operation.month === month) {
      const category = operation.category;
      const amount = +operation.amount;

      categoriesCopy[category] = {
        ...categoriesCopy[category],
        value: categoriesCopy[category].value ? (categoriesCopy[category].value += amount) : amount,
      };
    }
  });

  return categoriesCopy;
}

export default function CategoriesPie({ operationsType }) {
  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;
  const operations = useSelector((state) => Object.values(state.operations.entities));
  const categories = useSelector((state) => state.categories.categories);

  const categoriesWithAmount = addSumForCategories(
    year,
    month,
    operationsType,
    operations,
    categories
  );

  const data = Object.values(categoriesWithAmount).filter((cat) => cat.value);
  const cells = data.map((cat, index) => <Cell key={index} fill={cat.color} />);

  return (
    <Grid2 item display='flex' flexDirection='column' alignItems='center'>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'
          nameKey='name'
          label='name'
          labelLine={false}
        >
          {cells}
        </Pie>
      </PieChart>
    </Grid2>
  );
}
