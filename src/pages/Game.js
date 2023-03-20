import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { API_GAME } from '../services/APIPlayer';
import './game.css';

export default class Game extends Component {
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
      // console.log(allQuestions);
      const num = 0.5;
      question.sortQuestions = allQuestions.sort(() => num - Math.random());
      return question;
    });
    this.setState({ questions });
  }

  classValidation = (e) => {
    if (e) {
      return 'correct';
    }
    return 'incorrect';
  };

  changeClass = () => {
    this.setState({ response: true });
  };

  render() {
    const { questions, response } = this.state;
    return (
      <>
        <Header />
        <main>
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
                    onClick={ () => this.changeClass(sortQuestion === question
                      .correct_answer) }
                  >
                    {sortQuestion}

                  </button>
                ))}
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
}.isRequired;
