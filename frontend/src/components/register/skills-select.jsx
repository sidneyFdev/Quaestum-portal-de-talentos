import React, {useState} from 'react';
import Select from 'react-select';

const SkillSelection = ({ classes }) => {

    const skillOptions = [
        { value: 'Java', label: 'Java' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'C++', label: 'C++' },
        { value: 'PHP', label: 'PHP' },
        { value: 'Python', label: 'Python' },
        { value: 'Go', label: 'Go' },
        { value: 'ADVPL', label: 'ADVPL' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Electron', label: 'Electron' },
        { value: 'React', label: 'React' },
        { value: 'React Native', label: 'React Native' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'MySQL', label: 'MySQL' },
        { value: 'SQLServer', label: 'SQLServer' },
        { value: 'PostgreSQL', label: 'PostgreSQL' },
        { value: 'Backend', label: 'Backend' },
        { value: 'Front-End', label: 'Front-End' },
    ]

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions)
    }

    return (
        <Select
            isMulti
            options={skillOptions}
            value={selectedSkills}
            onChange={handleChange}
            placeholder="Habilidades relevantes..."
            className={classes}
        />
    )
}

export default SkillSelection;