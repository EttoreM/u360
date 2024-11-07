process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificates in development

export async function load() {
	const deployments = await getEntitiesFromDB('deployments');
  const platforms = await getEntitiesFromDB('platforms');
	// const platforms_types = await getEntitiesFromDB('platformtypes');
	// const observables = await getEntitiesFromDB('observables');
	// const platform_types_typical_observables = await getEntitiesFromDB('PlatformTypesTypicalObservables');
	// const recommended_units = await getEntitiesFromDB('RecommendedUnits');
	// const units = await getEntitiesFromDB('units');
	return { deployments, platforms }; //, platforms_types, observables, platform_types_typical_observables, recommended_units, units }
    
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