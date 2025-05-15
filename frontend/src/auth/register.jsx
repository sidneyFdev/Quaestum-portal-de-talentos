import React from "react";
import { Link } from "react-router-dom";
import SkillSelection from "../components/register/skills-select";
import { RegisterFormation } from "../components/register/formations";

const Register = () => {
  // Lista de campos do formulário com metadados para renderização dinâmica
  const allFormComponents = [
    {
      type: "text",
      name: "name",
      label: "Nome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
    },
    {
      type: "text",
      name: "lastname",
      label: "Sobrenome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      column: "w-full",
      pattern: "",
      inputmode: "email",
    },
    {
      type: "text",
      name: "birthdate",
      label: "Data de Nascimento",
      column: "w-1/2",
      pattern: "",
      inputmode: "numeric",
    },
    {
      type: "tel",
      name: "telephone",
      label: "Telefone",
      column: "w-1/2",
      pattern: "\\(\\d{2}\\)\\s\\d{1}\\s\\d{4}-\\d{4}",
      inputmode: "tel",
    },
    {
      type: "text",
      name: "postcode",
      label: "CEP",
      column: "w-1/2",
      pattern: "\\d{5}-?\\d{3}",
      inputmode: "numeric",
    },
    {
      type: "text",
      name: "city",
      label: "Cidade",
      column: "w-1/3",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
    },
    {
      type: "text",
      name: "uf",
      label: "UF",
      column: "w-1/6",
      pattern: "[A-Z]{2}",
      inputmode: "text",
    },

    {
      type: "text",
      name: "address",
      label: "Endereço",
      column: "w-4/5",
      pattern: ".{3,}",
      inputmode: "text",
    },
    {
      type: "text",
      name: "addressnumber",
      label: "N°",
      column: "w-1/5",
      pattern: "\\d{1,6}",
      inputmode: "numeric",
    },
  ];

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
        {allFormComponents.map((val, index) => {
          return (
            <div
              key={val.name}
              className={`relative flex mt-6 px-2 ${val.column} `}
            >
              <input
                id={val.name}
                type={val.type}
                name={val.name}
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
            classes={
              "peer w-full border-1 border-(--basic-border-color) bg-(--card-background-color) text-[14px] focus:border-(--basic-focused-border-color) active:outline-0 rounded-[6px]"
            }
          />
        </div>

        <div className="w-full">
          <RegisterFormation />
        </div>
        <button
          className="w-full text-white bg-(--action-button-color) mt-10 py-4 mx-2 text-[20px] font-medium rounded-sm cursor-pointer transition-colors duration-300 hover:bg-(--active-action-button-color) active:outline-0 active:scale-99 hover:text-blue-100"
          type="button"
        >
          Cadastrar
        </button>
        <p className="mt-4 text-[14px text-center w-full">
          Já possui uma conta?{" "}
          <Link
            to={{
              pathname: "/auth/login",
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
