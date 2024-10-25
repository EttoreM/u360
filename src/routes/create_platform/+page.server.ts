import type { Deployment } from "../../types/db/Deployment";
import type { Observable } from "../../types/db/Observable";
import type { PlatformType } from "../../types/db/PlatformType";
import type { RecommendedUnit } from "../../types/db/RecommendedUnit";
import type { TimeInterval } from "../../types/db/TimeInterval";
import type { Unit } from "../../types/db/Unit";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificates in development

export async function load() {
	const deployments: Array<Deployment> = await getEntitiesFromDB('deployments');
	const platforms_types: Array<PlatformType> = await getEntitiesFromDB('platformtypes');
	const observables: Array<Observable> = await getEntitiesFromDB('observables');
	const platform_types_typical_observables = await getEntitiesFromDB('PlatformTypesTypicalObservables');
	const recommended_units: Array<RecommendedUnit> = await getEntitiesFromDB('RecommendedUnits');
	const units: Array<Unit> = await getEntitiesFromDB('units');
	const time_intervals: Array<TimeInterval> = await getEntitiesFromDB('TimeIntervals');
	return { deployments, platforms_types, time_intervals, observables, platform_types_typical_observables, recommended_units, units }
    
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
