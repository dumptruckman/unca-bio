import React from 'react';
import 'react-table/react-table.css';
import { FirestoreCollection } from 'react-firestore';
import SpecimenList from './SpecimenList';

const SpecimenListDBWrapper = () => (
  <FirestoreCollection
    path="specimens"
    render={({ isLoading, data }) => <SpecimenList isLoading={isLoading} data={data} />}
  />
);

export default SpecimenListDBWrapper;
