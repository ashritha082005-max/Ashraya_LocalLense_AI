import EmergencyContact from "../models/EmergencyContact.js";

export async function addContact(req, res) {
  try {
    const { name, phone, relation } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required."
      });
    }

    const contact = await EmergencyContact.create({
      name,
      phone,
      relation
    });

    return res.status(201).json({
      success: true,
      message: "Emergency contact added successfully.",
      data: contact
    });
  } catch (error) {
    console.error("ADD CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function getContacts(req, res) {
  try {
    const contacts = await EmergencyContact.find({
      isActive: true
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function deleteContact(req, res) {
  try {
    const { id } = req.params;

    await EmergencyContact.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Emergency contact deleted."
    });
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
