import {
  AssignTaskScreen,
  ChildProfileScreen,
  DashboardScreen,
  FamilySetupScreen,
  MatricCategoryScreen,
  MatricSubCategoryScreen,
  ParentProfileScreen,
  ChildDashboardScreen,
} from '../containers';
import { AppRoute } from '../navigation/app-routes';
// import TabNavigator from './main-tab.navigator';

export const ParentStackNavigationData = [
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

export const ChildStackNavigationData = [
  {
    name: AppRoute.CHILD_DASHBOARD,
    component: ChildDashboardScreen,
  },
  {
    name: AppRoute.FAMILY_SETUP,
    component: FamilySetupScreen,
  },
];

// export { ParentStackNavigationData, ChildStackNavigationData };
