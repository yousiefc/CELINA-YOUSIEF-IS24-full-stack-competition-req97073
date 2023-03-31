import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './components.css';

import axios from "axios";
import { validateForm } from '../utils/util';
import { FormHelperText } from '@mui/material';

// Dialog popup to edit an existing product
function EditProductDialog({ row, setRefresh, refresh }) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [prodName, setProdName] = React.useState(row.productName);
    const [scrumMaster, setScrumMaster] = React.useState(row.scrumMasterName);
    const [prodOwner, setProdOwner] = React.useState(row.productOwnerName);
    const [developers, setDevelopers] = React.useState([...row.developers]);
    const [methodology, setMethodology] = React.useState(row.methodology);

    const clearFormHooks = () => {
        setError("");
        setProdName("");
        setScrumMaster("");
        setProdOwner("");
        setDevelopers([]);
        setMethodology("");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        clearFormHooks();
        setOpen(false);
    };

    // Handle all calls required to save
    const handleSave = () => {
        try {
            const errors = validateForm(prodName, scrumMaster, prodOwner, row.startDate, methodology, developers);
            if (errors === "") {
                submitEdit(createProductObject());
                setRefresh(!refresh);
                handleClose();
            } else {
                setError(errors);
            }
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    // Api call to add new product to database
    const submitEdit = async (newProductObject) => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/${row.productId}`, newProductObject)
            .then()
            .catch(err => console.log(err));
    };

    // Map hook values to respective database values
    const createProductObject = () => {
        const result = {
            productId: row.productId,
            productName: prodName,
            productOwnerName: prodOwner,
            developers: developers,
            scrumMasterName: scrumMaster,
            startDate: row.startDate,
            methodology: methodology
        };
        return result;
    };

    return (
        <div>
            <Button variant="contained" size="small" startIcon={<EditIcon />} onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="prodName"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value.trim())}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="scrum"
                        label="Scrum Master Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={scrumMaster}
                        onChange={(e) => setScrumMaster(e.target.value.trim())}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="owner"
                        label="Product Owner"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={prodOwner}
                        onChange={(e) => setProdOwner(e.target.value.trim())}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="devs"
                        label="Developer Names (separate with commas)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={developers}
                        onChange={(e) => setDevelopers(e.target.value.split(','))}
                    />
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Methodology</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={row.methodology}
                            name="radio-buttons-group"
                            onChange={(e) => setMethodology(e.target.value)}
                        >
                            <FormControlLabel value="Agile" control={<Radio />} label="Agile" />
                            <FormControlLabel value="Waterfall" control={<Radio />} label="Waterfall" />
                        </RadioGroup>
                    </FormControl>
                    <FormHelperText>{error}</FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditProductDialog;
