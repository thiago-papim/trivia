import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../components/Button';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Button
        dataTest="btn-go-home"
        label="Home"
        onClick={ () => history.push('/') }
      />
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null)(Ranking);
