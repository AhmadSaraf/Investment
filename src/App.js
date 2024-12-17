import Header from "./Components/UI/Header";
import Result from "./Components/Result/Result";
import InputForm from "./Components/UserInput/InputForm";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState(null);
  
  const yearlyData = [];
 
  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
    
  };

  return (
    <div>
      <Header />
      <InputForm onCalculate={calculateHandler} />
      {!userInput && <p style={{textAlign: 'center'}} >No Investment Data has been Calculated</p>}
      {userInput && <Result data={yearlyData} initialInvestment={userInput['current-savings']}/>}
    </div>
  );
}

export default App;
