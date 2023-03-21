import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { label, onClick, dataTest, styles } = this.props;
    return (
      <button
        className={ styles }
        onClick={ onClick }
        data-testid={ dataTest }
      >
        { label }
      </button>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
};
