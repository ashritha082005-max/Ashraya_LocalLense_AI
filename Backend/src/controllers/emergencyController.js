import Emergency from "../models/Emergency.js";

export async function createEmergency(req, res) {
  try {
    const {
      type,
      latitude,
      longitude
    } = req.body;

    console.log("🚨 Emergency request received:", {
      type,
      latitude,
      longitude
    });

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Emergency type is required."
      });
    }

    const emergency = await Emergency.create({
      user: req.user?.id || null,
      type,
      latitude,
      longitude
    });

    console.log(
      "✅ Emergency saved successfully:",
      emergency
    );

    return res.status(201).json({
      success: true,
      message: "Emergency recorded successfully.",
      data: emergency
    });

  } catch (error) {
    console.error(
      "🚨 CREATE EMERGENCY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function getHistory(req, res) {
  try {
    const filter = req.user?.id
      ? { user: req.user.id }
      : {};

    const emergencies =
      await Emergency.find(filter)
        .sort({
          createdAt: -1
        })
        .limit(50);

    return res.json({
      success: true,
      data: emergencies
    });

  } catch (error) {
    console.error(
      "🚨 GET HISTORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

