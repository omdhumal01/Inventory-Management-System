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



const Reorders = () => {


    const [reorders, setReorders] = useState([]);

    const [open, setOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [otp, setOtp] = useState("");




    useEffect(()=>{

        fetchReorders();

    },[]);





    // GET ALL REORDERS
    const fetchReorders = async()=>{


        try{


            const response = await api.get("/reorders");


            setReorders(response.data.data);



        }
        catch(error){

            console.log(error);

        }


    };






    // OPEN OTP DIALOG
    const openApproveDialog = (id)=>{


        setSelectedId(id);

        setOtp("");

        setOpen(true);


    };








    // APPROVE REORDER
    const approveReorder = async()=>{


        try{


            await api.patch(

                `/reorders/${selectedId}/approve`,

                {
                    otp
                }

            );



            setOpen(false);


            fetchReorders();



        }
        catch(error){

            console.log(error);

            alert(
                error.response?.data?.message || 
                "Approval Failed"
            );

        }


    };








return (

<div className="space-y-6">



<h1 className="text-3xl font-bold">

Reorders

</h1>





<Dialog

open={open}

onOpenChange={setOpen}

>


<DialogContent>


<DialogHeader>

<DialogTitle>

Approve Reorder

</DialogTitle>

</DialogHeader>




<div className="space-y-4">


<input

type="text"

placeholder="Enter OTP"

value={otp}

onChange={(e)=>setOtp(e.target.value)}

className="w-full border rounded-md p-2"

/>





<button

onClick={approveReorder}

className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full"

>

Confirm Approval

</button>



</div>



</DialogContent>


</Dialog>








<Card>


<CardHeader>


<CardTitle>

All Reorders

</CardTitle>


</CardHeader>





<CardContent>



<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr className="border-b">


<th className="p-3 text-left">
Product
</th>


<th className="p-3 text-left">
SKU
</th>


<th className="p-3 text-left">
Quantity
</th>


<th className="p-3 text-left">
Supplier
</th>


<th className="p-3 text-left">
Amount
</th>


<th className="p-3 text-left">
Status
</th>


<th className="p-3 text-left">
Action
</th>



</tr>


</thead>





<tbody>


{

reorders.map((reorder)=>(



<tr

key={reorder.id}

className="border-b"

>



<td className="p-3">

{reorder.product_name}

</td>





<td className="p-3">

{reorder.sku}

</td>





<td className="p-3">

{reorder.quantity_ordered}

</td>





<td className="p-3">

{reorder.supplier_name}

</td>





<td className="p-3">

₹{reorder.total_value}

</td>





<td className="p-3">


<span

className={`px-3 py-1 rounded-full text-sm
${
reorder.status==="Pending Approval"

?
"bg-yellow-500 text-black"

:

"bg-green-500 text-white"

}

`}

>


{reorder.status}


</span>


</td>






<td className="p-3">


{

reorder.status==="Pending Approval"

&&

<button


onClick={()=>openApproveDialog(reorder.id)}


className="bg-blue-500 text-white px-3 py-1 rounded-md"


>

Approve

</button>


}




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



export default Reorders;