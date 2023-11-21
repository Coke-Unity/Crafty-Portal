// Replace 'path/to/your/apps' with the actual relative path to your Apps folder
const appsFolder = 'Apps';

async function fetchAppsData(appsFolder) {
  try {
    const response = await fetch(`/${appsFolder}/app.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching app data:', error);
    return [];
  }
}

function createTile(appData) {
  const tile = document.createElement('div');
  tile.classList.add('tile');

  const icon = document.createElement('img');
  icon.src = `/${appData.icon || 'icon.png'}`;
  icon.alt = appData.name;
  tile.appendChild(icon);

  const name = document.createElement('span');
  name.textContent = appData.name;
  tile.appendChild(name);

  // Add click event listener to tile
  tile.addEventListener('click', () => {
    window.location.href = appData.url;
  });

  return tile;
}

async function renderAppTiles() {
  const appsData = await fetchAppsData(appsFolder);
  const tilesContainer = document.getElementById('tiles-container');

  appsData.forEach(appData => {
    const tile = createTile(appData);
    tilesContainer.appendChild(tile);
  });
}

document.addEventListener('DOMContentLoaded', renderAppTiles);
