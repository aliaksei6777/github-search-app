import React, {useState} from 'react';
import Routes, {PATH} from "../components/Routes/Routes";
import {Header} from "../components/Header/Header";
import {getRepoDataTC, getUserDataTC} from "./profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";
import {useHistory} from 'react-router-dom';

function App() {
    const [value, setValue] = useState("")

    const appStatus = useSelector<RootStateType, string>((state) => state.app.status)
    const history = useHistory()
    const dispatch = useDispatch()

    const fetchData = () => {
        const trimValue = value.trim()
        if (trimValue) {
            dispatch(getRepoDataTC(value, 1))
            dispatch(getUserDataTC(value))
            setValue('')
        }
    }
    if (appStatus === 'succeeded') {
        history.push(PATH.PROFILE);
    }
    if (appStatus === 'idle') {
        history.push(PATH.MAIN);
    }
    return (
        <div>
            <Header callback={fetchData} inputValue={value} onChangeInput={setValue}/>
            <Routes/>
        </div>
    );
}

export default App;

