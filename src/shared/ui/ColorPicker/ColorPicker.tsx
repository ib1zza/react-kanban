import React, { memo } from 'react';
import { CirclePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { colorsForColumns } from 'shared/constants/colorsForColumns';
import s from './ColorPicker.module.scss';

interface IProps {
    color: string;
    onChange: (color: string) => void;
}
const ColorPicker = ({ onChange, color }: IProps) => {
    const { t } = useTranslation();

    return (
        <div className={s.colorPicker}>
            <p>
                {t('Выберите цвет')}
                :
            </p>
            <CirclePicker
                className={s.pickerBlock}
                color={color}
                circleSpacing={0}
                colors={colorsForColumns}
                onChange={(color) => onChange(color.hex)}
            />
        </div>
    );
};

export default memo(ColorPicker);
