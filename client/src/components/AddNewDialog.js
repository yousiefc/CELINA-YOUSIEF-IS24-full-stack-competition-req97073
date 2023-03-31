import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './components.css';

import axios from "axios";
import { validateForm, dateFormat } from '../utils/util';
import { FormHelperText } from '@mui/material';


// Dialog popup to add new product
function AddNewDialog({ newProductId, setRefresh, refresh }) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [prodName, setProdName] = React.useState("");
  const [scrumMaster, setScrumMaster] = React.useState("");
  const [prodOwner, setProdOwner] = React.useState("");
  const [developers, setDevelopers] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [methodology, setMethodology] = React.useState("Agile");

  const clearFormHooks = () => {
    setError("");
    setProdName("");
    setScrumMaster("");
    setProdOwner("");
    setDevelopers([]);
    setStartDate("");
    setMethodology("Agile");
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
      const errors = validateForm(prodName, scrumMaster, prodOwner, startDate, methodology, developers);
      if (errors === "") {
        submitNewProduct(createProductObject());
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
  const submitNewProduct = async (newProductObject) => {
    await axios.post(process.env.REACT_APP_BASE_URL, newProductObject)
      .then()
      .catch(err => console.log(err));
  };

  // Map hook values to respective database values
  const createProductObject = () => {
    const result = {
      productId: newProductId,
      productName: prodName,
      productOwnerName: prodOwner,
      developers: developers,
      scrumMasterName: scrumMaster,
      startDate: dateFormat(startDate),
      methodology: methodology
    };
    return result;
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: "absolute", bottom: 20, right: 20 }}>
        <AddIcon />
      </Fab>
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
            onChange={(e) => setDevelopers(e.target.value.split(','))}
          />
          <TextField
            required
            margin="dense"
            id="date"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => setStartDate(e.target.value.trim())}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Methodology</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Agile"
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

export default AddNewDialog;