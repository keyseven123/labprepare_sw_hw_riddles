import {combineReducers} from "redux";
import quizReducer from "./quizReducer";
import backendReducer from "./backendReducer";

const reducers = combineReducers({
    quiz: quizReducer,
    backend: backendReducer
})

export default reducers;