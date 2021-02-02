import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../../../styles';

export const ArrowForward = () => {
    return (
        <AntIcon
            style={{ marginRight: 15 }}
            name="arrowright"
            size={25}
            color={colors.primaryBlue}
        />
    );
};

export const PencilIcon = () => (
    <AntIcon name="edit" size={15} color={colors.primaryBlue} />
);

export const DeleteIcon = () => (
    <AntIcon name="delete" size={15} color={colors.primaryBlue} />
);

export const UpIcon = () => (
    <AntIcon name="up" size={20} color={colors.primaryBlue} />
);

export const AddIcon = () => (
    <AntIcon name="plus" size={50} color={colors.primaryBlue} />
);
