import HomeScreen from '../containers/home/HomeViewContainer';
import CalendarScreen from '../containers/calendar/CalendarViewContainer';
import GridsScreen from '../containers/grids/GridsViewContainer';
import PagesScreen from '../containers/pages/PagesViewContainer';
import ComponentsScreen from '../containers/components/ComponentsViewContainer';

const iconHome = require('../../assets/images/tabbar/home.png');
const iconCalendar = require('../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../assets/images/tabbar/grids.png');
const iconPages = require('../../assets/images/tabbar/pages.png');
const iconComponents = require('../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Calendar',
    component: CalendarScreen,
    icon: iconCalendar,
  },
  {
    name: 'Grids',
    component: GridsScreen,
    icon: iconGrids,
  },
  {
    name: 'Pages',
    component: PagesScreen,
    icon: iconPages,
  },
  {
    name: 'Components',
    component: ComponentsScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;
