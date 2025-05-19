import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 mt-10 text-sm text-gray-900 flex justify-between">
      <p className="hidden md:block">
        Este site é fictício e foi desenvolvido para fins de demonstração por{" "}
        <span className="font-semibold">Sidney Figueiredo</span>.
      </p>
      <p className="block md:hidden">
        Desenvolvido <span className="font-semibold">Sidney Figueiredo</span>.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/sidneyFdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-950 font-semibold hover:underline"
        >
          <i className="fa-brands fa-github"></i>
          GitHub
        </a>
        <a
          href="www.linkedin.com/in/sidney-figueiredo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-950 font-semibold hover:underline"
        >
          <i className="fa-brands fa-linkedin"></i> LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
