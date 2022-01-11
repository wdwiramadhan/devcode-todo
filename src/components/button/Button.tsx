import * as React from "react";
import clsx from "clsx";
import { Spinner } from "..";

interface ButtonProps {
  children: React.ReactNode;
  variant: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  "data-cy"?: string;
}

function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    isLoading = false,
    isDisabled = false,
  } = props;
  const varianButton: { [key: string]: string } = {
    primary: "text-white bg-primary",
    danger: "text-white bg-danger",
    dark: "text-[#4A4A4A] bg-[#F4F4F4]",
  };

  return (
    <button
      className={clsx(
        "flex justify-center items-center rounded-[45px]",
        "flex justify-center items-center rounded-[45px]",
        "w-[117px] h-[48px] sm:w-[150px] sm:h-[54px]",
        varianButton[variant] === undefined
          ? varianButton["primary"]
          : varianButton[variant],
        isDisabled && "opacity-50"
      )}
      onClick={props.onClick}
      disabled={isDisabled}
      data-cy={props["data-cy"]}
    >
      {isLoading && <Spinner />}
      {!isLoading && (
        <span
          className={clsx(
            "font-semibold text-base leading-6 sm:text-lg sm:leading-[27px]"
          )}
        >
          {children}
        </span>
      )}
    </button>
  );
}

export default Button;
