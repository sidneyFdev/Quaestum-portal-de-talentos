import { faArrowRight, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendAResetToken } from "../../services/api/general_requests";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email.length > 0 && email.split("@").length > 1) {
      await sendAResetToken(email)
        .then((response) => {
          alert(
            "Foi enviado instruções para recuperação da sua senha para o email informado!"
          );
          navigate("/login");
        })
        .catch((err) => {
          alert("Por favor, insira um e-mail valido!");
        });
    } else {
      alert("Por favor, insira um e-mail valido!");
    }
  };

  return (
    <div className="default-page-container">
      <form className="default-form-container flex-col sm:max-w-[600px] ">
        <div className="w-full">
          <h2 className="text-center text-2xl font-semibold">
            Esqueceu sua senha?
          </h2>
        </div>
        <div className="mt-5">
          <p className="text-base text-center">
            Nós podemos enviar instruções para recuperação para seu email
            associado a sua conta.
          </p>
        </div>
        <div className="relative flex mt-10">
          <input
            className="peer default-input-full-border"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          <label className="default-label-anim-to-box" htmlFor="email">
            <FontAwesomeIcon icon={faMailBulk} /> Email
          </label>
        </div>
        <div className="w-full">
          <button
            className="default-submit-button"
            type="button"
            onClick={handleSubmit}
          >
            Enviar instruções
            <FontAwesomeIcon className="ml-4" icon={faArrowRight} />
          </button>
        </div>
        <div>
          <p className="text-xs opacity-80 text-center">
            Lembre-se de checar a caixa de spam caso não encontre a mensagem.
          </p>
        </div>
      </form>
      <p className="mt-4 text-sm text-center w-full">
        Lembrou se da senha?{" "}
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

export default ResetPassword;
