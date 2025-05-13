import React from "react";

// Component responsible for rendering the login page UI

const Login = () => {
  // All Tailwind classes for styling components.

  const formContainer = "relative flex mt-10";
  const formInput =
    "peer w-full border-b-1 border-(--basic-border-color) py-3 focus:border-(--basic-focused-border-color) outline-0";
  const formLabel =
    "absolute origin-center select-none cursor-text opacity-60 bottom-full transition-all duration-200 peer-focus:bottom-full peer-placeholder-shown:bottom-1/4";

  return (
    // Main container for Login Page. Only frontend is implemented for now. The buttons and links has no functions.

    <div class="container h-full flex flex-col items-center justify-center transition-all duration-200">
      <form
        class="flex flex-col bg-(--card-background-color) pt-16 pb-10 px-10 rounded-2xl text-left min-w-[400px] h-fit border-1 border-(--basic-border-color)"
        action=""
      >
        <h2 class="text-3xl text-center font-medium">Bem vindo candidato!</h2>
        <h3 class="text-lg mt-2 text-center font-normal">
          Faça login com sua conta!
        </h3>
        <div class={formContainer}>
          <input
            class={formInput}
            type="email"
            name="email"
            id="email"
            placeholder=""
          />

          <label class={formLabel} htmlFor="email">
            Email
          </label>
        </div>
        <div class={formContainer}>
          <input
            class={formInput}
            type="password"
            name="password"
            id="password"
            placeholder=""
          />

          <label class={formLabel} htmlFor="password">
            Senha
          </label>
        </div>

        <button
          class="w-full bg-(--action-button-color) my-10 py-4 text-[20px] font-medium rounded-sm cursor-pointer transition-colors duration-300 text-white hover:bg-(--active-action-button-color) active:outline-0 active:scale-99 active:text-blue-200"
          type="button"
        >
          Login
        </button>
        <div class="flex justify-between">
          <div>
            <input
              class="cursor-pointer"
              type="checkbox"
              name="remember"
              id="remember"
            />
            <label class="" htmlFor="remember">
              {" "}
              Lembre-se de mim
            </label>
          </div>
          <a class="text-sm text-(--primary-highlight-color) hover:underline decoration-1 hover:cursor-pointer hover:text-(--secondary-highlight-color)">
            Esqueci a senha!
          </a>
        </div>
      </form>
      <div class="mt-5">
        <p class="text-[14px]">
          Ainda não é cadastrado?{" "}
          <a class="text-sm text-(--primary-highlight-color) hover:underline decoration-1 hover:cursor-pointer hover:text-(--secondary-highlight-color)">
            Crie uma conta!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
