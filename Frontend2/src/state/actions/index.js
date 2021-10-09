const URLX = "http://localhost:8080/v1/labprepare";

export const selectTask = (task) => {
    return (dispatch) => {
        dispatch({
            type: "TASK_SELECT",
            payload: task
        })
    }
}

/*
export const selectDifficulty = (difficulty) => {
    return (dispatch) => {
        dispatch({
            type: "DIFFICULTY_SELECT",
            payload: difficulty
        })
    }
}*/

export const safeBackendData = (struct) => {
    return (dispatch) => {
        dispatch({
            type: "INIT_QUIZ",
            payload: struct
        })
    }
}

export const initBackendData = () => {
    return (dispatch) => {
        fetch(URLX)
        .then(async response => {
            let data = await response.json();
            dispatch(safeBackendData(data));
            console.log(data);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        })
    }
}