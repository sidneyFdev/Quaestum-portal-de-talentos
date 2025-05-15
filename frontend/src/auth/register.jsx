import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkillSelection from "../components/register/skills-select";
import { RegisterFormation } from "../components/register/formations";
import { GetAddressFromViaCEP } from "../services/viaCEP";
import CandidateRequest from '../services/candidate_api';

const Register = () => {
  // Lista de campos do formulário com metadados para renderização dinâmica
  const navigate = useNavigate()
  const {InsertNewCandidate} = CandidateRequest()
  const [candidateFormations, setCandidateFormations] = useState([]);
  const [candidateSkills, setCandidateSkills] = useState([]);
  const [formComponents, setFormComponents] = useState([
    {
      value: "",
      type: "text",
      name: "name",
      label: "Nome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
    },
    {
      value: "",
      type: "text",
      name: "lastname",
      label: "Sobrenome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
    },
    {
      value: "",
      type: "email",
      name: "email",
      label: "Email",
      column: "w-full",
      pattern: "",
      inputmode: "email",
    },
    {
      value: "",
      type: "text",
      name: "birthdate",
      label: "Data de Nascimento",
      column: "w-1/2",
      pattern: "",
      inputmode: "numeric",
    },
    {
      value: "",
      type: "tel",
      name: "telephone",
      label: "Telefone",
      column: "w-1/2",
      pattern: "\\(\\d{2}\\)\\s\\d{1}\\s\\d{4}-\\d{4}",
      inputmode: "tel",
    },
    {
      value: "",
      type: "text",
      name: "postcode",
      label: "CEP",
      column: "w-1/2",
      pattern: "\\d{5}-?\\d{3}",
      inputmode: "numeric",
    },
    {
      value: "",
      type: "text",
      name: "city",
      label: "Cidade",
      column: "w-1/3",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
    },
    {
      value: "",
      type: "text",
      name: "uf",
      label: "UF",
      column: "w-1/6",
      pattern: "[A-Z]{2}",
      inputmode: "text",
    },

    {
      value: "",
      type: "text",
      name: "address",
      label: "Endereço",
      column: "w-4/5",
      pattern: ".{3,}",
      inputmode: "text",
    },
    {
      value: "",
      type: "text",
      name: "addressnumber",
      label: "N°",
      column: "w-1/5",
      pattern: "\\d{1,6}",
      inputmode: "numeric",
    },
  ]);

  const toggleFormComponent = (index, value) => {
    setFormComponents((prevComponents) =>
      prevComponents.map((component, i) => {
        if (i === index) {
          return { ...component, value: value };
        }
        return component;
      }))

    if (formComponents[index].name === "postcode" && value.length === 8) {
      GetAddressFromViaCEP(value)
        .then(data=>{
          setFormComponents((prevComponents) =>
            prevComponents.map((component) => {
              if (component.name === "city") {
                return { ...component, value: data.localidade };
              }
              if (component.name === "uf") {
                return { ...component, value: data.uf };
              }
              if (component.name === "address") {
                return { ...component, value: data.logradouro };
              }
              return component;
            }))
        })
    }
  }

  const handleSubmit = () => {
    let formData = {
      'educations': [],
      'skills': [],
    }
    formComponents.forEach((component) => {
      if (component.value === "" || component.value.length < 2) {
        alert(`Campo ${component.label} é invalido! Tente novamente.`)
        return
      } else if (component.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(component.value)) {
        alert(`Campo ${component.label} é invalido! Tente novamente.`)
        return
      }
      formData[component.name] = component.value
    })
    candidateFormations.forEach((formation) => {
      formData['educations'] = [...formData.educations, {
        course: formation.course,
        institution: formation.institution,
        conclusion: formation.conclusion,
      }]
    })
    candidateSkills.forEach((skill) => {
      formData['skills'] = [...formData.skills, skill.value]
    })
    InsertNewCandidate(formData)
      .then((response) => {
        console.log(response)
        if (response == 201) {
          alert(`Seu cadastro foi realizado! Para prosseguir, confirme o e-mail cadastrado.`)
          navigate('/login')
        } else {
          alert(`ocorreu um erro interno.`)
        }
      }
      )
    
    // if (response == 201) {
    //   alert(`Seu cadastro foi realizado! Para prosseguir, confirme o e-mail cadastrado.`)
    //   navigate('/login') 
    // } else {
    //   alert(`ocorreu um erro interno.`)
    // }
  }

  return (
    // Somente frontend e rotas estão implementadas no momento.
    <div className="flex flex-col items-center p-6 text-center justify-center min-w-full">
      <form
        action=""
        className="flex flex-wrap w-full max-w-7xl rounded-1 bg-(--card-background-color) rounded-[1rem] px-6 py-4 border-1 border-(--basic-border-color)"
      >
        <div className="w-full">
          <h2 className="text-[24px] font-bold">Informações cadastrais</h2>
        </div>

        {/* Mapeia os campos declarados para gerar os inputs dinamicamente */}
        {formComponents.map((val, index) => {

          return (
            <div
              key={val.name}
              className={`relative flex mt-6 px-2 ${val.column} `}
            >
              <input
                id={val.name}
                type={val.type}
                name={val.name}
                value={val.value}
                onChange={(e) => {toggleFormComponent(index, e.target.value)}}
                placeholder=" "
                pattern={val.pattern}
                inputMode={val.inputmode}
                className="peer w-full border-1 border-(--basic-border-color) bg-(--card-background-color) text-[14px] p-3 focus:border-(--basic-focused-border-color) outline-0 rounded-[6px]"
              />

              <label
                htmlFor={val.name}
                className="absolute left-5 translate-y-1/2 origin-center select-none cursor-text opacity-80 bottom-full transition-all duration-100 text-[10px] -top-0 peer-focus:-top-0 peer-focus:text-[10px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/3 max-sm:peer-placeholder-shown:text-[12px]max-sm:peer-placeholder-shown:top-1/"
              >
                {val.label}
              </label>
            </div>
          );
        })}
        <div className="relative flex mt-6 px-2 w-full">
          <SkillSelection
            setCandidateSkills={setCandidateSkills}
            candidateSkills={candidateSkills}
            classes={
              "peer w-full border-1 border-(--basic-border-color) bg-(--card-background-color) text-[14px] focus:border-(--basic-focused-border-color) active:outline-0 rounded-[6px]"
            }
          />
        </div>

        <div className="w-full">
          <RegisterFormation 
            setCandidateFormations={setCandidateFormations}
            candidateFormations={candidateFormations}
          />
        </div>
        <button
          className="w-full text-white bg-(--action-button-color) mt-10 py-4 mx-2 text-[20px] font-medium rounded-sm cursor-pointer transition-colors duration-300 hover:bg-(--active-action-button-color) active:outline-0 active:scale-99 hover:text-blue-100"
          type="button"
          onClick={handleSubmit}
        >
          Cadastrar
        </button>
        <p className="mt-4 text-[14px text-center w-full">
          Já possui uma conta?{" "}
          <Link
            to={{
              pathname: "/login",
            }}
            className="text-sm text-(--primary-highlight-color) hover:underline decoration-1 hover:cursor-pointer hover:text-(--secondary-highlight-color)"
          >
            Faça Login!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
