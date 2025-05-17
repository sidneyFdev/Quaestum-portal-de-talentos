import { faArrowRight, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    return (
        <div
            className="default-page-container"
        >
            <form className="default-form-container flex-col sm:max-w-[600px] ">
                <div className="w-full">
                    <h2 className="text-center text-2xl font-semibold">Esqueceu sua senha?</h2>
                </div>
                <div className="mt-5">
                    <p className="text-base text-center">Nós podemos enviar instruções para recuperação para seu email associado a sua conta.</p>
                </div>
                <div className="relative flex mt-10">

                    <input 
                        className="peer default-input-full-border"
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""    
                    />

                    <label 
                        className="default-label-anim-to-box"
                        htmlFor="email"
                    >
                        <FontAwesomeIcon icon={faMailBulk} />{" "}
                        Email
                    </label>
                </div>
                <div className="w-full">
                    <button 
                        className="default-submit-button"
                        type="button"
                    >
                        Enviar instruções 
                        <FontAwesomeIcon className="ml-4" icon={faArrowRight} />
                    </button>
                </div>
                <div>
                    <p className="text-xs opacity-80 text-center">Lembre-se de checar a caixa de spam caso não encontre a mensagem.</p>
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
    )
}

export default ResetPassword;