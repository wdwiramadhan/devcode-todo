import clsx from "clsx";
import * as React from "react";

interface SpinnerProps {
  size?: string;
  color?: string;
}

function Spinner(props: SpinnerProps) {
  const { size = "h-6 w-6", color } = props;
  return (
    <svg
      className={clsx("animate-spin text-white", size)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle
        className={clsx("opacity-25", color)}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={clsx("opacity-75", color)}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default Spinner;
