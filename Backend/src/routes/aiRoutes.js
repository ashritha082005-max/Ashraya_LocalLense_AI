import express from "express";

const router = express.Router();

router.post("/chat", (req, res) => {
  console.log("🤖 AI CHAT REQUEST:", req.body);

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Please describe the emergency."
    });
  }

  const text = message
    .toLowerCase()
    .trim()
    .replace(/[-_]+/g, " ");

  let response =
    "Please stay calm and move to a safe location. If you are in immediate danger, contact emergency services.";

  // =========================================================
  // 🔥 FIRE
  // =========================================================
  if (
    // English
    text.includes("fire") ||
    text.includes("burning") ||
    text.includes("flames") ||
    text.includes("smoke") ||

    // Kannada
    text.includes("ಬೆಂಕಿ") ||
    text.includes("ಉರಿ") ||
    text.includes("ಹೊಗೆ") ||

    // Hindi
    text.includes("आग") ||
    text.includes("अग्नि") ||
    text.includes("धुआं") ||

    // Telugu
    text.includes("మంట") ||
    text.includes("అగ్ని") ||
    text.includes("పొగ") ||

    // Tamil
    text.includes("தீ") ||
    text.includes("நெருப்பு") ||
    text.includes("புகை") ||

    // Malayalam
    text.includes("തീ") ||
    text.includes("തീപിടുത്തം") ||
    text.includes("പുക") ||

    // Marathi
    text.includes("आग") ||
    text.includes("अग्नी") ||
    text.includes("धूर") ||

    // Bengali
    text.includes("আগুন") ||
    text.includes("ধোঁয়া") ||

    // Gujarati
    text.includes("આગ") ||
    text.includes("ધુમાડો") ||

    // Punjabi
    text.includes("ਅੱਗ") ||
    text.includes("ਧੂੰਆਂ")
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

  // =========================================================
  // 🌊 FLOOD
  // =========================================================
  else if (
    // English
    text.includes("flood") ||
    text.includes("flooding") ||
    text.includes("water entered") ||
    text.includes("water rising") ||

    // Kannada
    text.includes("ನೆರೆ") ||
    text.includes("ಪ್ರವಾಹ") ||
    text.includes("ನೀರು ತುಂಬಿದೆ") ||
    text.includes("ನೀರು ಏರುತ್ತಿದೆ") ||

    // Hindi
    text.includes("बाढ़") ||
    text.includes("बाढ") ||
    text.includes("पानी भर गया") ||
    text.includes("पानी बढ़ रहा") ||

    // Telugu
    text.includes("వరద") ||
    text.includes("నీరు చేరింది") ||
    text.includes("నీరు పెరుగుతోంది") ||

    // Tamil
    text.includes("வெள்ளம்") ||
    text.includes("தண்ணீர் நிரம்பியது") ||

    // Malayalam
    text.includes("വെള്ളപ്പൊക്കം") ||
    text.includes("വെള്ളം കയറി") ||

    // Marathi
    text.includes("पूर") ||
    text.includes("पाणी भरले") ||

    // Bengali
    text.includes("বন্যা") ||
    text.includes("জল ঢুকে গেছে") ||

    // Gujarati
    text.includes("પૂર") ||
    text.includes("પાણી ભરાઈ ગયું") ||

    // Punjabi
    text.includes("ਹੜ੍ਹ") ||
    text.includes("ਪਾਣੀ ਭਰ ਗਿਆ")
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

  // =========================================================
  // 🚗 ROAD ACCIDENT
  // =========================================================
  else if (
    // English
    text.includes("accident") ||
    text.includes("car crash") ||
    text.includes("road crash") ||
    text.includes("collision") ||
    text.includes("crash") ||

    // Kannada
    text.includes("ಅಪಘಾತ") ||
    text.includes("ರಸ್ತೆ ಅಪಘಾತ") ||

    // Hindi
    text.includes("दुर्घटना") ||
    text.includes("सड़क दुर्घटना") ||

    // Telugu
    text.includes("ప్రమాదం") ||
    text.includes("రోడ్డు ప్రమాదం") ||

    // Tamil
    text.includes("விபத்து") ||
    text.includes("சாலை விபத்து") ||

    // Malayalam
    text.includes("അപകടം") ||
    text.includes("റോഡ് അപകടം") ||

    // Marathi
    text.includes("अपघात") ||
    text.includes("रस्ता अपघात") ||

    // Bengali
    text.includes("দুর্ঘটনা") ||
    text.includes("সড়ক দুর্ঘটনা") ||

    // Gujarati
    text.includes("અકસમાત") ||
    text.includes("રસ્તા અકસ્માત") ||

    // Punjabi
    text.includes("ਹਾਦਸਾ") ||
    text.includes("ਸੜਕ ਹਾਦਸਾ")
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

  // =========================================================
  // 🐍 SNAKE BITE
  // =========================================================
  else if (
    // English
    text.includes("snake") ||
    text.includes("snake bite") ||
    text.includes("snakebite") ||
    text.includes("snake bit") ||

    // Kannada
    text.includes("ಹಾವು") ||
    text.includes("ಹಾವು ಕಡಿತ") ||
    text.includes("ಹಾವು ಕಚ್ಚಿದೆ") ||

    // Telugu
    text.includes("పాము") ||
    text.includes("కాటు") ||
    text.includes("పాము కాటు") ||
    text.includes("పాము కరిచింది") ||

    // Hindi
    text.includes("साँप") ||
    text.includes("सांप") ||
    text.includes("सर्प") ||
    text.includes("साँप का काटना") ||
    text.includes("सांप ने काटा") ||

    // Tamil
    text.includes("பாம்பு") ||
    text.includes("கடி") ||
    text.includes("பாம்பு கடி") ||
    text.includes("பாம்பு கடித்தது") ||

    // Malayalam
    text.includes("പാമ്പ്") ||
    text.includes("പാമ്പുകടി") ||
    text.includes("പാമ്പ് കടിച്ചു") ||

    // Marathi
    text.includes("साप") ||
    text.includes("सर्पदंश") ||
    text.includes("साप चावला") ||

    // Bengali
    text.includes("সাপ") ||
    text.includes("সাপের কামড়") ||
    text.includes("সাপে কামড়েছে") ||

    // Gujarati
    text.includes("સાપ") ||
    text.includes("સાપનો ડંખ") ||
    text.includes("સાપે ડંખ માર્યો") ||

    // Punjabi
    text.includes("ਸੱਪ") ||
    text.includes("ਸੱਪ ਦਾ ਡੰਗ") ||
    text.includes("ਸੱਪ ਨੇ ਡੰਗ ਮਾਰਿਆ")
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

  // =========================================================
  // ❤️ HEART ATTACK
  // =========================================================
  else if (
    // English
    text.includes("heart attack") ||
    text.includes("chest pain") ||
    text.includes("heart pain") ||

    // Kannada
    text.includes("ಹೃದಯಾಘಾತ") ||
    text.includes("ಎದೆ ನೋವು") ||
    text.includes("ಹೃದಯ ನೋವು") ||

    // Hindi
    text.includes("दिल का दौरा") ||
    text.includes("सीने में दर्द") ||
    text.includes("दिल में दर्द") ||

    // Telugu
    text.includes("గుండెపోటు") ||
    text.includes("గుండె నొప్పి") ||
    text.includes("ఛాతీ నొప్పి") ||

    // Tamil
    text.includes("மாரடைப்பு") ||
    text.includes("மார்பு வலி") ||
    text.includes("இதய வலி") ||

    // Malayalam
    text.includes("ഹൃദയാഘാതം") ||
    text.includes("നെഞ്ചുവേദന") ||

    // Marathi
    text.includes("हृदयविकाराचा झटका") ||
    text.includes("छातीत दुखणे") ||

    // Bengali
    text.includes("হার্ট অ্যাটাক") ||
    text.includes("বুকে ব্যথা") ||

    // Gujarati
    text.includes("હાર્ટ એટેક") ||
    text.includes("છાતીમાં દુખાવો") ||

    // Punjabi
    text.includes("ਦਿਲ ਦਾ ਦੌਰਾ") ||
    text.includes("ਛਾਤੀ ਵਿੱਚ ਦਰਦ")
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

  // =========================================================
  // 🩸 SEVERE BLEEDING
  // =========================================================
  else if (
    // English
    text.includes("bleeding") ||
    text.includes("bleeding heavily") ||
    text.includes("blood") ||
    text.includes("deep cut") ||
    text.includes("heavy bleeding") ||

    // Kannada
    text.includes("ರಕ್ತಸ್ರಾವ") ||
    text.includes("ರಕ್ತ") ||
    text.includes("ಹೆಚ್ಚು ರಕ್ತ") ||

    // Hindi
    text.includes("खून") ||
    text.includes("रक्तस्राव") ||
    text.includes("बहुत खून") ||

    // Telugu
    text.includes("రక్తస్రావం") ||
    text.includes("రక్తం") ||
    text.includes("ఎక్కువ రక్తం") ||

    // Tamil
    text.includes("இரத்தப்போக்கு") ||
    text.includes("இரத்தம்") ||

    // Malayalam
    text.includes("രക്തസ്രാവം") ||
    text.includes("രക്തം") ||

    // Marathi
    text.includes("रक्तस्त्राव") ||
    text.includes("रक्त") ||

    // Bengali
    text.includes("রক্তপাত") ||
    text.includes("রক্ত") ||

    // Gujarati
    text.includes("રક્તસ્ત્રાવ") ||
    text.includes("લોહી") ||

    // Punjabi
    text.includes("ਖੂਨ ਵਹਿਣਾ") ||
    text.includes("ਖੂਨ")
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

  // =========================================================
  // 😵 UNCONSCIOUS
  // =========================================================
  else if (
    // English
    text.includes("unconscious") ||
    text.includes("not responding") ||
    text.includes("collapsed") ||
    text.includes("fainted") ||

    // Kannada
    text.includes("ಪ್ರಜ್ಞಾಹೀನ") ||
    text.includes("ಪ್ರಜ್ಞೆ ಇಲ್ಲ") ||
    text.includes("ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಿಲ್ಲ") ||
    text.includes("ಕುಸಿದು ಬಿದ್ದ") ||

    // Hindi
    text.includes("बेहोश") ||
    text.includes("होश नहीं") ||
    text.includes("बेहोशी") ||

    // Telugu
    text.includes("స్పృహ లేకుండా") ||
    text.includes("స్పృహ లేదు") ||
    text.includes("స్పందించడం లేదు") ||

    // Tamil
    text.includes("மயக்கம்") ||
    text.includes("நினைவிழந்த") ||
    text.includes("பதிலளிக்கவில்லை") ||

    // Malayalam
    text.includes("ബോധരഹിതം") ||
    text.includes("ബോധമില്ല") ||

    // Marathi
    text.includes("बेशुद्ध") ||
    text.includes("शुद्धीवर नाही") ||

    // Bengali
    text.includes("অজ্ঞান") ||
    text.includes("সাড়া দিচ্ছে না") ||

    // Gujarati
    text.includes("બેભાન") ||
    text.includes("ભાન નથી") ||

    // Punjabi
    text.includes("ਬੇਹੋਸ਼") ||
    text.includes("ਹੋਸ਼ ਨਹੀਂ")
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

  // =========================================================
  // 💧 WATER WASTAGE
  // =========================================================
  else if (
    // English
    text.includes("water wasting") ||
    text.includes("water wastage") ||
    text.includes("water is wasting") ||
    text.includes("water is being wasted") ||
    text.includes("wasting water") ||
    text.includes("water wastage problem") ||

    // Kannada
    text.includes("ನೀರು ವ್ಯರ್ಥ") ||
    text.includes("ನೀರಿನ ವ್ಯರ್ಥ") ||
    text.includes("ನೀರು ಪೋಲಾಗುತ್ತಿದೆ") ||

    // Hindi
    text.includes("पानी की बर्बादी") ||
    text.includes("पानी बर्बाद") ||

    // Telugu
    text.includes("నీటి వృథా") ||
    text.includes("నీరు వృథా") ||

    // Tamil
    text.includes("தண்ணீர் வீணாக்கம்") ||
    text.includes("தண்ணீர் வீணாகிறது") ||

    // Malayalam
    text.includes("ജല പാഴാക്കൽ") ||
    text.includes("വെള്ളം പാഴാകുന്നു") ||

    // Marathi
    text.includes("पाण्याची नासाडी") ||
    text.includes("पाणी वाया") ||

    // Bengali
    text.includes("জলের অপচয়") ||
    text.includes("পানি অপচয়") ||

    // Gujarati
    text.includes("પાણીનો બગાડ") ||
    text.includes("પાણી વેડફાય") ||

    // Punjabi
    text.includes("ਪਾਣੀ ਦੀ ਬਰਬਾਦੀ") ||
    text.includes("ਪਾਣੀ ਬਰਬਾਦ")
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

  // =========================================================
  // 🆘 GENERAL EMERGENCY
  // =========================================================
  else if (
    // English
    text.includes("emergency") ||
    text.includes("danger") ||
    text.includes("help me") ||

    // Kannada
    text.includes("ತುರ್ತು ಪರಿಸ್ಥಿತಿ") ||
    text.includes("ಅಪಾಯ") ||
    text.includes("ನನಗೆ ಸಹಾಯ ಮಾಡಿ") ||

    // Hindi
    text.includes("आपातकाल") ||
    text.includes("खतरा") ||
    text.includes("मेरी मदद करो") ||

    // Telugu
    text.includes("అత్యవసర పరిస్థితి") ||
    text.includes("ప్రమాదం") ||
    text.includes("నాకు సహాయం చేయండి") ||

    // Tamil
    text.includes("அவசரநிலை") ||
    text.includes("ஆபத்து") ||
    text.includes("எனக்கு உதவி") ||

    // Malayalam
    text.includes("അടിയന്തരാവസ്ഥ") ||
    text.includes("അപകടം") ||
    text.includes("എന്നെ സഹായിക്കൂ") ||

    // Marathi
    text.includes("आपत्कालीन परिस्थिती") ||
    text.includes("धोका") ||
    text.includes("मदत करा") ||

    // Bengali
    text.includes("জরুরি অবস্থা") ||
    text.includes("বিপদ") ||
    text.includes("আমাকে সাহায্য করুন") ||

    // Gujarati
    text.includes("કટોકટી") ||
    text.includes("જોખમ") ||
    text.includes("મારી મદદ કરો") ||

    // Punjabi
    text.includes("ਐਮਰਜੈਂਸੀ") ||
    text.includes("ਖ਼ਤਰਾ") ||
    text.includes("ਮੇਰੀ ਮਦਦ ਕਰੋ")
  ) {
    response =
      "🆘 EMERGENCY ASSISTANCE\n\n" +
      "1. Move to a safe location if possible.\n" +
      "2. Stay calm and assess the immediate danger.\n" +
      "3. Contact the appropriate emergency service.\n" +
      "4. Tell them your exact location and what happened.\n" +
      "5. Follow instructions from emergency responders.";
  }

  // =========================================================
  // RESPONSE
  // =========================================================

  console.log("🤖 AI RESPONSE:", response);

  return res.json({
    success: true,
    message: response
  });
});

export default router;