import { Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './PetForm.module.sass';
import CONSTANTS from '../../constants';
import {
  changeStatus,
  clearError,
  createPetThunk,
  getPetTypesThunk,
} from '../../store/slices/petsSlice';
import { CREATE_PET_VALIDATION_SCHEMA } from '../../utils/validationSchemas';
import { notify } from '../../utils/notification';

function PetForm ({
  petTypes,
  status,
  getPetTypes,
  createPet,
  updateStatus,
  clearErrorFromStore,
}) {
  const [imageName, setImageName] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    owner: '',
    ownerContacts: '',
    description: '',
    lostDate: '',
    city: CONSTANTS.CITIES[0],
    petTypeId: '',
    image: '',
  };

  useEffect(() => {
    getPetTypes();
  }, []);

  useEffect(() => {
    if (status === CONSTANTS.STATUS.SUCCESS) {
      notify('Pet was added');
      navigate(`/pets`);
    } else if (status === CONSTANTS.STATUS.ERROR) {
      for (const key in error.errors) {
        notify(error.errors[key].message, CONSTANTS.STATUS.ERROR);
      }
      clearErrorFromStore();
    }
    updateStatus(CONSTANTS.STATUS.IDLE);
  }, [status]);

  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('owner', values.owner);
    formData.append('ownerContacts', values.ownerContacts);
    formData.append('description', values.description);
    formData.append('lostDate', values.lostDate);
    formData.append('city', values.city);
    formData.append('petTypeId', values.petTypeId);

    if (values.image) {
      formData.append('petImage', values.image);
    }

    createPet(formData);
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CREATE_PET_VALIDATION_SCHEMA}
    >
      {formikProps => {
        useEffect(() => {
          if (petTypes.length > 0 && !formikProps.touched.petTypeId) {
            formikProps.setFieldValue('petTypeId', petTypes[0].id);
          }
        }, [petTypes]);

        const getInputClassNames = field => {
          return classNames(styles.input, {
            [styles.valid]:
              !formikProps.errors[field] && formikProps.touched[field],
            [styles.invalid]:
              formikProps.errors[field] && formikProps.touched[field],
          });
        };
        const nameClassNames = getInputClassNames('name');
        const ownerClassNames = getInputClassNames('owner');
        const ownerContactsClassNames = getInputClassNames('ownerContacts');
        const descriptionClassNames = getInputClassNames('description');
        const lostDateClassNames = getInputClassNames('lostDate');

        return (
          <Form>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Name:</span>
              <Field
                className={nameClassNames}
                type='text'
                name='name'
                placeholder='Pets`s name'
                autoFocus
              />
              <ErrorMessage
                className={styles.error}
                name='name'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Your name:</span>
              <Field
                className={ownerClassNames}
                type='text'
                name='owner'
                placeholder='Your name'
              />
              <ErrorMessage
                className={styles.error}
                name='owner'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Your contacts:</span>
              <Field
                className={ownerContactsClassNames}
                type='text'
                name='ownerContacts'
                placeholder='+XX XXX XXX XX XX'
              />
              <ErrorMessage
                className={styles.error}
                name='ownerContacts'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Describe Your Pet:</span>
              <Field
                className={descriptionClassNames}
                type='text'
                name='description'
                placeholder='Description'
              />
              <ErrorMessage
                className={styles.error}
                name='description'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Lost Date:</span>
              <Field
                className={lostDateClassNames}
                type='date'
                name='lostDate'
              />
              <ErrorMessage
                className={styles.error}
                name='lostDate'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>City:</span>
              <Field className={styles.input} as='select' name='city'>
                {CONSTANTS.CITIES.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </Field>
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Pet type:</span>
              <Field className={styles.input} as='select' name='petTypeId'>
                {petTypes.map(pt => (
                  <option key={pt.id} value={pt.id}>
                    {pt.type}
                  </option>
                ))}
              </Field>
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Photo:</span>
              <span className={styles.uploadImageBtn}>
                {imageName ? `Uploaded: ${imageName}` : 'Upload photo'}
              </span>
              <input
                className={styles.uploadImageInput}
                type='file'
                name='image'
                accept='image/*'
                onChange={e => {
                  const file = e.target.files[0];
                  formikProps.setFieldValue('image', file);
                  setImageName(file ? file.name : null);
                }}
              />
              <ErrorMessage
                className={styles.error}
                name='image'
                component='span'
              />
            </label>
            <button className={styles.submitBtn} type='submit'>
              Add
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = ({ petsData }) => ({
  petTypes: petsData.petTypes,
  status: petsData.status,
});

const mapDispatchToProps = dispatch => ({
  getPetTypes: () => dispatch(getPetTypesThunk()),
  createPet: data => dispatch(createPetThunk(data)),
  updateStatus: data => dispatch(changeStatus(data)),
  clearErrorFromStore: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetForm);
