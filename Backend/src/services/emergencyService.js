export async function processEmergency(
  emergency
) {
  return {
    status: "received",
    emergency
  };
}
