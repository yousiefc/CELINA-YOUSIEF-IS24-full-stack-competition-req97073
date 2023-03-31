import React, { useState, useEffect } from "react";
import axios from "axios";

import StickyHeadTable from "./components/StickyHeadTable";
import { Button, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import AddNewDialog from "./components/AddNewDialog";

function Home() {
    const [rows, setRows] = useState([]);
    const [scrumSearch, setScrumSearch] = useState("");
    const [refresh, setRefresh] = useState(false);

    const getHighestProductId = () => {
        return (
            rows.slice(-1).productId + 1
        );
    }

    const scrumMasterSearch = () => {
        try {
            getByScrum();
        } catch (error) {
            console.log(error);
        }
    }

    const getByScrum = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/scrummaster/${scrumSearch}`)
            .then((res) => {setRows(res.data.data)})
            .catch(err => console.log(err));
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
            <Grid item>
                <TextField 
                    id="outlined-basic" 
                    label="Search by Scrum Master" 
                    variant="outlined" 
                    onChange={(e) => setScrumSearch(e.target.value)}
                />
                <Button onClick={scrumMasterSearch}>Search</Button>
            </Grid>
            <Grid item xs={12}>
                <StickyHeadTable rows={rows} setRefresh={setRefresh} refresh={refresh}/>
            </Grid>
            <AddNewDialog setRefresh={setRefresh} refresh={refresh} newProductId={getHighestProductId}/>
        </Grid>

    );
}

export default Home;