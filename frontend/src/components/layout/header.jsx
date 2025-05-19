import React, { useContext } from "react";
import {
  faBars,
  faDoorOpen,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/auth_provider";

const Header = () => {
  const { LogoutFromPlatform, isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitLogout = async () => {
    await LogoutFromPlatform()
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        return;
      });
  };

  const navigateToRecruiterPage = () => {
    navigate("/recruiter");
  };

  const navigateToCandidatePage = () => {
    navigate("/home");
  };

  const tabItems = [
    {
      label: "Area do recrutador",
      pathname: "/recruiter",
      restricted: true,
      icon: <FontAwesomeIcon icon={faUserAlt} />,
      function: navigateToRecruiterPage,
    },
    {
      label: "Area do candidato",
      pathname: "/home",
      restricted: true,
      icon: <FontAwesomeIcon icon={faUserAlt} />,
      function: navigateToCandidatePage,
    },
    {
      label: "Logout",
      pathname: "/login",
      restricted: false,
      icon: <FontAwesomeIcon icon={faDoorOpen} />,
      function: handleSubmitLogout,
    },
  ];

  return (
    <header className="flex w-full border-(--active-action-button-color) text-black">
      <div className="flex justify-center lg:justify-between items-center flex-1">
        <h1
          className={`font-semibold flex-1 text-3xl select-none ${
            token === null
              ? "block text-center lg:block"
              : "hidden text-left lg:block"
          } `}
        >
          Portal de Talentos
        </h1>
        <div>
          {tabItems.map((item, index) => {
            if (item.restricted && !isAdmin) return null;
            if (!token) return null;
            if (location.pathname === item.pathname) return null;
            return (
              <button
                key={index}
                type="button"
                onClick={() => item.function()}
                className=" hover:text-gray-800 cursor-pointer pr-5 pl-5 lg:pl-10 lg:pr-0 active:scale-98"
              >
                {item.icon} {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
