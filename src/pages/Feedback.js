import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
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
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (user) => ({
  assertions: user.assertions,
  score: user.score,
});

export default connect(mapStateToProps)(Feedback);
