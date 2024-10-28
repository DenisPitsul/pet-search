import React, { useEffect, useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { connect } from 'react-redux';
import styles from './PetsFilters.module.sass';
import {
  changeCityFilter,
  changeIsFoundFilter,
  changePage,
  changePetTypeFilter,
  changeSort,
  getPetTypesThunk,
  resetFilters,
} from '../../store/slices/petsSlice';
import CONSTANTS from '../../constants';

function SideBar ({
  petTypes,
  page,
  filter,
  sort,
  totalPages,
  getPetTypes,
  changePetType,
  changeCity,
  changeIsFound,
  updateSort,
  updatePage,
  resetFiltersFromStore,
}) {
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);

  useEffect(() => {
    getPetTypes();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setIsPrevBtnDisabled(true);
    } else {
      setIsPrevBtnDisabled(false);
    }
    if (page === totalPages) {
      setIsNextBtnDisabled(true);
    } else {
      setIsNextBtnDisabled(false);
    }
  }, [page, totalPages]);

  return (
    <section className={styles.sideBar}>
      <div className={styles.sideBarContainer}>
        <h2 className={styles.sideBarTitle}>--- Filters ---</h2>
        <label className={styles.sideBarItem}>
          <span className={styles.sideBarCaption}>Type:</span>
          <select
            className={styles.select}
            onChange={e => changePetType(e.target.value)}
            value={filter.petType}
          >
            <option value='all'>All</option>
            {petTypes.map(pt => (
              <option key={pt.id} value={pt.id}>
                {pt.type}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.sideBarItem}>
          <span className={styles.sideBarCaption}>City:</span>
          <select
            className={styles.select}
            onChange={e => changeCity(e.target.value)}
            value={filter.city}
          >
            <option value='all'>All</option>
            {CONSTANTS.CITIES.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.sideBarItem}>
          <span className={styles.sideBarCaption}>Is Found:</span>
          <select
            className={styles.select}
            onChange={e => changeIsFound(e.target.value)}
            value={filter.isFound}
          >
            <option value='all'>All</option>
            <option value='true'>Found</option>
            <option value='false'>Not found</option>
          </select>
        </label>
      </div>
      <div className={styles.sideBarContainer}>
        <h2 className={styles.sideBarTitle}>--- Sorting ---</h2>
        <label className={styles.sideBarItem}>
          <span className={styles.sideBarCaption}>Order by:</span>
          <select
            className={styles.select}
            onChange={e => updateSort(e.target.value)}
            value={sort}
          >
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
        </label>

        <button
          type='button'
          className={styles.resetFilterBtn}
          onClick={() => resetFiltersFromStore()}
        >
          Reset filters
        </button>
      </div>
      <div className={styles.sideBarContainer}>
        <h2 className={styles.sideBarTitle}>--- Pagination ---</h2>
        <div className={styles.sideBarItem}>
          <button
            type='button'
            disabled={isPrevBtnDisabled}
            className={styles.paginationBtn}
            onClick={() => updatePage(page - 1)}
          >
            <GrPrevious className={styles.paginationIcon} />
          </button>
          <button
            type='button'
            disabled={isNextBtnDisabled}
            className={styles.paginationBtn}
            onClick={() => updatePage(page + 1)}
          >
            <GrNext className={styles.paginationIcon} />
          </button>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = ({ petsData }) => ({
  petTypes: petsData.petTypes,
  filter: petsData.filter,
  sort: petsData.sort,
  page: petsData.page,
  totalPages: petsData.totalPages,
});

const mapDispatchToProps = dispatch => ({
  getPetTypes: () => dispatch(getPetTypesThunk()),
  changePetType: value => dispatch(changePetTypeFilter(value)),
  changeCity: value => dispatch(changeCityFilter(value)),
  changeIsFound: value => dispatch(changeIsFoundFilter(value)),
  updateSort: value => dispatch(changeSort(value)),
  updatePage: value => dispatch(changePage(value)),
  resetFiltersFromStore: () => dispatch(resetFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
