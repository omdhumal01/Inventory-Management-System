import {
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";


import { AppSidebar } from "./AppSidebar";


const Layout = ({ children }) => {

    return (

        <SidebarProvider>


            <AppSidebar />


            <div className="flex-1 min-h-screen bg-background text-foreground">


                <header className="h-14 border-b flex items-center px-4 bg-background">

                    <SidebarTrigger />


                    <h1 className="ml-4 text-xl font-semibold">

                        Inventory Dashboard

                    </h1>


                </header>



                <main className="p-6 min-h-[calc(100vh-56px)]">

                    {children}

                </main>


            </div>


        </SidebarProvider>

    );

};


export default Layout;