import { useContext } from 'react';
import SettingsContext from '../Context/SettingsContext';
import ReactSlider from "react-slider";
import './../slider.css';

const createBreakArray = (smallBreakVal, bigBreakVal, roundsVal) => {
    const array = Array(roundsVal-1).fill(smallBreakVal);
    array.push(bigBreakVal);

    return array;
}

const Settings = () => {

    const timeDataContext = useContext(SettingsContext);
    const timeData = timeDataContext.settings;
    const timeDataSetSettings = timeDataContext.setSettings;

    return (
        <div className='settings'>
        <h1 className="heading">Settings</h1>
        <div style={{"textAlign" : "left"}}>
            
            <div className="slider__info">
                <h2 className="info__heading">Number of Rounds: {timeData.rounds}</h2>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={timeData.rounds}
                    onChange={newValue => timeDataSetSettings({...timeData, rounds: newValue, break: createBreakArray(timeData.break[0], timeData.break.slice(-1)[0], newValue)})}
                    min={1}
                    max={10}
                    // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                />
            </div>
            <div className="slider__info">
                <h2 className="info__heading">Work Duration: {timeData.round.workTime} min</h2>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={timeData.round.workTime}
                    onChange={newValue => timeDataSetSettings({...timeData, round: { workTime: newValue }})}
                    min={5}
                    max={120}
                />
            </div>
            <div className="slider__info">
                <h2 className="info__heading">Break Duration: {timeData.break[0]} min</h2>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={timeData.break[0]}
                    onChange={newValue => timeDataSetSettings({...timeData, break: createBreakArray(newValue, timeData.break.slice(-1)[0], timeData.rounds)})}
                    min={1}
                    max={30}
                />
            </div>
            <div className="slider__info">
                <h2 className="info__heading">Bigger Break Duration: {timeData.break.slice(-1)[0]} min</h2>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={timeData.break.slice(-1)[0]}
                    onChange={newValue => timeDataSetSettings({...timeData, break: createBreakArray(timeData.break[0], newValue, timeData.rounds)})}
                    min={15}
                    max={45}
                />
            </div>
        </div>
        </div>
    )
}

export default Settings;