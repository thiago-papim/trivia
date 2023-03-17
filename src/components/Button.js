import React, { Component } from 'react';
// Button generico para uso na 15 e 16 ou mais requisitos
export default class Button extends Component {
  render() {
    const { label, onClick, dataTest } = this.props;
    return (
      <button
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
  dataTest: PropTypes.sting.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
};
