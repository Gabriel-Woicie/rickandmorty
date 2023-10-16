const locationsContainer = document.querySelector('.locations-container');
const loadMoreLocationsButton = document.querySelector('#load-more-locations');
const searchInput = document.querySelector('#search')
const typeFilter = document.querySelector('#type')
const dimensionFilter = document.querySelector('#dimension')

const API = 'https://rickandmortyapi.com/api';
const defaultLocationFilters = {
  name: '',
  type: '',
  dimension: '',
  page: 1,
};

async function getLocations({ name, type, dimension, page = 1 }) {
  const response = await fetch(
    `${API}/location?name=${name}&type=${type}&dimension=${dimension}&page=${page}`
  );

  const locations = await response.json();
  return locations.results;
}

async function renderLocations({ locations }) {
  locations.forEach((location) => {
    return (locationsContainer.innerHTML += `
        <div class="location">
          <h3>${location.name}</h3>
          <span>Tipo: ${location.type}</span><br>
          <span>Dimensão: ${location.dimension}</span>
        </div>
      `);
  });
}

loadMoreLocationsButton.addEventListener('click', async () => {
  defaultLocationFilters.page += 1;
  const locations = await getLocations(defaultLocationFilters);
  renderLocations({ locations });
});

searchInput.addEventListener('keyup', async (event)=> {
    defaultLocationFilters.name = event.target.value
    locationsContainer.innerHTML = ''
    const locations = await getLocations(defaultLocationFilters)
    renderLocations({locations})
})

typeFilter.addEventListener('change', async (event)=> {
    defaultLocationFilters.type = event.target.value
    locationsContainer.innerHTML = ''
    const locations = await getLocations(defaultLocationFilters)
    renderLocations({locations})
})

dimensionFilter.addEventListener('change', async (event)=> {
    defaultLocationFilters.dimension = event.target.value
    locationsContainer.innerHTML = ''
    const locations = await getLocations(defaultLocationFilters)
    renderLocations({locations})
})

async function main() {
  const locations = await getLocations(defaultLocationFilters);
  renderLocations({ locations });
}

main();