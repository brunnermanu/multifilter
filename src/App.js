import * as React from 'react';
import { useState } from 'react';
import Filter from "./newFilter/Filter";
import Button from "@mui/material/Button";


function App() {

  // Data
  const operators = [
    {name: "Alex"},
    {name: "Karol"},
    {name: "Manuela"},
    {name: "Cristina"}];

  const dataToFilter = [
    {
      operator: "Alex",
      density: "ACR B",
      diagnosis: "no lesions",
      doses: "",
      quality: {left: "good", right: "perfect"},
    },
    {
      operator: "Manuela",
      density: "ACR C",
      diagnosis: "microcalc suspicious",
      doses: "",
      quality: {left: "good", right: "inadequate"},
    },
    {
      operator: "Cristina",
      density: "ACR D",
      diagnosis: "microcalc suspicious",
      doses: "",
      quality: {left: "good", right: "inadequate"},
    },
    {
      operator: "Karol",
      density: "ACR A",
      diagnosis: "microcalc suspicious",
      doses: "",
      quality: {left: "good", right: "inadequate"},
    }, {
      operator: "Manuela",
      density: "ACR A",
      diagnosis: "microcalc_benign",
      doses: "",
      quality: {left: "good", right: "moderate"},
    },]

  const [openDialog, setOpenDialog] = useState(false)
  const [filteredData, setFilteredData] = useState(dataToFilter)

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        Open draggable dialog
      </Button>
      <Filter
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        operators={operators}
        dataToFilter={dataToFilter}
        setFilteredData={setFilteredData}/>
      <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "20px"}}>
        {filteredData.map((item, i) =>
          <div
            key={i}
            style={{
              display: "flex",
              gap: "0px 20px",
              alignItems: "center",
              border: "solid 1px gray",
              borderRadius: "5px",
              padding: "10px"
            }}>
            <h4>Operator: {item.operator}</h4>
            <p>Density: {item.density}</p>
            <p>Doses: {item.doses}</p>
            <p>Diagnosis: {item.diagnosis}</p>
            <p>Quality Left: {item.quality.left}</p>
            <p>Quality Left: {item.quality.right}</p>
          </div>)}
      </div>
    </div>


  );
}

export default App;
