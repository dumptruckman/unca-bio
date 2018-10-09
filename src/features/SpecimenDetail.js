import React from 'react';
import { FirestoreDocument } from 'react-firestore';
import Identification from './detail/Identification';
import Locality from './detail/Locality';
import DetailGrid from './detail/layout/DetailGrid';
import DetailColumn from './detail/layout/DetailColumn';
import DetailItem from './detail/layout/DetailItem';

const SpecimenDetail = props => {
  const createDetails = data => {
    console.log(data.locality);
    return (
      <DetailGrid>
        <DetailColumn>
          <DetailItem title="Identification">
            <Identification data={data} />
          </DetailItem>
          {data.locality && (
            <DetailItem title="Locality and Collection Details">
              <Locality data={data} />
            </DetailItem>
          )}
        </DetailColumn>
        <DetailColumn>
          {data.locality && (
            <DetailItem title="Locality and Collection Details">
              <Locality data={data} />
            </DetailItem>
          )}
          {data.locality && (
            <DetailItem>
              <Locality data={data} />
            </DetailItem>
          )}
        </DetailColumn>
      </DetailGrid>
    );
  };

  if (props.specimen) {
    return createDetails(props.specimen);
  } else {
    return (
      <FirestoreDocument
        path={`specimens/${props.match.params.id}`}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Loading...</div>;
          }
          return createDetails(data);
        }}
      />
    );
  }
};

export default SpecimenDetail;
