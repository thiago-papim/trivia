import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Gravatar extends Component {
  render() {
    const { gravatar } = this.props;
    return (
      <img
        src={ gravatar }
        alt={ gravatar }
        data-testid="header-profile-picture"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.player.gravatarEmail,
});

Gravatar.propTypes = {
  gravatar: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Gravatar);
