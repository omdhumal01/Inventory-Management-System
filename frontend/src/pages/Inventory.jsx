import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import api from "@/services/api/axios";


const Inventory = () => {


    const [products, setProducts] = useState([]);

    const [open, setOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [selectedId, setSelectedId] = useState(null);



    const initialForm = {

        name: "",
        sku: "",
        available_quantity: "",
        low_stock_threshold: "",
        cost_price: "",
        supplier_name: ""

    };


    const [formData, setFormData] = useState(initialForm);



    useEffect(() => {

        fetchProducts();

    }, []);



    // GET PRODUCTS
    const fetchProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data.data);


        } catch(error) {

            console.log(error);

        }

    };




    // INPUT CHANGE
    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };





    // OPEN ADD DIALOG
    const openAddDialog = ()=>{

        setEditMode(false);

        setSelectedId(null);

        setFormData(initialForm);

        setOpen(true);

    };





    // OPEN EDIT DIALOG
    const openEditDialog = (product)=>{


        setEditMode(true);


        setSelectedId(product.id);


        setFormData({

            name: product.name,
            sku: product.sku,
            available_quantity: product.available_quantity,
            low_stock_threshold: product.low_stock_threshold,
            cost_price: product.cost_price,
            supplier_name: product.supplier_name

        });


        setOpen(true);


    };





    // SAVE PRODUCT
    const saveProduct = async ()=>{


        try {


            if(editMode){


                await api.put(

                    `/products/${selectedId}`,

                    formData

                );


            }
            else{


                await api.post(

                    "/products",

                    formData

                );


            }



            setOpen(false);


            setFormData(initialForm);


            fetchProducts();



        }
        catch(error){

            console.log(error);

        }


    };






    // DELETE PRODUCT
    const deleteProduct = async(id)=>{


        try {


            await api.delete(

                `/products/${id}`

            );


            fetchProducts();


        }
        catch(error){

            console.log(error);

        }


    };






return (

<div className="space-y-6">



<div className="flex justify-between items-center">


<h1 className="text-3xl font-bold">

Inventory

</h1>



<button

onClick={openAddDialog}

className="bg-primary text-primary-foreground px-4 py-2 rounded-md"

>

Add Product

</button>



</div>






<Dialog

open={open}

onOpenChange={setOpen}

>


<DialogContent>


<DialogHeader>


<DialogTitle>

{

editMode

?

"Edit Product"

:

"Add Product"

}

</DialogTitle>


</DialogHeader>





<div className="space-y-3">



{

Object.keys(formData).map((field)=>(


<input

key={field}

name={field}

value={formData[field]}

onChange={handleChange}

placeholder={field.replaceAll("_"," ")}

className="w-full border rounded-md p-2"

/>



))

}






<button

onClick={saveProduct}

className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full"

>


{

editMode

?

"Update Product"

:

"Save Product"

}


</button>




</div>



</DialogContent>


</Dialog>







<Card>


<CardHeader>

<CardTitle>

Products

</CardTitle>

</CardHeader>





<CardContent>



<div className="overflow-x-auto">


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
Threshold
</th>


<th className="text-left p-3">
Price
</th>


<th className="text-left p-3">
Supplier
</th>


<th className="text-left p-3">
Actions
</th>


</tr>


</thead>






<tbody>


{

products.map((product)=>(



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

{product.low_stock_threshold}

</td>




<td className="p-3">

₹{product.cost_price}

</td>




<td className="p-3">

{product.supplier_name}

</td>





<td className="p-3 flex gap-2">



<button

onClick={()=>openEditDialog(product)}

className="bg-blue-500 text-white px-3 py-1 rounded-md"

>

Edit

</button>





<button

onClick={()=>deleteProduct(product.id)}

className="bg-red-500 text-white px-3 py-1 rounded-md"

>

Delete

</button>



</td>





</tr>



))

}



</tbody>




</table>


</div>



</CardContent>



</Card>





</div>


);


};


export default Inventory;