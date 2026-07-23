import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Bell,
    CheckCircle,
    AlertTriangle,
    PackageCheck
} from "lucide-react";


const Notifications = () => {


    const notifications = [
        {
            id: 1,
            type: "LOW_STOCK",
            title: "Low Stock Alert",
            message: "Dell Laptop stock is below threshold",
            details: "Current Stock: 5 | Threshold: 10",
            time: "2 minutes ago",
            read: false
        },

        {
            id: 2,
            type: "APPROVAL_REQUIRED",
            title: "Reorder Approval Required",
            message: "A high value reorder requires approval",
            details: "Amount: ₹450000",
            time: "10 minutes ago",
            read: false
        },

        {
            id: 3,
            type: "APPROVED",
            title: "Reorder Approved",
            message: "Reorder #1 approved successfully",
            details: "Dell Laptop - Quantity 20",
            time: "1 hour ago",
            read: true
        }
    ];



    const getIcon = (type) => {

        switch(type) {

            case "LOW_STOCK":
                return (
                    <AlertTriangle 
                        className="h-6 w-6 text-red-500"
                    />
                );


            case "APPROVAL_REQUIRED":
                return (
                    <Bell 
                        className="h-6 w-6 text-yellow-500"
                    />
                );


            case "APPROVED":
                return (
                    <CheckCircle
                        className="h-6 w-6 text-green-500"
                    />
                );


            default:
                return (
                    <PackageCheck
                        className="h-6 w-6"
                    />
                );
        }

    };



    return (

        <div className="space-y-6">


            <div>

                <h1 className="text-3xl font-bold">
                    Notifications
                </h1>

                <p className="text-muted-foreground">
                    Track inventory alerts and system activities
                </p>

            </div>




            <Card>


                <CardHeader>

                    <CardTitle>
                        Recent Notifications
                    </CardTitle>

                </CardHeader>



                <CardContent>


                    <div className="space-y-4">


                        {
                            notifications.map((notification)=>(


                                <div
                                    key={notification.id}
                                    className={`
                                        flex gap-4 
                                        p-4 
                                        border 
                                        rounded-lg
                                        ${
                                            !notification.read
                                            ?
                                            "bg-muted/50"
                                            :
                                            ""
                                        }
                                    `}
                                >


                                    <div>

                                        {
                                            getIcon(notification.type)
                                        }

                                    </div>



                                    <div className="flex-1">


                                        <div className="flex justify-between">


                                            <h3 className="font-semibold">

                                                {notification.title}

                                            </h3>


                                            {
                                                !notification.read && (

                                                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">

                                                        New

                                                    </span>

                                                )
                                            }


                                        </div>




                                        <p className="text-sm">

                                            {notification.message}

                                        </p>



                                        <p className="text-sm text-muted-foreground">

                                            {notification.details}

                                        </p>



                                        <p className="text-xs text-muted-foreground mt-2">

                                            {notification.time}

                                        </p>



                                    </div>


                                </div>


                            ))
                        }


                    </div>


                </CardContent>


            </Card>


        </div>

    );

};


export default Notifications;