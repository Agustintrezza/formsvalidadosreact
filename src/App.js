import "./App.css";
import { Form2 } from "./components/Form2/Form2";
import {Navbar} from "./components/Navbar/Navbar";
import { createContext, useState  } from 'react';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light")

  const toogleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }
  return (
    <ThemeContext.Provider value={{theme, toogleTheme}}>
      <div className="App" id={theme}>
        <Navbar/>
        <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"} </label>
          <ReactSwitch onChange={toogleTheme} checked={theme === "dark"}/>
        </div>
        <Form2 />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;