import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../../redux/actions';
import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './Feedback.module.css';
import Gravatar from '../../components/Gravatar';

class Feedback extends React.Component {
  render() {
    const { dispatch, assertions, score, history } = this.props;
    const totalAssertions = 3;
    return (
      <>
        <Header />
        <main className={ styles.feedback }>
          <div className={ styles.logo }>
            <img src="/assets/image/logo.png" alt="logo" />
          </div>
          <div className={ styles.gravatar }>
            <Gravatar />
          </div>
          <div className={ styles.container }>
            { assertions < totalAssertions
              ? (<h2 data-testid="feedback-text">Could be better...</h2>)
              : (<h2 data-testid="feedback-text">Well Done!</h2>)}
            <section className="results">
              <span>
                Você acertou:
                {' '}
              </span>
              <span data-testid="feedback-total-question">
                { assertions }
              </span>
              <br />
              <span>
                Um total de:
                {' '}
              </span>
              <span data-testid="feedback-total-score">{score}</span>
            </section>
          </div>
          <div className={ styles.btns }>
            <Button
              dataTest="btn-play-again"
              label="Play Again"
              onClick={ () => {
                history.push('/');
                dispatch(newGame());
              } }
              styles={ `${styles.btn} ${styles.blue}` }
            />
            <Button
              dataTest="btn-ranking"
              label="Ranking"
              onClick={ () => history.push('/ranking') }
              styles={ `${styles.btn} ${styles.green}` }
            />
          </div>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (user) => ({
  assertions: user.player.assertions,
  score: user.player.score,
});

export default connect(mapStateToProps)(Feedback);
