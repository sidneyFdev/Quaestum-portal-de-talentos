import { faArrowRight, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmailAccount } from "../../services/api/general_requests";

const ConfirmAccount = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const urlParts = window.location.pathname.split("/");
    const token = urlParts[urlParts.length - 1];

    const hasMinimumLength = password.length >= 6;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const isEqual = password === confirmPassword;

    if (!password || !confirmPassword) {
      alert("Por favor, preencha ambos os campos de senha.");
      return;
    }

    if (!hasMinimumLength) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!hasLetters || !hasNumbers) {
      alert("A senha deve conter letras e números.");
      return;
    }

    if (!isEqual) {
      alert("As senhas não coincidem.");
      return;
    }

    verifyEmailAccount(password, token)
      .then((response) => {
        if (response.code === 200) {
          alert("Senha cadastrada com sucesso!");
          navigate("/login");
        } else {
          alert("Ocorreu um erro!");
        }
      })
      .catch((error) => {
        alert("Ocorreu um erro!");
      });
  };

  return (
    <div className="default-page-container">
      <form className="default-form-container flex-col sm:max-w-[600px] ">
        <div className="w-full">
          <h2 className="text-center text-2xl font-semibold">
            Confirme sua conta!
          </h2>
        </div>
        <div className="mt-5">
          <p className="text-base text-center">
            Defina abaixo sua nova senha. Lembre-se de não compartilha-la com
            ninguém!
          </p>
        </div>
        <div className="relative flex mt-10">
          <input
            className="peer default-input-full-border"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
          />

          <label className="default-label-anim-to-box" htmlFor="password">
            <FontAwesomeIcon icon={faUserSecret} /> Senha
          </label>
        </div>
        <div className="relative flex mt-10">
          <input
            className="peer default-input-full-border"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=""
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
          />

          <label
            className="default-label-anim-to-box"
            htmlFor="confirmPassword"
          >
            <FontAwesomeIcon icon={faUserSecret} /> Confirme sua senha
          </label>
        </div>
        <div className="w-full">
          <button
            className="default-submit-button"
            type="button"
            onClick={handleSubmit}
          >
            Definir Senha
            <FontAwesomeIcon className="ml-4" icon={faArrowRight} />
          </button>
        </div>
        <div>
          <p className="text-xs opacity-80 text-center">
            A senha precisa possuir letras, números e pelo menos 6 caracteres
          </p>
        </div>
      </form>
      <p className="mt-4 text-sm text-center w-full">
        Já possui senha?{" "}
        <Link
          to={{
            pathname: "/login",
          }}
          className="default-link-button-small"
        >
          Faça Login!
        </Link>
      </p>
    </div>
  );
};

export default ConfirmAccount;
