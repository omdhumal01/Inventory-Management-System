import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Bell,
    LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Inventory",
        url: "/inventory",
        icon: Package,
    },
    {
        title: "Reorders",
        url: "/reorders",
        icon: ClipboardList,
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
    },
];

export function AppSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Logged out successfully!");

        
        window.location.reload();

        
    };

    return (
        <Sidebar className="border-r">

            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupLabel className="text-base font-bold mb-4">
                        Inventory System
                    </SidebarGroupLabel>

                    <SidebarGroupContent>

                        <SidebarMenu>

                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>

                                   <SidebarMenuButton asChild>

    <Link
        to={item.url}
        className="flex items-center gap-3"
    >
        <item.icon className="h-5 w-5" />

        <span>{item.title}</span>

    </Link>

</SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            {/* Profile Footer */}

            <SidebarFooter className="border-t px-3 py-2">

                <div className="flex items-center gap-2">

                    <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>
                            OD
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 leading-tight">

                        <p className="text-sm font-medium">
                            Om Dhumal
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                            Administrator
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-md p-2 hover:bg-accent transition-colors"
                        title="Logout"
                    >
                        <LogOut className="h-4 w-4 text-red-500" />
                    </button>

                </div>

            </SidebarFooter>

        </Sidebar>
    );
}