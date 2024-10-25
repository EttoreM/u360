import { mdiViewDashboard, mdiLightbulbOutline , mdiInformationOutline, mdiLoginVariant, mdiMapOutline } from '@mdi/js';


interface NavBarItem {
  label: string;
  target: string;
  icon: string;
}

const NavBarModel: Record<string, NavBarItem> = {
  DASHBOARD: {
    label: "Dashboard",
    target: "/",
    icon: mdiViewDashboard
  },
  SENSORS: {
    label: "Map",
    target: "/map",
    icon: mdiMapOutline
  },
  PROJECTS: {
    label: "Projects",
    target: "/projects",
    icon: mdiLightbulbOutline 
  },
  ABOUT_US: {
    label: "About us",
    target: "/about",
    icon: mdiInformationOutline
  },
  CREATE_DEPLOYMENT: {
    label: "create depl",
    target: "/create_deployment",
    icon: mdiLoginVariant
  },
  CREATE_PLATFORM: {
    label: "create plat",
    target: "/create_platform",
    icon: mdiLoginVariant
  },
  LOGIN: {
    label: "Login",
    target: "/login",
    icon: mdiLoginVariant
  }
};

export default NavBarModel;