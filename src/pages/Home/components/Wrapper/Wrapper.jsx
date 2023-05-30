import React from  "react";
import s from "./Wrapper.module.css";

const Wrapper = ({children}) => {
    return (
        <div className={s.wrapper}>
            {children}
        </div>
    );
};
export default Wrapper;