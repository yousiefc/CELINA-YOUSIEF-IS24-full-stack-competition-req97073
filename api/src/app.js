import express from "express";
import axios from "axios";
import cors from "cors";

const port = 3000;
const dbPort = 3000;
const dbHost = "db";

const app = express();
app.use(express.json());
app.use(cors());

// Function to create response object
const responseObject = (resp) => {
    var obj = {
        data: resp.data,
        statusCode: resp.status,
        statusMessage: resp.statusText
    };
    return obj;
};

/**
* GET endpoint that returns all products in database
* @returns the request body, status code and status message
*/
app.get("/api/product", async (req, res) => {
    try {
        const resp = await axios.get(`http://${dbHost}:${dbPort}/products?_sort=productId&_order=asc`);
        res.json(responseObject(resp));
    } catch (error) {
        console.error(`Error: ${error} response ${res.statusCode}`);
    }
});

/**
* GET endpoint that returns product with specific productId
* @param {productId}
* @returns the request body, status code and status message
*/
app.get("/api/product/:productId", async (req, res) => {
    try {
        const resp = await axios.get(`http://${dbHost}:${dbPort}/products?productId=${req.params.productId}`);
        res.json(responseObject(resp));
    } catch (error) {
        console.error(`Error: ${error} response ${res.statusCode}`);
    }
});

/**
* GET endpoint that returns all products with a specific scrum master
* @param {scrumMaster}
* @returns the request body, status code and status message
*/
app.get("/api/product/:scrumMaster", async (req, res) => {
    try {
        const resp = await axios.get(`http://${dbHost}:${dbPort}/products?scrumMasterName=${req.params.scrumMaster}`);
        res.json(responseObject(resp));
    } catch (error) {
        console.error(`Error: ${error} response ${res.statusCode}`);
    }
});

/**
* POST endpoint that creates a new product and adds it to the database
* @returns the request body, status code and status message
*/
app.post("/api/product", async (req, res) => {
    try {
        const resp = await axios.post(`http://${dbHost}:${dbPort}/products`, req.body);
        res.json(responseObject(resp));
    } catch (error) {
        console.error(`Error: ${error} response ${res.statusCode}`);
    }
});

/**
* PUT endpoint that updates existing products in the database
* @param {productId}
* @returns the request body, status code and status message
*/
app.put("/api/product/:productId", async (req, res) => {
    try {
        const resp = await axios.put(`http://${dbHost}:${dbPort}/products/${req.params.productId}`, req.body);
        res.json(responseObject(resp));
    } catch (error) {
        console.error(`Error: ${error} response ${res.statusCode}`);
    }
});

/**
* GET endpoint to check API health
* @returns 200 Status
*/
app.get("/api/health", async (req, res) => {
    res.status(200).send('Ok');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});