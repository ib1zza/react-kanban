import React from 'react';
import { CirclePicker } from 'react-color';
import s from './ColorPicker.module.scss';

interface IProps {
    color: string;
    onChange: (color: string) => void;
}
const ColorPicker: React.FC<IProps> = ({ onChange, color }) => (
    <div className={s.colorPicker}>
        <p>Choose color:</p>
        <CirclePicker
            className={s.pickerBlock}
            color={color}
            onChange={(color) => onChange(color.hex)}
        />
    </div>
);

export default ColorPicker;
