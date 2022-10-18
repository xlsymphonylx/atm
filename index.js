let buttons = document.getElementsByClassName('button')

let input = document.querySelector('.input')
let infoText = document.querySelector('.info__text')
let btn = document.createElement('div')
let btn2 = document.createElement('div')
let btn3 = document.createElement('div')

const pins = ['1']
const keyboardInput = (ev) => {
    let id = ev.target.id.replace('button','')
    if(id === 'Cancel'){
        input.textContent = ''
        return
    }
    if(id === 'Ok'){
       const found = pins.find(pin => pin ===input.textContent)
       if(found){
        input.style.display = "none"
        infoText.textContent = ''
        btn.classList.add('button')
        btn2.classList.add('button')
        btn3.classList.add('button')

        btn.innerText = 'Cambiar PIN'
        btn2.innerText = 'Consultar Saldo'
        btn3.innerText = 'Retiro Saldo'

        infoText.appendChild(btn)
        infoText.appendChild(btn2)
        infoText.appendChild(btn3)

        alert("Ingresado")}
       if(!found)alert("Error")
       return
    }
    if(id) input.textContent = input.textContent + id
}


for (let index = 0; index < buttons.length; index++) {
    buttons[index].addEventListener('click', keyboardInput)
    
}
