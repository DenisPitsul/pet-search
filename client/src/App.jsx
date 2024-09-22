import { Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import './App.css';
import BasePage from './pages/BasePage';
import HomePage from './pages/HomePage';
import CreatePetPage from './pages/CreatePetPage';
import PetsListPage from './pages/PetsListPage';
import Loader from './components/Loader';

function App ({ isFetching }) {
  return (
    <>
      <ToastContainer className='notification' />
      {isFetching && <Loader />}
      <Routes>
        <Route path='/' element={<BasePage />}>
          <Route index element={<HomePage />} />
          <Route path='/pet/create' element={<CreatePetPage />} />
          <Route path='/pets' element={<PetsListPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  );
}

const mapStateToProps = ({ petsData }) => ({
  isFetching: petsData.isFetching,
});

export default connect(mapStateToProps)(App);
