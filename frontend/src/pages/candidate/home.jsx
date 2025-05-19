import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/auth_provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <div className="default-page-container">Carregando dados...</div>;
  }

  const CurriculumBlock = ({ children, blockTitle }) => {
    const [showSection, setShowSection] = useState(false);
    const toggleSection = () => {
      setShowSection(!showSection);
    };

    return (
      <div className="bg-(--card-background-color) shadow-3xl p-4 rounded-2xl border-1 border-gray-100 flex flex-col mb-4">
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold text-gray-800">{blockTitle}</h4>
          <button
            type="button"
            className="cursor-pointer hover:text-red-500"
            onClick={() => toggleSection()}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${
            showSection
              ? "mt-5 opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 h-0 mt-0"
          }`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="default-page-container flex-col">
      <div className="h-full">
        <h1 className="text-3xl font-bold">Bem vindo, {userData.name}!</h1>
        <p className="text-sm text-center py-4">
          Veja abaixo as informações disponíveis em nosso banco de dados para
          que os recrutadores te encontrem:
        </p>
        <CurriculumBlock blockTitle="Dados Pessoais">
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Telefone:</strong> {userData.telephone}
          </p>
          <p>
            <strong>Data de nascimento:</strong> {userData.birthdate}
          </p>
          <p>
            <strong>Cidade:</strong> {userData.address.city} -{" "}
            {userData.address.uf}
          </p>
          <p>
            <strong>Rua:</strong> {userData.address.address} -{" "}
            {userData.address.number}
          </p>
          <p>
            <strong>CEP:</strong> {userData.address.postcode}
          </p>
        </CurriculumBlock>
        <CurriculumBlock blockTitle="Formações">
          {userData.educations.length > 0 ? (
            userData.educations.map((edu, index) => {
              return (
                <div className="pb-5" key={index}>
                  <p>
                    <strong>Curso:</strong> {edu.course}
                  </p>
                  <p>
                    <strong>Instituição:</strong> {edu.institution}
                  </p>
                  <p>
                    <strong>Data de inicio:</strong> {edu.startDate}
                  </p>
                  <p>
                    <strong>Data de conclusão:</strong> {edu.finishedDate}
                  </p>
                </div>
              );
            })
          ) : (
            <div>Sem formações</div>
          )}
        </CurriculumBlock>
      </div>
    </div>
  );
};

export default Home;
