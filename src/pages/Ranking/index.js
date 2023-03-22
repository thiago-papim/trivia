import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../../redux/actions';

import Button from '../../components/Button';

class Ranking extends React.Component {
  render() {
    const { history, dispatch } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="players-container">
          {ranking
            .sort((a, b) => b.score - a.score)
            .map((rank, index) => (
              <div className="players" key={ index }>
                <img src={ rank.playerImage } alt="player" />
                <h3 data-testid={ `player-name-${index}` }>{rank.name}</h3>
                <p data-test-id={ `player-score-${index}` }>
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
        />
      </>
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
