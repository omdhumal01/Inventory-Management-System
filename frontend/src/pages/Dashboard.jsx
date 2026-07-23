import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import api from "@/services/api/axios";


const Dashboard = () => {


    const [stats, setStats] = useState({

        products: 0,
        lowStock: 0,
        pendingReorders: 0,
        inventoryValue: 0,

    });


    const [products, setProducts] = useState([]);

    const [reorders, setReorders] = useState([]);



    useEffect(() => {

        fetchDashboardData();

    }, []);




    const fetchDashboardData = async () => {

        try {


            const productsResponse =
                await api.get("/products");


            const reordersResponse =
                await api.get("/reorders");



            const productData =
                productsResponse.data.data;


            const reorderData =
                reordersResponse.data.data;



            setProducts(productData);

            setReorders(reorderData);



            const lowStockProducts =
                productData.filter(
                    (product)=>
                    product.available_quantity <
                    product.low_stock_threshold
                );



            const inventoryValue =
                productData.reduce(
                    (total, product)=>

                        total +
                        (
                            Number(product.available_quantity) *
                            Number(product.cost_price)
                        ),

                    0
                );



            const pendingReorders =
                reorderData.filter(
                    (reorder)=>
                    reorder.status === "Pending Approval"
                );



            setStats({

                products:
                    productData.length,


                lowStock:
                    lowStockProducts.length,


                pendingReorders:
                    pendingReorders.length,


                inventoryValue,

            });



        }
        catch(error){

            console.log(
                "Dashboard Error:",
                error
            );

        }

    };





    return (

        <div className="space-y-6">


            <div>

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>


                <p className="text-muted-foreground">
                    Inventory overview and system activities
                </p>

            </div>




            {/* STAT CARDS */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">



                <Card>

                    <CardHeader>

                        <CardTitle>
                            Total Products
                        </CardTitle>

                    </CardHeader>


                    <CardContent>

                        <p className="text-3xl font-bold">
                            {stats.products}
                        </p>

                    </CardContent>


                </Card>




                <Card>

                    <CardHeader>

                        <CardTitle>
                            Low Stock
                        </CardTitle>

                    </CardHeader>


                    <CardContent>

                        <p className="text-3xl font-bold text-red-500">
                            {stats.lowStock}
                        </p>

                    </CardContent>


                </Card>





                <Card>

                    <CardHeader>

                        <CardTitle>
                            Pending Reorders
                        </CardTitle>

                    </CardHeader>


                    <CardContent>

                        <p className="text-3xl font-bold text-yellow-500">
                            {stats.pendingReorders}
                        </p>

                    </CardContent>


                </Card>





                <Card>

                    <CardHeader>

                        <CardTitle>
                            Inventory Value
                        </CardTitle>

                    </CardHeader>


                    <CardContent>

                        <p className="text-3xl font-bold">

                            ₹
                            {stats.inventoryValue.toLocaleString()}

                        </p>

                    </CardContent>


                </Card>


            </div>





            {/* RECENT PRODUCTS */}

            <Card>


                <CardHeader>

                    <CardTitle>
                        Recent Products
                    </CardTitle>

                </CardHeader>



                <CardContent>


                    <table className="w-full">


                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-3">
                                    Name
                                </th>

                                <th className="text-left p-3">
                                    SKU
                                </th>


                                <th className="text-left p-3">
                                    Quantity
                                </th>


                                <th className="text-left p-3">
                                    Supplier
                                </th>


                            </tr>

                        </thead>



                        <tbody>


                        {
                            products
                            .slice(0,5)
                            .map(product=>(


                                <tr
                                    key={product.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        {product.name}
                                    </td>


                                    <td className="p-3">
                                        {product.sku}
                                    </td>


                                    <td className="p-3">
                                        {product.available_quantity}
                                    </td>


                                    <td className="p-3">
                                        {product.supplier_name}
                                    </td>


                                </tr>


                            ))
                        }


                        </tbody>


                    </table>


                </CardContent>


            </Card>







            {/* RECENT REORDERS */}


            <Card>


                <CardHeader>

                    <CardTitle>
                        Recent Reorders
                    </CardTitle>

                </CardHeader>


                <CardContent>


                    {
                        reorders
                        .slice(0,5)
                        .map(reorder=>(


                            <div
                                key={reorder.id}
                                className="flex justify-between border-b py-3"
                            >

                                <div>

                                    <p className="font-semibold">
                                        {reorder.product_name}
                                    </p>


                                    <p className="text-sm text-muted-foreground">

                                        Quantity:
                                        {" "}
                                        {reorder.quantity_ordered}

                                    </p>


                                </div>



                                <span
                                    className="font-semibold"
                                >

                                    {reorder.status}

                                </span>


                            </div>


                        ))
                    }


                </CardContent>


            </Card>




        </div>

    );

};


export default Dashboard;