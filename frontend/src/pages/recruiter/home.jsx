import React, { useContext, useEffect, useState } from "react";
import { RecruiterContext } from "../../provider/recruiter_provider";
import { getSkillsDictionary } from "../../services/api/general_requests";
import { AuthContext } from "../../provider/auth_provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faInbox,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CandidateDetailModal from "../../components/modal/candidate";
import { DefaultModal } from "../../components/modal/default_modal";
import { sendCandidateInterviewInvite } from "../../services/api/recruiter_requests";

const RecruiterHome = () => {
  const { token } = useContext(AuthContext);
  const { candidates } = useContext(RecruiterContext);

  const [skillsDictionary, setSkillsDictionary] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleSearch = () => {
    if (searchInput !== "") {
      const filtered = candidates.filter((user) => {
        const search = searchInput.toLowerCase();

        const fullname = user.name + " " + user.lastname;

        const skillMatches = user.skills.some((skillId) => {
          const skill = skillsDictionary.find((ski) => ski.id === skillId);
          return skill?.name.toLowerCase().includes(search);
        });

        return (
          fullname.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          skillMatches
        );
      });

      setFilteredItems(filtered);
    } else {
      setFilteredItems(candidates);
    }
  };

  const changeSelectedList = (action, email) => {
    if (action) {
      setSelectedCandidates((prev) =>
        prev.includes(email) ? prev : [...prev, email]
      );
    } else {
      setSelectedCandidates((prev) => prev.filter((user) => user !== email));
    }
  };

  const sendInvites = async () => {
    if (selectedCandidates.length > 0) {
      await sendCandidateInterviewInvite(token, selectedCandidates)
        .then((response) => {
          alert("Convites enviados com sucesso!");
        })
        .catch((error) => {
          alert("Ocorreu um erro!");
        });
    }
  };

  const toggleModal = (candidate) => {
    setSelectedUser(candidate);
    setModal(!modal);
  };

  useEffect(() => {
    setFilteredItems(candidates);
  }, [candidates]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await getSkillsDictionary(token);

      setSkillsDictionary(skills);
    };
    fetchSkills();
  }, []);

  return (
    <div className="default-page-container">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl mb-3 font-bold lg:mb-0">Candidatos</h1>

          <div className="min-w-sm">
            <button
              className={`bg-(--action-button-color) text-white h-9 px-4 border-1 border-(--basic-border-color) rounded-lg mb-3 w-full active:scale-99 active:outline-0 hover:text-blue-200 lg:mb-0 transition-all duration-200 ease-in-out cursor-pointer ${
                selectedCandidates.length > 0 ? "scale-100" : "scale-0"
              }`}
              type="button"
              onClick={() => sendInvites()}
            >
              <FontAwesomeIcon icon={faInbox} className="mr-0" /> Convidar
              seleção para entrevista
            </button>
          </div>

          <div className="mb-3 lg:mb-0 min-w-sm flex">
            <input
              type="text"
              placeholder="Buscar candidato..."
              className="border-1 border-(--basic-border-color) flex-1 bg-(--card-background-color) h-9 px-4 rounded-s-lg focus:outline-0 text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              className="bg-(--action-button-color) text-white h-9 px-4 border-1 border-(--basic-border-color) rounded-e-lg active:scale-99 active:outline-0 hover:text-blue-200 cursor-pointer"
              type="button"
              onClick={() => handleSearch()}
            >
              <FontAwesomeIcon icon={faSearch} className="mr-0" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead className="bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2">
                  <FontAwesomeIcon icon={faArrowDown} />
                </th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2 hidden md:block">Email</th>
                <th className="px-4 py-2">Telefone</th>
                <th className="px-4 py-2 text-center">Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length > 0 &&
                filteredItems.map((candidate, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 hover:cursor-pointer text-sm lg:text-base"
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        name={candidate.id}
                        id={candidate.id}
                        onChange={(e) =>
                          changeSelectedList(e.target.checked, candidate.email)
                        }
                      />
                    </td>
                    <td
                      className="px-4 py-2"
                      onClick={() => toggleModal(candidate)}
                    >
                      {candidate.name}
                      <span className="hidden sm:block">
                        {" "}
                        {candidate.lastName}
                      </span>
                    </td>
                    <td
                      className="px-4 py-2 hidden md:block"
                      onClick={() => toggleModal(candidate)}
                    >
                      {candidate.email}
                    </td>
                    <td
                      className="px-4 py-2"
                      onClick={() => toggleModal(candidate)}
                    >
                      {candidate.telephone}
                    </td>
                    <td className="px-4 py-2 max-w-[200px]">
                      <div className="flex gap-1 justify-start lg:justify-center flex-wrap">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block rounded-full bg-blue-100 px-1 py-0.5 text-sm lg:text-2xl text-blue-900"
                            title={`${
                              skillsDictionary.find((ski) => ski.id === skill)
                                ?.name || "Linguagem não encontrada"
                            }`}
                          >
                            <i
                              className={`${
                                skillsDictionary.find((ski) => ski.id === skill)
                                  ?.icon || "fa-solid fa-question"
                              }`}
                            ></i>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <DefaultModal
        modal={modal}
        onClose={() => toggleModal(null)}
        children={
          <CandidateDetailModal
            candidate={selectedUser}
            skillsDictionary={skillsDictionary}
          />
        }
      />
    </div>
  );
};

export default RecruiterHome;
