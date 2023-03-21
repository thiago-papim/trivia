import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { API_GAME } from '../services/APIPlayer';
import Timer from '../components/Timer';
import { assertionAction, newTimer, playingAction, scoreAction } from '../redux/actions';
import styles from './Game.module.css';
import Button from '../components/Button';

class Game extends Component {
  state = {
    questions: [],
    response: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const errorCode = 3;
    const token = localStorage.getItem('token');
    const data = await API_GAME(token);
    if (data.response_code === errorCode) {
      localStorage.clear();
      history.push('/');
    }
    const questions = data.results.map((question, i) => {
      if (i === 0) {
        question.show = true;
      } else {
        question.show = false;
      }
      const allQuestions = [question.correct_answer, ...question.incorrect_answers];
      const num = 0.5;
      question.sortQuestions = allQuestions.sort(() => num - Math.random());
      return question;
    });
    this.setState({ questions });
  }

  handleAnswer = (answer) => {
    const { dispatch, timer } = this.props;
    const { questions } = this.state;
    dispatch(playingAction());
    const answerData = questions.find(({ sortQuestions }) => (sortQuestions
      .find((question) => question === answer)));
    if (answerData.correct_answer === answer) {
      const { difficulty } = answerData;
      const result = this.calculateScore(timer, difficulty);
      dispatch(scoreAction(result));
      dispatch(assertionAction());
    }
  };

  calculateScore = (timer, difficulty) => {
    const difficultyScores = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const baseScore = 10;
    console.log(timer, difficulty, baseScore, difficultyScores[difficulty]);
    return baseScore + (timer * difficultyScores[difficulty]);
  };

  classValidation = (e) => {
    if (e) {
      return styles.correct;
    }
    return styles.incorrect;
  };

  changeClass = () => {
    this.setState({ response: true });
  };

  nextQuestion = (question, index, arrQuestions) => {
    const { history, dispatch } = this.props;
    dispatch(newTimer());
    dispatch(playingAction());
    this.setState({ response: false });
    if (index === arrQuestions.length - 1) {
      this.createRanking();
      history.push('/feedback');
    } else {
      question.show = false;
      arrQuestions[index + 1].show = true;
    }
  };

  createRanking = () => {
    const { score, name, gravatarEmail } = this.props;
    const player = {
      playerImage: gravatarEmail,
      score,
      name,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      localStorage
        .setItem('ranking', JSON.stringify([...ranking, player]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([player]));
    }
  };

  render() {
    const { questions, response } = this.state;
    const { timer } = this.props;
    return (
      <>
        <Header />
        <main>
          {questions.map((question, i) => question.show && (
            <div key={ i } className={ styles.container }>
              <div className={ styles.questions }>
                <div
                  data-testid="question-category"
                  className={ styles.category }
                >
                  {question.category}
                </div>
                <div data-testid="question-text">{question.question}</div>
                <div className={ styles.timer }><Timer /></div>
              </div>
              <div data-testid="answer-options" className={ styles.options }>
                {question.sortQuestions.map((sortQuestion, index) => (
                  <button
                    key={ index }
                    className={ response ? this.classValidation(sortQuestion === question
                      .correct_answer) : '' }
                    data-testid={
                      `${sortQuestion === question.correct_answer
                        ? 'correct-answer' : `wrong-answer-${index}`}`
                    }
                    onClick={ () => {
                      this.handleAnswer(sortQuestion);
                      this.changeClass(sortQuestion === question
                        .correct_answer);
                    } }
                    disabled={ response || timer === 0 }
                  >
                    {sortQuestion}
                  </button>
                ))}
                { response || timer === 0 ? <Button
                  label="Next"
                  dataTest="btn-next"
                  onClick={ () => this.nextQuestion(question, i, questions) }
                /> : '' }
              </div>
            </div>
          ))}
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func,
  playing: PropTypes.bool,
  timer: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  playing: state.player.playing,
  timer: state.player.timer,
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
