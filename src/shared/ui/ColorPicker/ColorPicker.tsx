import React, { memo } from 'react';
import { CirclePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
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
                colors={['#E77E7E', '#D7B596', '#B3D796', '#87C1DA', '#AF7EEF',
                    '#E79D7E', '#D7C996', '#96D799', '#99A0DF', '#CB8DE0',
                    '#EFC88D', '#E1E2A1', '#98D7DF', '#907EDA', '#E9859D']}
                onChange={(color) => onChange(color.hex)}
            />
        </div>
    );
};

export default memo(ColorPicker);
