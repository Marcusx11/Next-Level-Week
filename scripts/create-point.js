
// Função para popular o "select" com os estados BR da API dos serviços do IBGE
function populateUFs() {
    // Selecionando a tag "select" do HTML que possuir name = "uf"
    const ufSelect = document.querySelector("select[name=uf]")

    // Fetch retorna um objeto "promising" podendo ter os dados do link ou não
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => 
        res.json() // Retornando o resultado da requisição como um "json"
    ).then(states => {
        // Adicionando uma lista de estados ao dropDownButton dos estados
        for ( let state of states ) {
            // innerHTML adiciona uma tag HTML por JS
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`   
        }
    })
}

// Executando o método para construção do select
populateUFs()

// Função para pegar as cidades do seu respectivo estado
function getAllCities(event) {
    // Selecionando a tag "select" do HTML que possuir name = "city"
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    // Pegando-se o valor do estado 
    const ufValue = event.target.value

    // Pegando-se o estado atual selecionado e salvando no input "hidden"
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/
                ${ufValue}/municipios`

    fetch(url).then(res => 
        res.json()
    ).then(cities => {
        for ( let city of cities ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`   
        }
        citySelect.disabled = false
    })
}

// Comando para disponibilizar a seleção de cidades ao ter um estado selecionado
document.querySelector("select[name=uf]").addEventListener("change", getAllCities)