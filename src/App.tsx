import React, { Component } from "react";
import { QUESTIONS } from "./questions";

interface AppState {
  answers: Record<number, boolean | undefined>;
  overallScore: number;
  scores: number[] | any;
  averageScore: number
}

class App extends Component<{}, AppState> {
  state: AppState = {
    answers: {},
    overallScore: 0,
    scores: [0],
    averageScore: 0
  };

  componentDidMount() {
    let allScores : any = localStorage.getItem("scores");
    let averageScore:any = 0;
    if (allScores != null && allScores.length > 0) {
      allScores = JSON.parse(allScores)
      averageScore = this.getAverageScore(allScores)
      allScores.push(0)
      this.setState({
        scores: allScores,
        averageScore
      });
    }    
  }

  handleAnswer = (questionNumber: number, answer: boolean) => {
    const { answers } = this.state;
    answers[questionNumber] = answer;
    const numYesAnswers = Object.values(answers).filter(Boolean).length;
    const numQuestions = Object.keys(QUESTIONS).length;
    const overallScore = (100 * numYesAnswers) / numQuestions;
    this.setState({ answers, overallScore });
    this.updateCurruntSessionScore(overallScore)
  };

updateCurruntSessionScore = (score: number) => {
  const { scores } = this.state;
  let temScores = [...scores]
  temScores[scores.length-1] = score
  this.setState({
    scores: [...temScores]
  });
  localStorage.setItem("scores", JSON.stringify(temScores));
}

getAverageScore = (scores:number[]) => {  
  const totalScore = scores.reduce((acc:number,curr:number) => acc+=curr)  
  return totalScore/scores.length
}

  render() {
    const { overallScore, averageScore } = this.state;
    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            TODO
          </div>

          <h4 className="score">Score: {overallScore}</h4>
          <h4 className="score">Average Score: {averageScore.toFixed(2)}</h4>

          {Object.keys(QUESTIONS).map((qNum) => (
            <div key={qNum}>
              <p>{qNum}. {QUESTIONS[parseInt(qNum)]}</p>
              <button onClick={() => this.handleAnswer(parseInt(qNum), true)}>Yes</button>
              &nbsp;
              <button onClick={() => this.handleAnswer(parseInt(qNum), false)}>No</button>
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default App;
