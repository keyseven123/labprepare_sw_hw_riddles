import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {store} from "../state/store"
import AnswerSection from '../components/AnswerSection'
import useStyles from '../styles';

const Explanation = () => {
    const classes = useStyles();
    let output;

    if(store.getState().quiz.task !== "")
    {      
        output = store.getState().quiz.task.explanation.map((elem, index) =>
            <div key={index}> {elem.name} </div>
        )
    }
    else{
        output = <div>Select Task first</div>
    }
    
    return (
        <React.Fragment>
            <AnswerSection />
            <Grid item xs={12}>
                <Paper variant='outlined' className={classes.paperCenterText}>
                    {output}
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default Explanation;