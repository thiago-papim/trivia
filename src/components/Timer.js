import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playingAction, timerAction } from '../redux/actions';

// FEITO POR MATEUS E EDUARDO
class Timer extends Component {
  componentDidMount() {
    const oneSecond = 1000;
    setInterval(this.decreaseTimer, oneSecond);
  }

  decreaseTimer = () => {
    const { playing, dispatch, timer } = this.props;
    if (timer > 0 && playing) {
      dispatch(timerAction());
    }
    if (timer === 0 && playing) {
      dispatch(playingAction());
      clearInterval();
    }
  };

  render() {
    const { timer } = this.props;
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
  timer: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  playing: state.player.playing,
  timer: state.player.timer,
});

export default connect(mapStateToProps)(Timer);
