const paises = ['Mexico', 'Alemania', 'Canada', 'Estados Unidos']
const tablaPaises = $('#countries-list')
let users = []
$('#text-selection').text('Sin seleccion')

const generarLista = () => {
  let lista = ``
  $.each(paises, (index, country) => {
    lista += `<li class="bg-dark rounded-3 my-3 col-3 d-flex justify-content-between pe-2" data-pais=${country}>`
    lista += `<h4>${country}</h4>`
    lista += `<button class='ver-id btn btn-dark ms-1' id='${index}'>Select</button>`
    lista += `</li>`
  })
  tablaPaises.html(lista)
}

$(document).on('click', '.ver-id', (e) => {
  $('#text-selection').text(paises[e.target.id])
  e.target.classList.add(`btn-${e.target.id}-dinamic`)
  e.target.classList.remove(`btn`)
})

$(tablaPaises).on('click', tablaPaises, (e) => {
  console.log(e.target);
  console.log($(this));
})

const checkbox = $('#checkbox')

const userList = $('#users-list') 
const generateListUsers = (array) => {
  let itemsString = ''
  $.each(array, (index, user) => {
    const { name, company, email, phone  } = user
    itemsString += `
      <div class="bg-dark col-3 col-md-2 p-2 rounded-3 text-white">
        <h3>${name}</h3>
        <p class="text-white-50">${company.name}</p>
        <p class="text-white-50">${email}</p>
        <p class="text-white-50">${phone}</p>
      </div>
    `
  })

  userList.html(itemsString)
}

//Ajax
const listUsers = () => {
  $.ajax({
    type: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
    contentType: 'application/json',
    async: true,
    beforeSend: function (data, callback) { 
      console.log('Iniciando petición');
     }, 
    success: function (data) { 
      console.log(`Petición con éxito: ${data.length} usuarios encontrados`) 
      console.log(data);
      generateListUsers(data);
    },
    complete: function () {
      console.log('Petición realizada');
    },
    error: function (error) { console.log(error) }
  })
}

$(document).ready(() => {
  generarLista();
  //Lectura y modificación de atributos
  $(checkbox).prop('checked', true);
  console.log($(checkbox).prop('className'));

  //Invocar petición GET
  listUsers() 
})