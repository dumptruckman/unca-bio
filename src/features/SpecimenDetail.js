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
        {(data.identification || props.editing) && (
          <DetailItem title="Identification">
            <Identification data={data} editing={props.editing} />
          </DetailItem>
        )}
        {(data.locality || props.editing) && (
          <DetailItem title="Locality and Collection Details">
            <Locality data={data} editing={props.editing} />
          </DetailItem>
        )}
        {/*{(data.collectors || props.editing) && (*/}
        {data.collectors && (
          <DetailItem title="Collector(s)">
            <Collectors data={data} editing={props.editing} />
          </DetailItem>
        )}
      </DetailColumn>
      <DetailColumn>
        <DetailItem title="Extra Details">
          <Placeholder data={data} editing={props.editing} />
        </DetailItem>
        {(data.attributes || props.editing) && (
          <DetailItem title="Attributes">
            <Attributes data={data} editing={props.editing} />
          </DetailItem>
        )}
        <DetailItem>
          <Placeholder data={data} editing={props.editing} />
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

SpecimenDetail.defaultProps = {
  editing: true,
};

export default SpecimenDetail;
