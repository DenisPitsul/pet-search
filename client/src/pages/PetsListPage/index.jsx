import React from 'react';
import { connect } from 'react-redux';
import PetsList from '../../components/PetsList';
import styles from './PetsListPage.module.sass';
import SideBar from '../../components/SideBar';

function PetsListPage ({ pets }) {
  return (
    <div className={`container ${styles.pageWrapper}`}>
      <SideBar />
      <PetsList />
    </div>
  );
}

const mapStateToProps = ({ petsData }) => ({
  pets: petsData.pets,
});

export default connect(mapStateToProps)(PetsListPage);
