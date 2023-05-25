import { proxy } from "./UtilityService";

export async function getTrips() {
    const response = await fetch(proxy('server', '/api/trips'));
    return await response.json();
}