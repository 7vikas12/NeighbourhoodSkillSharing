import { Skill } from "../models/skill.model.js";

// ADD SKILL
const addSkill = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      availability,
      experienceLevel,
      mode,
    } = req.body;

    const userId = req.user._id;

    const newSkill = new Skill({
      title,
      description,
      category,
      location,
      availability,
      experienceLevel,
      mode,
      user: userId,
    });

    const savedSkill = await newSkill.save();

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: savedSkill,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding skill",
      error: error.message,
    });
  }
};


// GET ALL SKILLS
const getSkills = async (req, res) => {
  try {

    const skills = await Skill.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    const formattedSkills = skills.map(skill => ({
      userName: skill.user?.username,
      email: skill.user?.email,
      title: skill.title,
      description: skill.description,
      category: skill.category,
      experienceLevel: skill.experienceLevel,
      mode: skill.mode,
      availability: skill.availability,
      location: skill.location,
      _id: skill._id
    }));

    res.status(200).json({
      success: true,
      data: formattedSkills,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching skills",
    });
  }
};

export { addSkill, getSkills };
