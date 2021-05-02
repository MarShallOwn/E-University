import react, { useState } from 'react'
import { Grid, TextField, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import QuestionRadioButton from './QuestionRadioButton';

const ChooseCorrectAnswer = props => {

    const {answers, setAnswers, correctAnswer, setCorrectAnswer} = props

    const [answer, setAnswer] = useState("")

    const handleAddAnswer = () => {
        setAnswers([...answers, answer])
        setAnswer("");
    }
    
    return(
        <Grid>
            Choose correct Answer
            Answer: <TextField value={answer} onChange={e => setAnswer(e.target.value)} />
            <button onClick={handleAddAnswer}>Add Answer</button>
            <QuestionRadioButton answers={answers} setAnswers={setAnswers} setCorrectAnswer={setCorrectAnswer} correctAnswer={correctAnswer} />
        </Grid>
    )
}

export default ChooseCorrectAnswer