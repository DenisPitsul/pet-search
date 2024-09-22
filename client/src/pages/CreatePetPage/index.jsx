import React from 'react';
import CreatePet from '../../components/PetForm';
import styles from './CreatePetPage.module.sass';

function CreatePetPage () {
  return (
    <div className='container'>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create Pet</h1>
        <CreatePet />
      </div>
    </div>
  );
}

export default CreatePetPage;
