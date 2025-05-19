import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAllCandidates = async (token) => {
  const response = await axios.get(`${API}candidates/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCandidateAllData = async (token, email) => {
  const response = await axios.post(
    `${API}candidates/single`,
    {
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const sendCandidateInterviewInvite = async (token, emailList) => {
  const formatInterviewDate = () => {
    let date = new Date();
    let utilDay = 0;

    while (utilDay < 3) {
      date.setDate(date.getDate() + 1);

      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        utilDay++;
      }
    }

    date.setHours(14, 0, 0, 0);

    let interviewDate = date.toLocaleString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return interviewDate;
  };

  const interviewDate = formatInterviewDate();

  const response = await axios.post(
    `${API}candidates/invite`,
    {
      emailList: emailList,
      interviewDate: interviewDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.status.code;
};
