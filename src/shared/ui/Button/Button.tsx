import React from "react";
import s from "./Button.module.scss";
import {RotatingLines} from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  loading?: boolean;
  iconStyles?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  iconStyles,
  className,
                                         loading,
  ...props
}) => {
  return (
    <button
      className={s.button + (className ? ` ${className}` : "") + (loading ? " " + s.loadingButton : "")}
      disabled={!!loading}
      {...props}
    >
      <div className={s.content + (loading ? " " + s.invisible : "")}>
        {Icon && (
          <div className={s.iconContainer} style={iconStyles}>
            {Icon}
          </div>
        )}
        {props.children}
      </div>
      {loading && <div className={s.loading}>
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
        />
      </div>}
    </button>
  );
};

export default Button;
