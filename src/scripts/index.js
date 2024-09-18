import {getUser} from '/src/scripts/services/users.js'
import {getRepositories} from '/src/scripts/services/repositories.js'

import { user } from '/src/scripts/objects/users.js'
import {screen} from '/src/scripts/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () =>{
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) =>{
    const userName = e.target.value /*Pegamos o valor que está dentro do input */
    const key = e.which || e.keyCode /*chave de identificador( cosigo da chave) de ver oq veio ( qual valor veio) ao dar enter */
    const isEnterKeyPressed = key === 13 /*identificar se a tecla enter ( de numero 13 do teclado) esta sendo clicada*/ 

   if (isEnterKeyPressed){
    validateEmptyInput(userName)
    getUserData(userName)
   }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}


async function getUserData(userName){

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }


    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}



