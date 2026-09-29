export async function chat(
  req,
  res
) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message:
          "Message is required."
      });
    }

    const text =
      message.toLowerCase();

    let response =
      "Stay calm and move to a safe location if possible. If the situation is life-threatening, contact emergency services immediately.";

    if (
      text.includes("fire") ||
      text.includes("smoke")
    ) {
      response =
        "Move away from the fire and smoke. Do not use elevators in a burning building. Alert people nearby and contact fire and emergency services.";
    } else if (
      text.includes("bleed") ||
      text.includes("blood")
    ) {
      response =
        "Apply firm pressure to the bleeding area with clean cloth or gauze if available. Seek emergency medical assistance for severe bleeding.";
    } else if (
      text.includes("unconscious") ||
      text.includes("not responding")
    ) {
      response =
        "Check that the area is safe, check responsiveness and breathing, and contact emergency services immediately. Follow instructions from the emergency operator.";
    } else if (
      text.includes("snake") ||
      text.includes("bite")
    ) {
      response =
        "Move away from the animal and keep the person calm and still. Avoid cutting or sucking the wound. Seek emergency medical care immediately.";
    } else if (
      text.includes("accident") ||
      text.includes("crash")
    ) {
      response =
        "Move to a safe area if possible and avoid unnecessary movement of injured people, especially after serious trauma. Contact emergency services.";
    }

    res.json({
      success: true,
      message: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}