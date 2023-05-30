import React from "react";
import s from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  iconStyles?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  iconStyles,
  className,
  ...props
}) => {
  return (
    <button
      className={s.button + (className ? ` ${className}` : "")}
      {...props}
    >
      {Icon && (
        <div className={s.iconContainer} style={iconStyles}>
          {Icon}
        </div>
      )}
      {props.children}
    </button>
  );
};

export default Button;
