import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AnswerSection from '../components/AnswerSection'
import useStyles from '../styles';

const Task = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AnswerSection />
            <Grid item xs={12}>
                <Paper variant='outlined' className={classes.paperCenterText}>
                    <h1>Task</h1>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default Task;