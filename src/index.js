const dogTable = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')

dogForm.addEventListener('submit', handleDogForm)
dogTable.addEventListener('click', handleDogEdit)

function fetchDogs() {
  fetch(`http://localhost:3000/dogs`)
  .then(function(resp){
    return resp.json()
  })
  .then(function(dogs){
    populateDogs(dogs)
  })
}

fetchDogs()

function populateDogs(dogs) {
  dogs.forEach(function(dog){
    dogTable.innerHTML += `
    <tr><td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button id="dog-edit" data-id=${dog.id}>Edit</button>
    </td></tr>
    `
  })

}

function handleDogForm(e) {
  e.preventDefault()
  
  let dog = e.target
  fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        name: dog.name.value,
        breed: dog.breed.value,
        sex: dog.sex.value
      }
    )
  })
  .then(function(resp){
    return resp.json()
  })
  .then(function(dog){
    for(let i =0; i<3; i++) {
      dogForm.children[i].value = ''
    }
    fetchDogs()
  })
}

function handleDogEdit(e) {
  if (e.target.id == 'dog-edit') {
    let dogId = e.target.dataset.id
    let elements = e.target.parentElement.parentElement.children
    dogForm.dataset.id = dogId
    for (let i =0; i<3; i++){
      dogForm.children[i].value = elements[i].innerText
      dogForm
    }
  }
}