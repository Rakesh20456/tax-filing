import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Tax = ({dataSheet}) => {

  const generatePDF = () => {
    const input = document.getElementById('tables');

    html2canvas(input, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0, '', 'FAST');
      pdf.save('Data.pdf');
    });
  };
  let total = 0;

  return (
    <div>
      <div className="table-container">
        <div id="tables">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Tax Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {dataSheet &&
              dataSheet.map((amount, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{amount}</td>
                  <td>{total =+ amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>   
        <div className="del-gen">
            <button onClick={generatePDF} className='generate'>Download PDF</button>
        </div> 
  </div>
  );
};

export default Tax;
