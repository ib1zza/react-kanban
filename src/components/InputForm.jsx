import React, {useEffect} from 'react';
import s from "../styles/Block.module.css"

const InputForm = ({handleAdd}) => {
  const [value, setValue] = React.useState('');

  return (
    <div className={s.input}>
      <input type="text" required value={value} onChange={e => setValue(e.target.value)}/>
      <button onClick={() => handleAdd(value)}>Submit</button>
    </div>
  );
};

export default InputForm;
