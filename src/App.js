import Header from './Header';
import Home from './Home';
import Input from './Input';
import Profile from './Profile'
import {Route, Routes} from 'react-router-dom';
import Tesseract from 'tesseract.js';
import './App.css';
import Tax from './Tax';
import { useEffect, useState } from 'react';

function App() {

  const [incomes, setIncomes] = useState({income: 0});
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
            <Route path='/input' element={<Input incomes={incomes} handleImageUpload={handleImageUpload}  handleDataSheetUpdate={handleDataSheetUpdate}/>}/>
            <Route path='/profile' element={<Profile incomes={incomes} />}/>
            <Route path='/tax' element={<Tax  dataSheet={dataSheet}/>} />
          </Routes>
    </div>
  );
}

export default App;
