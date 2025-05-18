import axios from "axios";
import dayjs from "dayjs";

export default function CandidateRequest() {

  const convertToDateTime = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day} 00`;
  };

  const InsertNewCandidate = async (data) => {   
    let correctData = {
      ...data,
      birthdate: convertToDateTime(data.birthdate),
      educations: data.educations.map(formation => ({
        course: formation.course,
        institution: formation.institution,
        start_date: convertToDateTime(formation.start_date),
        finished_date: convertToDateTime(formation.finished_date
        )
      })),
    }
    
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}user/register`,
      correctData
    );
    if (response.status === 201) {
      return response.status;
    } else {
      return response.status
    }
  }

  return {
    InsertNewCandidate
  }
}
