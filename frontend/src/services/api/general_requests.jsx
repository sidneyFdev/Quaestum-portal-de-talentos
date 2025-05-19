import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getSkillsDictionary = async (token) => {
  const response = await axios.get(`${API}skills/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const verifyEmailAccount = async (password, token) => {
  const response = await axios.post(`${API}confirm/${token}`, {
    password: password,
    token: token,
  });

  return response.data;
};

export const resetEmailPassword = async (password, token) => {
  const response = await axios.post(`${API}reset/${token}`, {
    password: password,
    token: token,
  });

  return response.data;
};

export const sendAResetToken = async (email) => {
  const response = await axios.post(`${API}reset`, {
    email: email,
  });

  return response.data;
};

export const InsertNewUser = async (data) => {
  const convertToDateTime = (dateString) => {
    if (!dateString || dateString.trim() === "") return null;
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day} 00`;
  };

  let correctData = {
    ...data,
    birthdate: convertToDateTime(data.birthdate),
    educations: data.educations.map((formation) => {
      const education = {
        course: formation.course,
        institution: formation.institution,
        start_date: convertToDateTime(formation.start_date),
      };

      const finishedDate = convertToDateTime(formation.finished_date);
      if (finishedDate) {
        education.finished_date = finishedDate;
      }

      return education;
    }),
  };

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}user/register`,
    correctData
  );

  return response.status;
};
