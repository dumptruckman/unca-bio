import React from 'react';
import Identification from './Identification';
import Locality from './Locality';
import DetailGrid from './layout/DetailGrid';
import DetailColumn from './layout/DetailColumn';
import DetailItem from './layout/DetailItem';
import Placeholder from './Placeholder';
import Collectors from './Collectors';
import Attributes from './Attributes';

const SpecimenDetail = props => {
  const { editing, specimen } = props;
  const { identification, locality, collectors, attributes } = specimen;

  return (
    <DetailGrid>
      <DetailColumn>
        {(identification || editing) && (
          <DetailItem title="Identification">
            <Identification data={specimen} editing={editing} />
          </DetailItem>
        )}
        {(locality || editing) && (
          <DetailItem title="Locality and Collection Details">
            <Locality data={specimen} editing={editing} />
          </DetailItem>
        )}
        {collectors && (
          <DetailItem title="Collector(s)">
            <Collectors data={specimen} editing={editing} />
          </DetailItem>
        )}
      </DetailColumn>
      <DetailColumn>
        <DetailItem title="Extra Details">
          <Placeholder data={specimen} editing={editing} />
        </DetailItem>
        {(attributes || editing) && (
          <DetailItem title="Attributes">
            <Attributes data={specimen} editing={editing} />
          </DetailItem>
        )}
        <DetailItem>
          <Placeholder data={specimen} editing={editing} />
        </DetailItem>
      </DetailColumn>
    </DetailGrid>
  );
};

SpecimenDetail.defaultProps = {
  editing: false,
};

export default SpecimenDetail;
