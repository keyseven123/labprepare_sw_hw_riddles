import React from 'react';
import Grid from '@material-ui/core/Grid';

const AnswerSection = () => {
    return (
        <Grid item xs={12} md={8} lg={4}>
            <form>
                <label>
                    Answer:
                    <input type="text" name="Answer" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </Grid>
    );
}

export default AnswerSection;