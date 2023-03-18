import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { API_GAME } from '../services/APIPlayer';

export default class Game extends Component {
  state = {
    questions: [],
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
      console.log('🚀 ~ file: Game.js:27 ~ Game ~ questions ~ allQuestions:', allQuestions)
      question.sortQuestions = allQuestions.sort();
      return question;
    });
    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    return (
      <>
        <Header />
        <main>
          {questions.map((question, i) => question.show && (
            <div key={ i }>
              <div data-testid="question-category">{question.category}</div>
              <div data-testid="question-text">{question.question}</div>
              {/* <button data-testid="correct-answer">
                {question.correct_answer}
              </button>
              {question.incorrect_answers.map((incorrectQuestion, index) => (
                <button
                  data-testid={ `wrong-answer-${i}` }
                  key={ index }
                >
                  {incorrectQuestion}
                </button>
              ))} */}
              <div data-testid="answer-options">
                {question.sortQuestions.map((sortQuestion, index) => (
                  <button
                    key={ index }
                    data-testid={
                      `${sortQuestion === question.correct_answer
                        ? 'correct-answer' : `wrong-answer-${index}`}`
                    }
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
