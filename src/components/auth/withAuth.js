import React from 'react';
import FirebaseAuth from './FirebaseAuth';

export const withAuth = WrappedComponent =>
  class WithAuth extends React.Component {
    render() {
      return (
        <FirebaseAuth>{value => <WrappedComponent auth={value} {...this.props} />}</FirebaseAuth>
      );
    }
  };
