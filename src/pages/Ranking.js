import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Ranking.module.css';
import { newGame } from '../redux/actions';

import Button from '../components/Button';

class Ranking extends React.Component {
  render() {
    const { history, dispatch } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <main className={ styles.ranking }>
        <div className={ styles.logo }>
          <img src="/assets/image/logo.png" alt="logo" />
        </div>
        <div className={ styles.container }>
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className={ styles.players }>
            {ranking
              .sort((a, b) => b.score - a.score)
              .map((rank, index) => (
                <div className={ styles.player } key={ index }>
                  <img src={ rank.playerImage } alt="player" />
                  <h3 data-testid={ `player-name-${index}` }>{rank.name}</h3>
                  <p data-test-id={ `player-score-${index}` } className={ styles.score }>
                    Pontuação:
                    <span className="score">{rank.score}</span>
                  </p>
                </div>
              ))}
          </div>
          <Button
            dataTest="btn-go-home"
            label="Home"
            onClick={ () => {
              history.push('/');
              dispatch(newGame());
            } }
            styles={ styles.btn }
          />
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Ranking);
