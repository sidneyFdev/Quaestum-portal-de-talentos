import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkillSelection from "../../components/register/skills-select";
import { RegisterFormation } from "../../components/register/formations";
import { GetAddressFromViaCEP } from "../../services/viaCEP";
import { InsertNewUser } from "../../services/api/general_requests";

const Register = () => {
  const sanitizeInput = (name, value) => {
    switch (name) {
      case "postcode": {
        let digits = value.replace(/\D/g, "").slice(0, 8);
        return digits.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
      }
      case "address_number":
        return value.replace(/\D/g, "").slice(0, 6);
      case "telephone": {
        let digits = value.replace(/\D/g, "").slice(0, 11);
        return digits
          .replace(/^(\d{0,2})/, "($1")
          .replace(/^(\(\d{2})(\d{0,1})/, "$1) $2")
          .replace(/^(\(\d{2}\)\s\d{1})(\d{0,4})/, "$1 $2")
          .replace(/^(\(\d{2}\)\s\d{1}\s\d{4})(\d{0,4})/, "$1-$2");
      }
      case "birthdate": {
        let digits = value.replace(/\D/g, "").slice(0, 8);
        return digits
          .replace(/^(\d{2})(\d)/, "$1/$2")
          .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");
      }
      case "uf":
        return value
          .replace(/[^A-Za-z]/g, "")
          .toUpperCase()
          .slice(0, 2);
      default:
        return value;
    }
  };

  const prepareValueForBackend = (name, value) => {
    switch (name) {
      case "postcode":
      case "address_number":
        return value.replace(/\D/g, "");
      case "telephone":
        return value.replace(/\D/g, "");
      case "birthdate":
        return value;
      case "uf":
        return value.toUpperCase();
      default:
        return value;
    }
  };

  const navigate = useNavigate();
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
      minLength: 2,
    },
    {
      value: "",
      type: "text",
      name: "last_name",
      label: "Sobrenome",
      column: "w-full",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
      minLength: 2,
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
      maxLength: 16,
      minLength: 14,
    },
    {
      value: "",
      type: "text",
      name: "postcode",
      label: "CEP",
      column: "w-1/2",
      pattern: "\\d{8}",
      inputmode: "numeric",
      maxLength: 9,
      minLength: 9,
    },
    {
      value: "",
      type: "text",
      name: "city",
      label: "Cidade",
      column: "w-1/3",
      pattern: "[A-Za-zÀ-ÿ\\s]{2,}",
      inputmode: "text",
      minLength: 2,
    },
    {
      value: "",
      type: "text",
      name: "uf",
      label: "UF",
      column: "w-1/6",
      pattern: "[A-Z]{2}",
      inputmode: "text",
      maxLength: 2,
      minLength: 2,
    },
    {
      value: "",
      type: "text",
      name: "address",
      label: "Endereço",
      column: "w-4/5",
      pattern: ".{3,}",
      inputmode: "text",
      minLength: 3,
    },
    {
      value: "",
      type: "text",
      name: "address_number",
      label: "N°",
      column: "w-1/5",
      pattern: "\\d{1,6}",
      inputmode: "numeric",
      maxLength: 6,
      minLength: 1,
    },
  ]);

  const toggleFormComponent = (index, value) => {
    setFormComponents((prevComponents) =>
      prevComponents.map((component, i) => {
        if (i === index) {
          return { ...component, value: value };
        }
        return component;
      })
    );

    if (formComponents[index].name === "postcode" && value.length === 9) {
      GetAddressFromViaCEP(value).then((data) => {
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
          })
        );
      });
    }
  };

  const handleSubmit = () => {
    let formData = {
      educations: [],
      skills: [],
    };
    for (const component of formComponents) {
      if (
        component.value === "" ||
        (component.minLength && component.value.length < component.minLength)
      ) {
        alert(`Campo ${component.label} é inválido! Tente novamente.`);
        return;
      }

      if (
        component.name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(component.value)
      ) {
        alert(`Campo ${component.label} é inválido! Tente novamente.`);
        return;
      }

      formData[component.name] = prepareValueForBackend(
        component.name,
        component.value
      );
    }
    candidateFormations.forEach((formation) => {
      formData["educations"] = [
        ...formData.educations,
        {
          course: formation.course,
          institution: formation.institution,
          start_date: formation.start_date,
          finished_date: formation.finished_date,
        },
      ];
    });
    candidateSkills.forEach((skill) => {
      formData["skills"] = [...formData.skills, skill.value];
    });
    InsertNewUser(formData)
      .then((response) => {
        if (response == 201) {
          alert(
            `Seu cadastro foi realizado! Para prosseguir, confirme o e-mail cadastrado.`
          );
          navigate("/login");
        } else {
          alert(`ocorreu um erro interno.`);
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          alert("Email já cadastrado!");
        }
      });
  };

  return (
    <div className="default-page-container">
      <form action="" className="default-form-container flex-wrap">
        <div className="w-full">
          <h2 className="text-[24px] font-bold">Informações cadastrais</h2>
        </div>

        {formComponents.map((val, index) => {
          return (
            <div
              key={val.name}
              className={`relative flex mt-3 px-2 ${val.column} `}
            >
              <input
                id={val.name}
                type={val.type}
                name={val.name}
                value={val.value}
                onChange={(e) => {
                  const newValue = sanitizeInput(val.name, e.target.value);
                  toggleFormComponent(index, newValue);

                  if (
                    val.name === "postcode" &&
                    newValue.replace(/\D/g, "").length === 8
                  ) {
                    GetAddressFromViaCEP(newValue.replace(/\D/g, "")).then(
                      (data) => {
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
                          })
                        );
                      }
                    );
                  }
                }}
                placeholder=" "
                pattern={val.pattern}
                inputMode={val.inputmode}
                minLength={val.minLength}
                maxLength={val.maxLength}
                className="peer default-input-full-border"
              />

              <label htmlFor={val.name} className="default-label-anim-to-box">
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
              "peer w-full border-1 border-(--basic-border-color) bg-(--card-background-color) text-[14px] p-3 focus:border-(--basic-focused-border-color) outline-0 rounded-[6px]"
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
          className="default-submit-button "
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
            className="default-link-button-small"
          >
            Faça Login!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
