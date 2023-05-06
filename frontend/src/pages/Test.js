import { useEffect, useState } from 'react'

const Test = () => {

    const [result, setResult] = useState({
      
      showResult: false,
      failesNumber: 0,
      successNumber: 0
    
    })


    const printResult = () => {
      console.log(result)
    }

    const showResultFunc = () => {
      setResult({...result, showResult: !result.showResult})
    }

    const failesNumberFunc = () => {
      setResult({...result, failesNumber: result.failesNumber + 1})
    }

    const successNumberFunc = () => {
      setResult({...result, successNumber: result.successNumber + 1})
    }


  return (
    <div>
      <button onClick={printResult}>Print Arr</button>
      <button onClick={showResultFunc}>Set showResult</button>
      <button onClick={failesNumberFunc}>Set failesNumber</button>
      <button onClick={successNumberFunc}>Set successNumber</button>
    </div>
  )
}

export default Test
