import { useState } from "react";
import SettingsContext from "./SettingsContext";


const SettingsState = (props) => {
    
    const [settings, setSettings] = useState({
        rounds: 4,
        round: {
            workTime: 20,
        },
        break: [5, 5, 5, 20]
    });

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {props.children}
        </SettingsContext.Provider>
    )

}

export default SettingsState;