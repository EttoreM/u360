process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificates in development

export async function load() {
	const deployments = await getEntitiesFromDB('deployments');
  const platforms   = await getEntitiesFromDB('platforms');
  const locations   = await getEntitiesFromDB('locations');
	
	return { 
		deployments, 
		platforms,
    locations
	}  
}

async function getEntitiesFromDB(_entities: string) {
	try {
		const res = await fetch(`https://localhost:7168/api/${_entities}`);
		if (!res.ok) {			
				console.log(`Error fetching data: ${res.statusText}`);
				return null;
		}
		const entities = await res.json();
		return entities;
	} catch (error) {
			console.error(`Failed to fetch ${_entities}:`, error);
			return null; // Return null if there's an error fetching the data
	}
}