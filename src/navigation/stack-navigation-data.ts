import { AppRoute } from '../navigation/app-routes';
import TabNavigator from './main-tab.navigator';

const StackNavigationData = [
  {
    name: AppRoute.HOME,
    component: TabNavigator,
  },
];

export default StackNavigationData;
