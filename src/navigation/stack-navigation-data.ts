import { FamilySetupScreen } from '../containers';
import { AppRoute } from '../navigation/app-routes';
import TabNavigator from './main-tab.navigator';

const StackNavigationData = [
  {
    name: AppRoute.FAMILY_SETUP,
    component: FamilySetupScreen,
  },
  {
    name: AppRoute.DASHBOARD,
    component: TabNavigator,
  },
];

export default StackNavigationData;
