import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { API_GAME } from '../services/APIPlayer';
import Timer from '../components/Timer';
import { assertionAction,
  scoreAction,
  startPlayAction,
  stopPlayAction,
} from '../redux/actions';
import './game.css';
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
    dispatch(stopPlayAction());
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
      return 'correct';
    }
    return 'incorrect';
  };

  changeClass = () => {
    this.setState({ response: true });
  };

  nextQuestion = (question, index, arrQuestions) => {
    const { history, dispatch } = this.props;
    dispatch(startPlayAction());
    this.setState({ response: false });
    question.show = false;
    if (index === arrQuestions.length - 1) {
      history.push('/feedback');
    }
    arrQuestions[index + 1].show = true;
  };

  render() {
    const { questions, response } = this.state;
    const { playing } = this.props;
    return (
      <>
        <Header />
        <main>
          <Timer />
          {questions.map((question, i) => question.show && (
            <div key={ i }>
              <div data-testid="question-category">{question.category}</div>
              <div data-testid="question-text">{question.question}</div>
              <div data-testid="answer-options">
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
                    disabled={ !playing }
                  >
                    {sortQuestion}
                  </button>
                ))}
              </div>
              { response ? <Button
                label="Next"
                dataTest="btn-next"
                onClick={ () => this.nextQuestion(question, i, questions) }
              /> : '' }
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
});

export default connect(mapStateToProps)(Game);
