import Header from './Header';
import Home from './Home';
import Input from './Input';
import {Route, Routes} from 'react-router-dom';
import Tesseract from 'tesseract.js';
import './App.css';
import Tax from './Tax';
import {useState } from 'react';

function App() {

  const [dataSheet, setDataSheet] = useState([]);

  const handleImageUpload = () => {
    
    Tesseract.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png',
      'eng',
      { logger: (info) => console.log(info) }
    ).then(({ data: { text } }) => {
      console.log(text);
    });
  };

  const handleDataSheetUpdate = (newDataSheet) => {
    setDataSheet(newDataSheet);
  };


  return (
    <div className="App">
      <Header/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/input' element={<Input handleImageUpload={handleImageUpload}  handleDataSheetUpdate={handleDataSheetUpdate}/>}/>
            <Route path='/tax' element={<Tax  dataSheet={dataSheet}/>} />
          </Routes>
    </div>
  );
}

export default App;
