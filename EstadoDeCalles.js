const cityDictionary = {
  Ita: 'Itá es una ciudad situada en el departamento Central de Paraguay. Fue fundada en 1539 y es conocida por su historia colonial y su rica cultura. Durante la época colonial, Itá era un importante centro de producción agrícola y ganadera.',
  Aregua: 'Areguá es una ciudad ubicada a orillas del lago Ypacaraí, a unos 30 km al este de Asunción.',
  Lambare: 'Lambaré es una ciudad situada en el departamento Central, a orillas del río Paraguay, cerca de Asunción. Fue fundada en 1740 y se ha convertido en un importante centro residencial y comercial en los últimos años.',
  PedroJuanCaballero: 'Pedro Juan Caballero es una ciudad ubicada en el departamento de Amambay, en la frontera con Brasil. Fue fundada en 1892 y lleva el nombre de Pedro Juan Caballero, un héroe de la independencia paraguaya. Durante la historia reciente, la ciudad ha sido conocida por su comercio transfronterizo y su actividad económica.'
};

document.addEventListener('DOMContentLoaded', () => {
  const messageContainer = document.getElementById('message-container');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.toLowerCase();
    userInput.value = '';
    addMessage('user', userMessage);
    handleMessage(userMessage);
  });

  function handleMessage(message) {
    let cityInfo = cityDictionary[message];
    if (cityInfo) {
      addMessage('assistant', cityInfo);
    } else {
      for (let city in cityDictionary) {
        if (city.toLowerCase() === message) {
          cityInfo = cityDictionary[city];
          addMessage('assistant', cityInfo);
          return;
        }
      }
      fetch('https://api.myjson.online/v1/records/5a3bd4e3-e8d5-40b1-a7e1-013a7d6afc19')
        .then(response => response.text())
        .then(data => {
          addMessage('assistant', data);
        })
        .catch(error => {
          console.error('Error:', error);
          addMessage('assistant', 'Lo siento, no se pudo obtener el valor de la API.');
        });
    }
  }

  function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    messageElement.textContent = text;
    messageContainer.appendChild(messageElement);
  }
});