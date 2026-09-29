export async function getHospitals(
  req,
  res
) {
  try {
    const hospitals = [
      {
        name: "Emergency Medical Centre",
        type: "24/7 Emergency Care",
        distance: "1.2 km",
        phone: "108"
      },

      {
        name: "City Multi-Speciality Hospital",
        type: "Trauma & Emergency",
        distance: "2.4 km"
      },

      {
        name: "Community Health Hospital",
        type: "General Emergency",
        distance: "3.1 km"
      }
    ];

    res.json({
      success: true,
      data: hospitals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}