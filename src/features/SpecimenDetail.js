import React from 'react';
import { FirestoreDocument } from 'react-firestore';
import Identification from './detail/Identification';
import Locality from './detail/Locality';
import DetailGrid from './detail/layout/DetailGrid';
import DetailColumn from './detail/layout/DetailColumn';
import DetailItem from './detail/layout/DetailItem';
import Placeholder from './detail/Placeholder';

const SpecimenDetail = props => {
  const createDetails = data => (
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
        <DetailItem title="Extra Details">
          <Placeholder data={data} />
        </DetailItem>
        <DetailItem>
          <Placeholder data={data} />
        </DetailItem>
      </DetailColumn>
    </DetailGrid>
  );

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
