import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
    render() {
       const { assertions } = this.props;
 
        return (
            <>
            <h1>feedback</h1>
            { assertions < 3 ? (<p data-testid='feedback-text'>Could be better...</p>) : (<p data-testid='feedback-text'>Well Done</p>)}
            </>
       );
    }
}

const mapStateToProps = (user) => ({
    assertions: user.assertions,
  });

export default connect(mapStateToProps)(Feedback);