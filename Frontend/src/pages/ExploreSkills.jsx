import { useEffect, useState } from "react";
import { getSkills } from "../services/SkillService";
import SkillCard from "../components/SkillCard";
import { Link } from "react-router-dom";
import "../styles/SkillPages.css";

const ExploreSkills = () => {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setSkills(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("Unable to fetch skills right now");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exploreContainer">

      <h2>Explore Skills</h2>

      {loading && <p>Loading skills...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && skills.length === 0 && (
        <p>
          No skills found yet. Add one from <Link to="/skills/add">Add Skill</Link>.
        </p>
      )}

      {!loading && !error && skills.map(skill => (
        <SkillCard key={skill._id} skill={skill} />
      ))}

    </div>
  );
};

export default ExploreSkills;