import React from "react";
import {Link} from "react-router-dom"

const Login = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await CandidateLogon(event.email, event.password)
  }

  const formContainer = "relative flex mt-10";
  return (

    <div className="default-page-container">
      <form
        className="default-form-container flex-col"
        action=""
      >
        <h2 className="text-3xl text-center font-medium">Bem vindo candidato!</h2>
        <h3 className="text-lg mt-2 text-center font-normal">
          Faça login com sua conta
        </h3>
        <div className={formContainer}>
          <input
            className="peer default-input-border-bottom"
            type="email"
            name="email"
            id="email"
            placeholder=""
          />

          <label className="default-label-anim-out-box" htmlFor="email">
            Email
          </label>
        </div>
        <div className={formContainer}>
          <input
            className="peer default-input-border-bottom"
            type="password"
            name="password"
            id="password"
            placeholder=""
          />

          <label className="default-label-anim-out-box" htmlFor="password">
            Senha
          </label>
        </div>

        <button
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
          <Link to={{
            pathname: "/resetpassword"
          }} className="default-link-button-small">
            Esqueci a senha!
          </Link>
        </div>
      </form>
      <div className="mt-5">
        <p className="text-[14px]">
          Ainda não é cadastrado?{" "}
          <Link to={{
            pathname: "/register"
          }} className="default-link-button-small">
            Crie uma conta!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
