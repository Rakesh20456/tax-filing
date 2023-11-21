import React, { useState} from 'react';
import Tesseract from 'tesseract.js';
import { Link } from 'react-router-dom';

const Input = ({ handleDataSheetUpdate}) => {

  const [billCount, setBillCount] = useState(0);
  const [files, setFiles] = useState([]);

  const handleBillCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setBillCount(isNaN(count) ? 0 : count);
  };

  const renderFileInputFields = () => {
    const fileInputFields = [];
    for (let i = 0; i < billCount; i++) {
      const fieldName = `billFile${i + 1}`;
      fileInputFields.push(
        <div className="inputs" key={fieldName}>
          <input
            type="file"
            name={fieldName}
            placeholder={`Bill File ${i + 1}`}
            onChange={(e) => handleInputChange(e, fieldName)}
          />
        </div>
      );
    }
    return fileInputFields;
  };

  const handleInputChange = (e, fieldName) => {
    const updatedFiles = [...files];
    updatedFiles.push({ fieldName, file: e.target.files[0] });
    setFiles(updatedFiles);
  };

  const handleProceed = async () => {
    try {
      const newDataSheet = [];

      for (const fileData of files) {
        const result = await Tesseract.recognize(fileData.file, 'eng');
        const extractedText = result.data.text;

        const taxAmountMatch = extractedText.match(/Tax-Amount\s*:\s*(\d+)/i);

        if (taxAmountMatch) {
          const taxAmount = parseFloat(taxAmountMatch[1]);
          newDataSheet.push(taxAmount);
        } else {
          console.warn('Tax Amount not found in the text.');
        }
      }

      handleDataSheetUpdate(newDataSheet);
    } catch (error) {
      console.error('Error processing images:', error);
    }
  };

  return (
    <div>
      <div className="bills-container">
        <label htmlFor="text">How many bills do you want to choose</label>
        <input
          type="text"
          name="billcount"
          id="billcount"
          value={billCount}
          onChange={handleBillCountChange}
        />
      </div>
      <div className="input-container">{renderFileInputFields()}</div>
      <Link to='/tax' className="button" onClick={handleProceed}>
        Proceed
      </Link>
    </div>
  );
};

export default Input;
