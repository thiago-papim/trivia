import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../components/Button';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const totalAssertions = 3;
    return (
      <>
        <h1>feedback</h1>
        { assertions < totalAssertions
          ? (<p data-testid="feedback-text">Could be better...</p>)
          : (<p data-testid="feedback-text">Well Done</p>)}
        <section className="results">
          <p data-testid="feedback-total-score">{ assertions }</p>
          <p data-testid="feedback-total-question">{ score }</p>
        </section>
        <Button
          dataTest="btn-play-again"
          label="Play Again"
          onClick={ () => history.push('/') }
        />
        <Button
          dataTest="btn-ranking"
          label="Ranking"
          onClick={ () => history.push('/ranking') }
        />
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
};

const mapStateToProps = (user) => ({
  assertions: user.player.assertions,
  score: user.player.score,
});

export default connect(mapStateToProps)(Feedback);
