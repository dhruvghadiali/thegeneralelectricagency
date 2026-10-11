import {
  Boxes,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

export const GLOBAL_KEYBOARD_COMMANDS = Object.freeze([
  {
    id: "open-go-to",
    label: "Open Go To",
    description: "Search the features available for your role",
    shortcut: "Alt+G",
    shortcutKey: "g",
    action: "open-go-to",
    roles: [ROLE_PATHS.EMPLOYEE],
    showInLauncher: false,
  },
  {
    id: "open-dashboard",
    label: "Open Dashboard",
    description: "Return to the main dashboard",
    shortcut: "Alt+D",
    shortcutKey: "d",
    route: ROUTES.DASHBOARD,
    roles: [ROLE_PATHS.EMPLOYEE],
    icon: LayoutDashboard,
  },
  {
    id: "open-products",
    label: "Open Products",
    description: "Browse and manage products",
    shortcut: "Alt+P",
    shortcutKey: "p",
    route: ROUTES.PRODUCTS,
    roles: [ROLE_PATHS.EMPLOYEE],
    icon: Boxes,
  },
  {
    id: "open-companies",
    label: "Open Companies",
    description: "Browse and manage companies",
    shortcut: "Alt+C",
    shortcutKey: "c",
    route: ROUTES.COMPANIES,
    roles: [ROLE_PATHS.EMPLOYEE],
    icon: Building2,
  },
  {
    id: "open-quotations",
    label: "Open Quotations",
    description: "View the quotation workspace",
    shortcut: "Alt+Q",
    shortcutKey: "q",
    route: ROUTES.QUOTATIONS,
    roles: [ROLE_PATHS.EMPLOYEE],
    icon: FileText,
  },
  {
    id: "open-settings",
    label: "Open Settings",
    description: "View application settings",
    shortcut: "Alt+S",
    shortcutKey: "s",
    route: ROUTES.SETTINGS,
    roles: [ROLE_PATHS.EMPLOYEE],
    icon: Settings,
  },
]);
