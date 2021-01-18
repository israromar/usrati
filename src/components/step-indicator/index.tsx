/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import colors from '../../styles/colors';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const labels = ['Family Information', 'Add Guardian', 'Add Children'];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  // stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#fff',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const customStylesVerticle = {
  stepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  stepStrokeFinishedColor: colors.primaryBlue,
  separatorFinishedColor: colors.primaryBlue,
  stepIndicatorFinishedColor: colors.primaryBlue,
  labelColor: 'black',
  labelSize: 16,
  // labelAlign: 'flex-start',
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'autorenew',
    color:
      stepStatus === 'finished'
        ? '#ffffff'
        : position === 0
          ? colors.blue
          : colors.grey,
    size: 20,
  };
  switch (position) {
    case 0: {
      iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-1';
      iconConfig.color =
        stepStatus === 'finished'
          ? '#ffffff'
          : stepStatus === 'current'
            ? colors.primaryBlue
            : colors.grey;
      break;
    }
    case 1: {
      iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-2';
      iconConfig.color =
        stepStatus === 'finished'
          ? '#ffffff'
          : stepStatus === 'current'
            ? colors.blue
            : colors.grey;
      break;
    }
    case 2: {
      iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-3';
      iconConfig.color =
        stepStatus === 'finished'
          ? '#ffffff'
          : stepStatus === 'current'
            ? colors.blue
            : colors.grey;
      break;
    }
    case 3: {
      iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-4';
      iconConfig.color =
        stepStatus === 'finished'
          ? '#ffffff'
          : stepStatus === 'current'
            ? colors.blue
            : colors.grey;
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

interface IStepIndixator {
  currentPosition: number;
  direction: string | undefined;
  onStepPress: () => {};
}
// create a component
const StepIndicatorComp = ({
  currentPosition,
  direction,
  onStepPress,
}: IStepIndixator) => {
  const renderStepIndicator = (params: {
    position: any;
    stepStatus: any;
  }): any => <MaterialCommunityIcons {...getStepIndicatorIconConfig(params)} />;

  return (
    <StepIndicator
      renderStepIndicator={renderStepIndicator}
      customStyles={currentPosition === 3 ? customStylesVerticle : customStyles}
      currentPosition={currentPosition}
      labels={labels}
      stepCount={3}
      direction={direction}
      onPress={onStepPress}
    />
  );
};

//make this component available to the app
export default StepIndicatorComp;
