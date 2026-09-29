export async function getNearby(
  req,
  res
) {
  try {
    const {
      latitude,
      longitude
    } = req.query;

    res.json({
      success: true,

      location: {
        latitude,
        longitude
      },

      data: [
        {
          name: "Nearby Emergency Hospital",
          type: "Emergency Hospital",
          distance: "Nearby"
        },
        {
          name: "Emergency Medical Centre",
          type: "24/7 Medical Care",
          distance: "Nearby"
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}