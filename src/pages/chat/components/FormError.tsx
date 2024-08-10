import { Component } from "solid-js";

interface FormErrorProps {
  error: string;
}

const FormError: Component<FormErrorProps> = (props) => {
  return (
    <p class={props.error ? "text-red-500 text-xs visible" : "text-red-500 text-xs hidden"}>
      {props.error}
    </p>
  );
};

export default FormError;