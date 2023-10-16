const charsContainer = document.querySelector('.chars-container');
const searchInput = document.querySelector('#search')
const speciesFilter = document.querySelector('#species')
const genderFilter = document.querySelector('#gender')
const statusFilter = document.querySelector('#status')
const loadMoreButton = document.querySelector('#load-more')

const API = 'https://rickandmortyapi.com/api'
const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
}

async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`)

    const characters = await response.json()
    return characters.results
}

async function render({characters}) {
    characters.forEach((character) => {

        return charsContainer.innerHTML += `
            <div class="char">
            <img src="${character.image}" alt="">
            <div class="char-info">
              <h3>${character.name}</h3>
              <span>${character.species}</span>
              <span>${character.status}</span>
            </div>
        </div>
        `

    })    
}

speciesFilter.addEventListener('change', async (event)=> {
    defaultFilters.species = event.target.value
    charsContainer.innerHTML = ''
    const characters = await getCharacters(defaultFilters)
    render({characters})
})

genderFilter.addEventListener('change', async (event)=> {
    defaultFilters.gender = event.target.value
    charsContainer.innerHTML = ''
    const characters = await getCharacters(defaultFilters)
    render({characters})
})

statusFilter.addEventListener('change', async (event)=> {
    defaultFilters.status = event.target.value
    charsContainer.innerHTML = ''
    const characters = await getCharacters(defaultFilters)
    render({characters})
})

searchInput.addEventListener('keyup', async (event)=> {
    defaultFilters.name = event.target.value
    charsContainer.innerHTML = ''
    const characters = await getCharacters(defaultFilters)
    render({characters})
})

loadMoreButton.addEventListener('click', async ()=> {
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({characters})
})

async function main(){
    const characters = await getCharacters(defaultFilters)
    render({characters})
}
main()