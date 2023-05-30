import React from 'react';
import s from "../styles/Block.module.css";

const SelectForm = ({items, handleSelect}) => {
  return (
      <div className={s.input}>
        <select defaultValue={"default"} onChange={handleSelect}>
          <option value="default" disabled >Выберите задачу</option>
          {
            items.map(item => {
              return <option key={item.id} value={item.id}>{item.title}</option>
            })
          }
        </select>
    </div>
  );
};

export default SelectForm;
