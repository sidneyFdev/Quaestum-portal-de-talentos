import axios from "axios";
import React, { useState } from "react";
import {Link} from "react-router-dom"
import { components } from "react-select";

const LoginAdmin = () => {

  const [formFields , setFormsFields] = useState([
    {
      type: "email",
      name: "email",
      label: "Email",
      value: "",
    },
    {
      type:"password",
      name:"password",
      label: "Senha",
      value:"",
    }
  ])

  const handleSubmit =  async (params) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}recruiter/login`, {
        email: params[0].value,
        password: params[1].value
      })
      alert("Realizado Login")

    } catch (error) { 
      if (error.response?.status === 400){
        alert("Usuario e senha inválidos.")
      } else {
        alert("Erro interno ou de conexão.")
      }
    }
  }

  const toggleFormComponent = (index, value) => {
    setFormsFields((prevComponents)=> 
      prevComponents.map((component, i) => {
        if (i === index) {
          return { ...component, value: value};
        }
        return component
      })
    )
  }

  return (

    <div className="default-page-container">
      <form
        className="default-form-container flex-col"
        action=""
      >
        <h2 className="text-3xl text-center font-medium">Bem vindo recrutador!</h2>
        <h3 className="text-lg mt-2 text-center font-normal">
          Faça login com sua conta
        </h3>


        {
          formFields.map((form, index) => {
            return (
              <div className="relative flex mt-10" key={index}>
              <input
                className="peer default-input-border-bottom"
                type={form.type}
                name={form.name}
                id={form.name}
                onChange={(e) => {toggleFormComponent(index, e.target.value)}}
                placeholder=" "
              />

              <label className="default-label-anim-out-box" htmlFor={form.name}>
                {form.label}
              </label>
                  </div>
              )
          })
        }

        <button
          onClick={() => handleSubmit(formFields)}
          className="default-submit-button"
          type="button"
        >
          Login
        </button>
        <div className="flex justify-between">
          <div>
            <input
              className="cursor-pointer"
              type="checkbox"
              name="remember"
              id="remember"
            />
            <label className="" htmlFor="remember">
              {" "} Lembre-se de mim
            </label>
          </div>
          <a className="text-sm text-(--primary-highlight-color) hover:underline decoration-1 hover:cursor-pointer hover:text-(--secondary-highlight-color)">
            Esqueci a senha!
          </a>
        </div>
      </form>
      <div className="mt-5">
      </div>
    </div>
  );
};

export default LoginAdmin;
