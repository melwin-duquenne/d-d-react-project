import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, type = "text", ...props }) => {
  return (
    <div className="flex flex-col mb-3">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        className="border bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default TextInput;
