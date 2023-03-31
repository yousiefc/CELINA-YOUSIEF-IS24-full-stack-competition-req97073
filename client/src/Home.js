import React, { useState, useEffect } from "react";
import axios from "axios";

import StickyHeadTable from "./components/StickyHeadTable";
import { Grid } from "@mui/material";
import AddNewDialog from "./components/AddNewDialog";

function Home() {
    const [rows, setRows] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getHighestProductId = () => {
        return (
            rows.slice(-1).productId + 1
        );
    }

    // Async function to get all products
    const getAllProducts = async () => {
        await axios.get(process.env.REACT_APP_BASE_URL)
            .then((res) => { setRows(res.data.data) })
            .catch(err => console.log(err));
    }

    // Initialize rows from api
    useEffect( () => {
        getAllProducts();
    }, [refresh]);

    return (

        <Grid
            container
            spacing={1}
        >
            <Grid item xs={1}>
                {rows.length} products
            </Grid>
            <Grid item xs={11}>

            </Grid>
            <Grid item xs={12}>
                <StickyHeadTable rows={rows} setRefresh={setRefresh} refresh={refresh}/>
            </Grid>
            <AddNewDialog setRefresh={setRefresh} refresh={refresh} newProductId={getHighestProductId}/>
        </Grid>

    );
}

export default Home;