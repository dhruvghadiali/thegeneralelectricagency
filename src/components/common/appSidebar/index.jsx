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
} from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import { loggedOut } from "@/store/auth/authSlice";

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
    navigate("/");
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
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
