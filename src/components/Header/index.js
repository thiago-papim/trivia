import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

// FEITO POR: MATEUS E EDUARDO
class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header className={ styles.header }>
        <div className={ styles.name }>
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
        <div className={ styles.score }>
          <div>
            <img src="/assets/image/star.png" alt="star" />
          </div>
          <div data-testid="header-score">
            {score}
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
  const { gravatarEmail, name, score } = state.player;
  return { gravatarEmail, name, score };
};

export default connect(mapStateToProps)(Header);
