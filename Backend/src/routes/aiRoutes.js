import express from "express";

const router = express.Router();

router.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Please describe the emergency."
    });
  }

  const text = message.toLowerCase();

  let response =
    "Please stay calm and move to a safe location. If you are in immediate danger, contact emergency services.";

  // 🔥 FIRE
  if (
    text.includes("fire") ||
    text.includes("burning") ||
    text.includes("flames") ||
    text.includes("smoke")
  ) {
    response =
      "🔥 FIRE EMERGENCY\n\n" +
      "1. Move away from the fire immediately.\n" +
      "2. Alert people nearby.\n" +
      "3. Do NOT use an elevator.\n" +
      "4. If there is smoke, stay low and cover your nose and mouth.\n" +
      "5. Do not go back inside for belongings.\n" +
      "6. Call the fire service immediately.\n\n" +
      "If your clothing catches fire: STOP, DROP, and ROLL.";
  }

  // 🌊 FLOOD
  else if (
    text.includes("flood") ||
    text.includes("flooding") ||
    text.includes("water entered") ||
    text.includes("water rising") ||
    text.includes("heavy water")
  ) {
    response =
      "🌊 FLOOD EMERGENCY\n\n" +
      "1. Move to higher ground immediately.\n" +
      "2. Stay away from rapidly moving water.\n" +
      "3. Do not walk or drive through floodwater.\n" +
      "4. Avoid electrical wires and flooded electrical equipment.\n" +
      "5. Keep your phone charged if possible.\n" +
      "6. Follow local emergency warnings and evacuation instructions.\n" +
      "7. Contact emergency services if you are trapped or in immediate danger.";
  }

  // 🚗 ROAD ACCIDENT
  else if (
    text.includes("accident") ||
    text.includes("car crash") ||
    text.includes("road crash") ||
    text.includes("collision") ||
    text.includes("crash")
  ) {
    response =
      "🚗 ROAD ACCIDENT\n\n" +
      "1. Move to a safe location if you can do so safely.\n" +
      "2. Call emergency services immediately.\n" +
      "3. Do not move an injured person unless there is immediate danger.\n" +
      "4. If there is severe bleeding, apply firm pressure with clean cloth or gauze.\n" +
      "5. Do not give food or water to a seriously injured person.\n" +
      "6. Keep the injured person calm and monitor their condition.";
  }

  // 🐍 SNAKE BITE
  else if (
    text.includes("snake bite") ||
    text.includes("snakebite") ||
    text.includes("snake bit")
  ) {
    response =
      "🐍 SNAKE BITE EMERGENCY\n\n" +
      "1. Get medical help immediately.\n" +
      "2. Keep the person calm and as still as possible.\n" +
      "3. Keep the bitten limb still and positioned comfortably.\n" +
      "4. Remove rings, watches, or tight items near the affected area.\n" +
      "5. Do NOT cut the wound or try to suck out venom.\n" +
      "6. Do NOT apply ice or a tight tourniquet.\n" +
      "7. Get to a hospital as soon as possible.";
  }

  // ❤️ HEART ATTACK
  else if (
    text.includes("heart attack") ||
    text.includes("chest pain") ||
    text.includes("heart pain")
  ) {
    response =
      "❤️ POSSIBLE HEART EMERGENCY\n\n" +
      "1. Call emergency medical services immediately.\n" +
      "2. Help the person sit and rest in a comfortable position.\n" +
      "3. Keep them calm and avoid unnecessary movement.\n" +
      "4. Loosen tight clothing.\n" +
      "5. Do not leave the person alone.\n" +
      "6. If they become unresponsive and are not breathing normally, begin CPR if trained and follow emergency-dispatch instructions.";
  }

  // 🩸 SEVERE BLEEDING
  else if (
    text.includes("bleeding") ||
    text.includes("bleeding heavily") ||
    text.includes("blood") ||
    text.includes("deep cut")
  ) {
    response =
      "🩸 SEVERE BLEEDING\n\n" +
      "1. Call emergency medical services if the bleeding is severe.\n" +
      "2. Apply firm, direct pressure with clean cloth or gauze.\n" +
      "3. Keep continuous pressure on the wound.\n" +
      "4. If blood soaks through, add more cloth or gauze without removing the first layer.\n" +
      "5. Keep the injured person as calm and still as possible.\n" +
      "6. Get medical help immediately.";
  }

  // 😵 UNCONSCIOUS
  else if (
    text.includes("unconscious") ||
    text.includes("not responding") ||
    text.includes("collapsed") ||
    text.includes("fainted")
  ) {
    response =
      "😵 UNCONSCIOUS PERSON\n\n" +
      "1. Check that the area is safe.\n" +
      "2. Call emergency medical services immediately.\n" +
      "3. Check whether the person responds and is breathing normally.\n" +
      "4. If they are not breathing normally, start CPR if you are trained and follow emergency-dispatch instructions.\n" +
      "5. If they are breathing normally, place them in the recovery position if there is no suspected spinal injury and monitor them.\n" +
      "6. Do not give them food or water.";
  }

  // 💧 WATER WASTAGE
  else if (
    text.includes("water wasting") ||
    text.includes("water wastage") ||
    text.includes("water is wasting") ||
    text.includes("water is being wasted") ||
    text.includes("wasting water") ||
    text.includes("water wastage problem")
  ) {
    response =
      "💧 WATER WASTAGE\n\n" +
      "1. Turn off leaking or unnecessary taps.\n" +
      "2. Check pipes, taps, toilets, and tanks for leaks.\n" +
      "3. Reuse suitable household water where possible.\n" +
      "4. Avoid keeping taps running while brushing or washing.\n" +
      "5. Report major public water leaks to the responsible local authority.\n" +
      "6. Use water carefully and avoid unnecessary consumption.";
  }

  // 🆘 GENERAL EMERGENCY
  else if (
    text.includes("emergency") ||
    text.includes("danger") ||
    text.includes("help me")
  ) {
    response =
      "🆘 EMERGENCY ASSISTANCE\n\n" +
      "1. Move to a safe location if possible.\n" +
      "2. Stay calm and assess the immediate danger.\n" +
      "3. Contact the appropriate emergency service.\n" +
      "4. Tell them your exact location and what happened.\n" +
      "5. Follow instructions from emergency responders.";
  }

  res.json({
    success: true,
    message: response
  });
});

export default router;
