import * as React from "react";
import clsx from "clsx";
import { Spinner } from "..";

interface ButtonIconProps {
  children: React.ReactNode;
  variant: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  "data-cy"?: string;
}

function ButtonIcon(props: ButtonIconProps) {
  const {
    children,
    variant = "primary",
    isLoading = false,
    isDisabled = false,
    icon,
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
        "w-[100px] h-[37px] sm:w-[159px] sm:h-[54px]",
        varianButton[variant] === undefined
          ? varianButton["primary"]
          : varianButton[variant]
      )}
      onClick={props.onClick}
      disabled={isDisabled}
      data-cy={props["data-cy"]}
    >
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex items-center">
          {icon}
          <span
            className={clsx(
              "ml-0 sm:ml-1 font-semibold",
              "text-xs leading-[18px] sm:text-lg sm:leading-[27px]"
            )}
          >
            {children}
          </span>
        </div>
      )}
    </button>
  );
}

export default ButtonIcon;
