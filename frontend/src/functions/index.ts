export const disableWordActive = () => {
    const userToken = localStorage.getItem("userToken")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    const dataSumbit = {
      "won": true,
      
    }
    
    
    fetch("/hangman/disableWordActive", {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(dataSumbit)
    })
      .then(response => response.text())
      .then(result => console.log())
      .catch(error => console.log('error', error));
    }