document.addEventListener('DOMContentLoaded', function(){

  const monsterContainer = document.querySelector('#monster-container');
  const forwardButton = document.getElementById('forward');
  const backButton = document.getElementById('back');

  let page = 1

  function renderMonsters(){
    fetch(`http://localhost:3000/monsters?_limit=500&_page=${page}`)
    .then(function(response){
      return response.json();
    })
    .then(function(jsonResp){
      let monsterArray = jsonResp
      // let monsterArray = jsonResp.slice(start, end);
      return monsterArray;
    })
    .then(function(monsterArray){
      monsterArray.forEach(function({name, age, description}){
        monsterContainer.innerHTML += `
        <div>
        <h2>${name}</h2>
        <h4>${age}</h4>
        <p>${description}</p>
        </div>
        `
      })
    })
  }

  renderMonsters();

  forwardButton.addEventListener('click', () => {
    monsterContainer.innerHTML = '';
    page++;
    renderMonsters();
  });

  backButton.addEventListener('click', () => {
    monsterContainer.innerHTML = '';
    page--;
    renderMonsters();
  });

  let monsterForm = document.getElementById('monster-form')

  monsterForm.addEventListener('click', (e) => {
    e.preventDefault();
    let newMonsterName = document.getElementById('name').value
    let newMonsterAge = document.getElementById('age').value
    let newMonsterDesc = document.getElementById('description').value
    // console.log(e.target)
    if (e.target.tagName === 'BUTTON') {
      // console.log(newMonsterAge)
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: newMonsterName, age: newMonsterAge, description: newMonsterDesc})
      })
      .then(function(resp) {
        // debugger
        return resp.json()
      }).then(function(jsonResp) {
        monsterContainer.innerHTML += `
        <div>
          <h2>${jsonResp.name}</h2>
          <h4>${jsonResp.age}</h4>
          <p>${jsonResp.description}</p>
        </div>
        `
      })
    }
    // debugger
  })


})
