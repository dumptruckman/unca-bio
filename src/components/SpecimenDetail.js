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
  const { editing, specimen } = props;

  const createDetails = data => {
    const { identification, locality, collectors, attributes } = data;
    return (
      <DetailGrid>
        <DetailColumn>
          {(identification || editing) && (
            <DetailItem title="Identification">
              <Identification data={data} editing={editing} />
            </DetailItem>
          )}
          {(locality || editing) && (
            <DetailItem title="Locality and Collection Details">
              <Locality data={data} editing={editing} />
            </DetailItem>
          )}
          {collectors && (
            <DetailItem title="Collector(s)">
              <Collectors data={data} editing={editing} />
            </DetailItem>
          )}
        </DetailColumn>
        <DetailColumn>
          <DetailItem title="Extra Details">
            <Placeholder data={data} editing={editing} />
          </DetailItem>
          {(attributes || editing) && (
            <DetailItem title="Attributes">
              <Attributes data={data} editing={editing} />
            </DetailItem>
          )}
          <DetailItem>
            <Placeholder data={data} editing={editing} />
          </DetailItem>
        </DetailColumn>
      </DetailGrid>
    );
  };

  if (specimen) {
    return createDetails(specimen);
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
  editing: false,
};

export default SpecimenDetail;
