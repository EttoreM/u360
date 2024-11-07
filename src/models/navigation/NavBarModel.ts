import { 
  mdiViewDashboard, 
  mdiLightbulb, 
  mdiInformation, 
  mdiLoginVariant,
  mdiMap, 
  mdiLogin, 
  mdiLogout,
  mdiAccount
} from '@mdi/js';


interface NavBarItem {
  label:  string;
  target: string;
  icon:   string;
}

const NavBarModel: Record<string, NavBarItem> = {
  DASHBOARD: {
    label: "Dashboard",
    target: "/",
    icon: mdiViewDashboard
  },
  MAP: {
    label: "Map",
    target: "/map",
    icon: mdiMap
  },
  DEPLOYMENTS: {
    label: "Deployments",
    target: "/deployments",
    icon: mdiLightbulb 
  },
  ABOUT: {
    label: "About us",
    target: "/about",
    icon: mdiInformation
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
    icon: mdiLogin
  },
  LOGOUT: {
    label: "Your Account",
    target: "/your_account",
    icon: mdiAccount
  }
};

export default NavBarModel;