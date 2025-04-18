import React from "react";
import classNames from "classnames";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost: "bg-transparent hover:bg-blue-800 text-white",
  };

  return (
    <button
      className={classNames(
        "rounded px-4 py-2 font-medium transition",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
