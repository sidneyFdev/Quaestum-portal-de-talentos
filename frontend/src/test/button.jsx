import React from "react";

export const ConsoleButton = ({ item }) => {
  return (
    <div>
      <button
        type="button"
        className=" rounded-2xl hover:cursor-pointer bg-amber-200 p-5"
        onClick={() => console.log(item)}
      >
        Console
      </button>
    </div>
  );
};
