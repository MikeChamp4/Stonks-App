const fs = require('fs/promises');
const urls = require("./../data/urls.json");

// Supongamos que tu JSON tiene este formato
const companiesKey = urls.ApiInfo.ShareDetailsInfo_CompanyKey;

async function createFolders() {
  try {
    for (const clave of Object.keys(companiesKey)) {
      // Crea una carpeta con el nombre de la clave
      await fs.mkdir(`./src/data/${clave}`);
      console.log(`Carpeta ${clave} creada.`);
    }

    console.log('Todas las carpetas creadas.');
  } catch (error) {
    console.error('Error al crear carpetas:', error);
  }
}

// Llama a la función para crear las carpetas
createFolders();