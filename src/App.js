import { useDispatch, useSelector } from 'react-redux';
import Header from './features/header/Header';
import OperationsList from './features/operations/OperationsList';
import {
  operationAdded,
  operationChanged,
  operationDeleted,
  saveNewOperation,
} from './features/operations/operationsSlice';
import PageHeader from './features/pageHeader/PageHeader';

function App() {
  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.filters.date);
  const { year, month } = filterDate;

  function addNewOperationHandler() {
    const operationObj = saveNewOperation('test', 3000, 'income', year, month);
    dispatch(operationAdded(operationObj));
  }

  function changeOperationHandler() {
    dispatch(operationChanged(0, 'new text', 322));
  }

  return (
    <div>
      <PageHeader />
      <Header />
      <OperationsList />
      <button onClick={addNewOperationHandler}>add operation</button>
      <button onClick={() => dispatch(operationDeleted(0))}>remove</button>
      <button onClick={changeOperationHandler}>change</button>
    </div>
  );
}

export default App;
