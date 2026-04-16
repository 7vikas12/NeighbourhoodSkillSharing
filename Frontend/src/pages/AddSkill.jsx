import { useState } from "react";
import { addSkill } from "../services/SkillService";
import { useNavigate } from "react-router-dom";
import "../styles/SkillPages.css";
const AddSkill = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Education",
    experienceLevel: "Fresher",
    mode: "Online",
    location: "",
    availability: "Anytime",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSkill(form);
      alert("Skill Added Successfully");
      navigate("/skills/explore");
    } catch (error) {
      alert("Error adding skill");
    }
  };

  return (
    <div className="addSkillContainer">

      <h2>Add Skill</h2>

      <form onSubmit={handleSubmit} className="skillForm">

        <input
          name="title"
          placeholder="Skill Name"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <select name="category" onChange={handleChange}>
          <option>Education</option>
          <option>Technical</option>
          <option>Household</option>
          <option>Health</option>
          <option>Other</option>
        </select>

        <select name="experienceLevel" onChange={handleChange}>
          <option>Fresher</option>
          <option>Experienced</option>
        </select>

        <select name="mode" onChange={handleChange}>
          <option>Online</option>
          <option>Offline</option>
          <option>Both</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <select name="availability" onChange={handleChange}>
          <option>Anytime</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>

        <button>Add Skill</button>

      </form>
    </div>
  );
};

export default AddSkill;
