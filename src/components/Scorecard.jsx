import React from "react";

const Scorecard = ({ icon, title, number, text,color }) => {
  return (
    <div className="flex">
      <div className={`flex p-3 gap-3 ${color} rounded-md`}>
        {/* Icon */}
        <div>
        <div className={`rounded-full p-2 ${color}`}>{icon}</div>
        </div>

        <div className="flex flex-col">
          <div className="text-lg">{title}</div>
          <h1 className="text-4xl">{number}</h1>
          <h1 className="text-sm">{text}</h1>
        </div>
        <div>
          {/* 3 dots */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
