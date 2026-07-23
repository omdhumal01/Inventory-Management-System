import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";


import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Bell
} from "lucide-react";


import { Link } from "react-router-dom";



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


    return (

        <Sidebar>


            <SidebarContent>


                <SidebarGroup>


                    <SidebarGroupLabel>

                        Inventory System

                    </SidebarGroupLabel>



                    <SidebarGroupContent>


                        <SidebarMenu>


                            {
                                items.map((item) => (

                                    <SidebarMenuItem key={item.title}>


                                        <SidebarMenuButton asChild>

                                            <Link 
                                                to={item.url}
                                                className="flex items-center gap-3"
                                            >

                                                <item.icon className="h-5 w-5" />

                                                <span>
                                                    {item.title}
                                                </span>

                                            </Link>

                                        </SidebarMenuButton>


                                    </SidebarMenuItem>

                                ))
                            }


                        </SidebarMenu>


                    </SidebarGroupContent>


                </SidebarGroup>


            </SidebarContent>


        </Sidebar>

    );

}