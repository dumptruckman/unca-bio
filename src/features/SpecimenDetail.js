import React from 'react';
import { FirestoreDocument } from 'react-firestore';
import Identification from './detail/Identification';
import Locality from './detail/Locality';
import DetailGrid from './detail/layout/DetailGrid';
import DetailColumn from './detail/layout/DetailColumn';
import DetailItem from './detail/layout/DetailItem';
import Placeholder from './detail/Placeholder';
import Collectors from './detail/Collectors';
import Attributes from './detail/Attributes';

const SpecimenDetail = props => {
  const createDetails = data => (
    <DetailGrid>
      <DetailColumn>
        {data.identification && (
          <DetailItem title="Identification">
            <Identification data={data} />
          </DetailItem>
        )}
        {data.locality && (
          <DetailItem title="Locality and Collection Details">
            <Locality data={data} />
          </DetailItem>
        )}
        {data.collectors && (
          <DetailItem title="Collector(s)">
            <Collectors data={data} />
          </DetailItem>
        )}
      </DetailColumn>
      <DetailColumn>
        <DetailItem title="Extra Details">
          <Placeholder data={data} />
        </DetailItem>
        {data.attributes && (
          <DetailItem title="Attributes">
            <Attributes data={data} />
          </DetailItem>
        )}
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
