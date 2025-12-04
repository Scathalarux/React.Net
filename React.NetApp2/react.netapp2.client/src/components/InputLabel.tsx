import type { ChangeEvent } from "react";

type InputLabelProps = {
  onChange: (e: ChangeEvent) => void;
  type: string;
  nombre: string;
  id: string;
  labelText: string;
  value: string;
  disabled: boolean;
};

export function InputLabel({
  onChange,
  type,
  nombre,
  id,
  labelText,
  value,
  disabled,
}: InputLabelProps) {
  return (
    <div className="flex flex-col  gap-2 justify-center w-80">
      <label htmlFor={nombre} className="self-start">
        {labelText}
      </label>
      <input
        type={type}
        name={nombre}
        id={id}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={`${disabled? 'bg-gray-400 text-black':'bg-sky-800 text-white'}  px-3 py-2 my-2 rounded-xl`}
      />
    </div>
  );
}
