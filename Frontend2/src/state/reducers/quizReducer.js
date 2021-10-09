const state_struct = {
    task: {       
        key: 0,
        name: "",
        url: "",
        difficultyLevel: 0,
        completionState: "",
        explanation: 
        [
            {
                key: 0,
                contentType: "",
                name: "",
                url: ""
            }
        ],
        description: 
        [
            {
                key: 0,
                contentType: "",
                name: "",
                url: ""
            }
        ],
        hints: 
        [
            {
                key: 0,
                contentType: "",
                name: "",
                url: ""
            }
        ]
      }
}

const reducer = (state = state_struct, action) => {
    switch(action.type){
        case "TASK_SELECT":
            return {
                ...state,
                task: action.payload
            }
            /*
        case "DIFFICULTY_SELECT":
            return {
                ...state,
                difficulty: action.payload
            }*/
        default:
            return state;
    }
};

export default reducer;