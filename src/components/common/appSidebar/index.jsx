import { LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shadcnComponent/sidebar";
import { Typography } from "@shadcnComponent/typography";
import { loggedOut } from "@/store/auth/auth.slice";
import { ROUTES } from "@routes/navigate";
import { GLOBAL_KEYBOARD_COMMANDS } from "@commonComponent/keyboardNavigation/keyboardNavigation.constants";

import { SIDEBAR_NAV_ITEMS_BY_ROLE } from "./appSidebar.constants";

import logoImage from "@Assets/images/logo.png";

function AppSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.username);

  const navItems = SIDEBAR_NAV_ITEMS_BY_ROLE[role] ?? [];

  const handleLogOut = () => {
    dispatch(loggedOut());
    navigate(ROUTES.HOME);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <img
            src={logoImage}
            alt="The General Electric Stores"
            className="h-7 w-7 shrink-0 object-contain"
          />
          <Typography
            as="span"
            variant="label"
            className="truncate group-data-[collapsible=icon]:hidden"
          >
            The General Electric Stores
          </Typography>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const shortcut = GLOBAL_KEYBOARD_COMMANDS.find(
                  (command) =>
                    command.route === item.url &&
                    command.roles.includes(role),
                )?.shortcut;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {shortcut && (
                          <kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 text-[10px] text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
                            {shortcut}
                          </kbd>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {username && (
          <Typography
            as="p"
            variant="caption"
            className="text-sidebar-foreground/70 truncate px-2 group-data-[collapsible=icon]:hidden"
          >
            Signed in as {username}
          </Typography>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogOut}>
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
