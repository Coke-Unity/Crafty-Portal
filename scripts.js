window.onload = function() {
  const container = document.querySelector('.container');
  
  // Replace 'path/to/your/apps' with the actual path to your apps folder
  const appsFolder = '/apps/';
  
  fetchAppsData(appsFolder)
    .then(appsData => {
      generateTiles(appsData);
    })
    .catch(err => {
      console.error('Error fetching apps data:', err);
    });
};

async function fetchAppsData(appsFolder) {
  const response = await fetch(`${appsFolder}/app.json`);
  if (response.ok) {
    const appData = await response.json();
    return [appData];
  } else {
    throw new Error(`Failed to fetch app.json: ${response.status}`);
  }
}

function generateTiles(appsData) {
  const container = document.querySelector('.container');
  
  appsData.forEach(appData => {
    const tile = createTile(appData);
    container.appendChild(tile);
  });
}

function createTile(appData) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  
  const icon = document.createElement('img');
  icon.src = appData.icon || 'icon.png';
  
  const name = document.createElement('div');
  name.textContent = appData.name;
  
  tile.appendChild(icon);
  tile.appendChild(name);
  
  tile.addEventListener('click', function() {
    window.location.href = appData.url;
  });
  
  return tile;
}
