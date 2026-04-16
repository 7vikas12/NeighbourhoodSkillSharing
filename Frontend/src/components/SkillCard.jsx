import "../styles/SkillPages.css";

const SkillCard = ({ skill }) => {
  const userName = skill.userName || skill.username || "Unknown User";
  const email = skill.email || "No email shared";

  return (
    <div className="skillCard">

      <h3>{userName}</h3>
      <p>{email}</p>

      <h4>{skill.title}</h4>

      <p>{skill.description}</p>

      <p>Category: {skill.category}</p>

      <p>Experience: {skill.experienceLevel}</p>

      <p>Mode: {skill.mode}</p>

      <p>Availability: {skill.availability}</p>

      <p>Location: {skill.location}</p>

      <button>Learn</button>

    </div>
  );
};

export default SkillCard;