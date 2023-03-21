import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default class Button extends Component {
  render() {
    const { label, onClick, dataTest } = this.props;
    return (
      <button
        className={ styles.btn }
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
};

Button.defaultProps = {
  onClick: () => {},
};
