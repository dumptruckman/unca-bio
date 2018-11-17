import React from 'react';
import { FirestoreDocument } from 'react-firestore';
import SpecimenDetail from './SpecimenDetail';

const SpecimenDetailPage = props => (
  <FirestoreDocument
    path={`specimens/${props.match.params.id}`}
    render={({ isLoading, data }) => {
      if (isLoading) {
        return <div>Loading...</div>;
      }
      return <SpecimenDetail specimen={data} />;
    }}
  />
);

SpecimenDetailPage.defaultProps = {
  editing: false,
};

export default SpecimenDetailPage;
