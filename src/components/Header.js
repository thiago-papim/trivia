import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

// FEITO POR: MATEUS E EDUARDO
class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header className={ `flex items-center justify-end p-5 ${styles.header}` }>
        <div className={ `${styles.name}` }>
          <div>
            <img
              src={ gravatarEmail }
              alt={ gravatarEmail }
              data-testid="header-profile-picture"
            />
          </div>
          <div data-testid="header-player-name">
            Nome:
            {' '}
            {name}
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img src="" alt="" />
          </div>
          <div data-testid="header-score">
            Pontos:
            {' '}
            {score}
            {' '}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => {
  const { gravatarEmail, name, score } = state;
  return { gravatarEmail, name, score };
};

export default connect(mapStateToProps)(Header);
