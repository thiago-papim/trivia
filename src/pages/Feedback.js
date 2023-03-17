import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const totalAssertions = 3;
    return (
      <>
        <h1>feedback</h1>
        { assertions < totalAssertions
          ? (<p data-testid="feedback-text">Could be better...</p>)
          : (<p data-testid="feedback-text">Well Done</p>)}
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (user) => ({
  assertions: user.assertions,
});

export default connect(mapStateToProps)(Feedback);
