import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';

interface Props extends FontAwesomeIconProps {
    iconColor?: string;
    icon: IconDefinition;
}

const MemoizedFontAwesomeIcon = memo(({ iconColor, icon }: Props) => (
    <FontAwesomeIcon style={iconColor ? { color: iconColor } : {}} icon={icon} />
));

export default MemoizedFontAwesomeIcon;
