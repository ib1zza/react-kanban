import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';

interface Props extends FontAwesomeIconProps {
    iconColor?: string;
    icon: IconDefinition;
    onClick?: () => void;
}

const MemoizedFontAwesomeIcon = memo(({ iconColor, icon, onClick }: Props) => (
    <FontAwesomeIcon style={iconColor ? { color: iconColor } : {}} icon={icon} onClick={onClick} />
));

export default MemoizedFontAwesomeIcon;
