import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import {
  changeStatus,
  deletePetByIdThunk,
  getPetsThunk,
  updatePetByIdThunk,
} from '../../store/slices/petsSlice';
import styles from './PetsList.module.sass';
import CONSTANTS from '../../constants';
import { notify } from '../../utils/notification';

function PetsList ({
  pets,
  error,
  filter,
  status,
  sort,
  page,
  getPets,
  updatePet,
  deletePet,
  updateStatus,
}) {
  useEffect(() => {
    getPets({ ...filter, sort, page: 1 });
  }, [filter, sort]);

  useEffect(() => {
    getPets({ ...filter, sort, page });
  }, [page]);

  useEffect(() => {
    if (status === CONSTANTS.STATUS.SUCCESS) {
      getPets({ ...filter, sort, page });
    } else if (status === CONSTANTS.STATUS.ERROR) {
      for (const key in error.errors) {
        notify(error.errors[key].message, CONSTANTS.STATUS.ERROR);
      }
      clearErrorFromStore();
    }
    updateStatus(CONSTANTS.STATUS.IDLE);
  }, [status]);

  const isFoundChanged = (id, isFound) => {
    updatePet({ id, data: { isFound: !isFound } });
  };

  const onDeletePet = id => {
    deletePet(id);
  };

  console.log('pets', pets);

  return (
    <>
      {pets.length === 0 ? (
        <div className={styles.notFoundText}>No pets found</div>
      ) : (
        <ul className={styles.petsList}>
          {pets.map(
            ({
              id,
              name,
              owner,
              ownerContacts,
              city,
              petType: { type },
              isFound,
              image,
            }) => (
              <li className={styles.petItem} key={id}>
                <img className={styles.petImg} src={image} alt={name} />
                <h2 className={styles.petName}>{name}</h2>
                <p className={styles.petText}>
                  {owner}, {ownerContacts}
                </p>
                <p className={styles.petText}>City: {city}</p>
                <p className={styles.petText}>Type: {type}</p>
                <label className={styles.petIsFoundLabel}>
                  <input
                    type='checkbox'
                    className={styles.petIsFoundCheckBox}
                    value={isFound}
                    onChange={() => isFoundChanged(id, isFound)}
                  />
                  {isFound ? (
                    <ImCheckboxChecked className={styles.checkBoxIcon} />
                  ) : (
                    <ImCheckboxUnchecked className={styles.checkBoxIcon} />
                  )}
                  <span className={styles.petIsFoundCaption}>pet is found</span>
                </label>
                <div className={styles.buttonsWrapper}>
                  <button
                    className={styles.deletePetBtn}
                    onClick={() => onDeletePet(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}

const mapStateToProps = ({ petsData }) => ({
  pets: petsData.pets,
  petTypes: petsData.petTypes,
  isFetching: petsData.isFetching,
  filter: petsData.filter,
  sort: petsData.sort,
  status: petsData.status,
  page: petsData.page,
});

const mapDispatchToProps = dispatch => ({
  getPets: data => dispatch(getPetsThunk(data)),
  updatePet: data => dispatch(updatePetByIdThunk(data)),
  deletePet: data => dispatch(deletePetByIdThunk(data)),
  updateStatus: data => dispatch(changeStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetsList);
