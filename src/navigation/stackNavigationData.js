import TabNavigator from './MainTabNavigator';
import { colors, fonts } from '../styles';

const headerBackground = require('../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: 'Home',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
];

export default StackNavigationData;
