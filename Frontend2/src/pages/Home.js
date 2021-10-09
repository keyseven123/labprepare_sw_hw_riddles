import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index"
import {store} from "../state/store"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paperCenterText: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        textAlign: 'center',
        height: '70vh',
      },
      formControl: {
        margin: theme.spacing(1),
        marginTop: 60,
        paddingTop: 60,
        minWidth: 120,
      },  
      root: {
        flexGrow: 1,
      },
      paper: {
        height: 140,
        width: 100,
      },
      control: {
        padding: theme.spacing(2),
      },
      gridx:{
          marginTop: 50
      }
}))

const Home = () => {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const {selectTask} = bindActionCreators(actionCreators, dispatch);

    const [openTaskSelector, setOpenTaskSelector] = React.useState(false);

    const handleTaskChange = (event) => {
        console.log(event.target.value);

        selectTask(event.target.value);
    };

    const handleCloseTaskSelector = () => {
        setOpenTaskSelector(false);
    };

    const handleOpenTaskSelector = () => {
        setOpenTaskSelector(true);
    };


    return (
        <Grid item xs={12}>
            <Paper variant='outlined' className={classes.paperCenterText}>

                <h1>Home</h1>
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Select Task</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openTaskSelector}
                        onClose={handleCloseTaskSelector}
                        onOpen={handleOpenTaskSelector}
                        value={store.getState().quiz.task}
                        onChange={handleTaskChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {store.getState().backend.map((elem, index) =>
                            <MenuItem key={index} value={elem}>Task {index + 1}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                
                <Grid container className={classes.gridx} spacing={9}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={10}>

                        <Grid item>
                            <Paper className={classes.paper}>
                                <h4>Task name:</h4>
                                <div>{store.getState().quiz.task.name}</div>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper className={classes.paper}>
                                <h4>Completion State:</h4>
                                <div>{store.getState().quiz.task.completionState}</div>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper className={classes.paper}>
                                <h4>Difficulty Level:</h4>
                                <div>{store.getState().quiz.task.difficultyLevel}</div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Home;