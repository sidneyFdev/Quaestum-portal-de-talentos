import React from "react";

export const DefaultModal = ({ modal, onClose, children }) => {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-lg cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-close" />
        </button>
        {children}
      </div>
    </div>
  );
};
