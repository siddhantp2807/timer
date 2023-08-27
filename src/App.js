import Timer from './Components/Timer';
import './App.css';
import SettingsState from './Context/SettingsState';
import Settings from './Components/Settings';
import { useState } from 'react';
import SettingsButton from './Components/SettingsButton';
import HomeButton from './Components/HomeButton';
import Links from './Components/Links';

function App() {

  const [showTimer, setShowTimer] = useState(true);

  const hideTimer = () => {
    setShowTimer(false);
  }

  const unhideTimer = () => {
    setShowTimer(true);
  }

  return (
    <main>
      <Links/>
      <SettingsState>
        { showTimer ? <Timer/> : <Settings/> }
        { showTimer ? <SettingsButton onClick={hideTimer}/> : <HomeButton onClick={unhideTimer} />}
      </SettingsState>
    </main>
  );
}

export default App;
