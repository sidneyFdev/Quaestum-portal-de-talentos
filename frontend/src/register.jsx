import React, { useState } from "react";

const Register = () => {
  const formInputContainer = "relative flex mt-10 px-2";
  const formInput =
    "peer w-full border-1 border-[var(--basic-border-color)] p-3 focus:border-[var(--basic-focused-border-color)] outline-0 rounded-l";
  const formLabel =
    "absolute origin-center select-none cursor-text opacity-80 bottom-full";

  const allFormComponents = [
    {
      type: "text",
      name: "name",
      placeholder: "Primeiro nome...",
      label: "Nome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
      mask: null,
    },
    {
      type: "text",
      name: "lastname",
      placeholder: "Sobrenome completo...",
      label: "Sobrenome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
      mask: null,
    },
    {
      type: "email",
      name: "email",
      placeholder: "joedoe@email.com",
      label: "Email",
      column: "w-full",
      pattern: "",
      inputmode: "email",
      mask: null,
    },
    {
      type: "text",
      name: "birthdate",
      placeholder: "01/01/2025",
      label: "Data de Nascimento",
      column: "w-1/2",
      pattern: "",
      inputmode: "numeric",
      mask: "99/99/9999",
    },
    {
      type: "tel",
      name: "telephone",
      placeholder: "(XX) X XXXX-XXXX",
      label: "Telefone",
      column: "w-1/2",
      pattern: "\\(\\d{2}\\)\\s\\d{1}\\s\\d{4}-\\d{4}",
      inputmode: "tel",
      mask: "+55 (99) 99999-9999",
    },
    {
      type: "text",
      name: "city",
      placeholder: "Cidade",
      label: "Cidade",
      column: "w-1/3",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
      mask: null,
    },
    {
      type: "text",
      name: "uf",
      placeholder: "SP",
      label: "UF",
      column: "w-1/6",
      pattern: "[A-Z]{2}",
      inputmode: "text",
      mask: null,
    },
    {
      type: "text",
      name: "postcode",
      placeholder: "00000-000",
      label: "CEP",
      column: "w-1/2",
      pattern: "\\d{5}-?\\d{3}",
      inputmode: "numeric",
      mask: null,
    },
    {
      type: "text",
      name: "address",
      placeholder: "Rua das Limas",
      label: "Endereço",
      column: "w-4/5",
      pattern: ".{3,}",
      inputmode: "text",
      mask: null,
    },
    {
      type: "text",
      name: "addressnumber",
      placeholder: "123",
      label: "Número",
      column: "w-1/5",
      pattern: "\\d{1,6}",
      inputmode: "numeric",
      mask: null,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Senha...",
      label: "Senha",
      column: "w-full",
      pattern: ".{6,}",
      inputmode: "text",
      mask: null,
    },
    {
      type: "password",
      name: "passwordconfirm",
      placeholder: "Senha",
      label: "Confirme sua senha",
      column: "w-full",
      pattern: ".{6,}",
      inputmode: "text",
      mask: null,
    },
  ];

  return (
    <div className="container max-w-3xl">
      <form action="" className="flex flex-wrap w-full">
        {allFormComponents.map((val, index) => {
          return (
            <div
              key={val.name}
              className={`${formInputContainer} ${val.column}`}
            >
              <input
                type={val.text}
                name={val.name}
                placeholder={val.placeholder}
                pattern={val.pattern}
                inputMode={val.inputmode}
                className={formInput}
              />

              <label htmlFor={val.name} className={formLabel}>
                {val.label}
              </label>
            </div>
          );
        })}
        <button
          class="w-full bg-blue-500 my-10 py-4 mx-2 text-[20px] font-medium rounded-sm cursor-pointer transition-colors duration-300 hover:bg-blue-400 active:outline-0 active:scale-99"
          type="button"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
