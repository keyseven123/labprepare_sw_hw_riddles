import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {store} from "../state/store"

import useStyles from '../styles';

const About = () => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper variant='outlined' className={classes.paperCenterText}>
                
            </Paper>
        </Grid>
    );
}

export default About;