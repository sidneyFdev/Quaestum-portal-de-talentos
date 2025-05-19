import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const SkillSelection = ({ candidateSkills, setCandidateSkills, classes }) => {
  const [skillsOptions, setSkillsOptions] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}skills/list`
      );
      setSkillsOptions(
        response.data.map((skill) => ({
          value: skill.id,
          label: skill.name,
        }))
      );
    };
    fetchSkills();
  }, []);

  const handleChange = (selectedOptions) => {
    setCandidateSkills(selectedOptions);
  };

  return (
    <Select
      isMulti
      options={skillsOptions}
      value={candidateSkills}
      onChange={handleChange}
      placeholder="Habilidades relevantes..."
      className={classes}
    />
  );
};

export default SkillSelection;
