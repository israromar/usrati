import {
  AssignTaskScreen,
  ChildProfileScreen,
  DashboardScreen,
  FamilySetupScreen,
  MatricCategoryScreen,
  MatricSubCategoryScreen,
  ParentProfileScreen,
} from '../containers';
import { AppRoute } from '../navigation/app-routes';
// import TabNavigator from './main-tab.navigator';

const StackNavigationData = [
  {
    name: AppRoute.DASHBOARD,
    component: DashboardScreen,
  },
  {
    name: AppRoute.FAMILY_SETUP,
    component: FamilySetupScreen,
  },
  {
    name: AppRoute.MATRIC_CATEGORY,
    component: MatricCategoryScreen,
  },
  {
    name: AppRoute.MATRIC_SUB_CATEGORY,
    component: MatricSubCategoryScreen,
  },
  {
    name: AppRoute.PARENT_PROFILE,
    component: ParentProfileScreen,
  },
  {
    name: AppRoute.CHILD_PROFILE,
    component: ChildProfileScreen,
  },
  {
    name: AppRoute.ASSIGN_TASK,
    component: AssignTaskScreen,
  },
];

export default StackNavigationData;
