import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Timer extends Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    const oneSecond = 1000;
    setInterval(this.decreaseTimer, oneSecond);
  }

  decreaseTimer = () => {
    const { playing, changePlaying } = this.props;
    const { timer } = this.state;
    if (timer > 0 && playing) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
    if (timer === 0 && playing) {
      changePlaying();
      clearInterval();
    }
  };

  render() {
    const { timer } = this.state;
    return (
      <div>
        Tempo:
        {' '}
        {timer}
        {' '}
        segundos
      </div>
    );
  }
}

Timer.propTypes = {
  playing: PropTypes.bool,
  changePlaying: PropTypes.func,
}.isRequired;
