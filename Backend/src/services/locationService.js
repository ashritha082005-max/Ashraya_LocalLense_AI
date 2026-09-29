export async function findNearbyServices(
  latitude,
  longitude
) {
  return {
    latitude,
    longitude,
    services: []
  };
}