import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Grid } from "@mui/material";
import { MultiSelect } from "./MultiSelect";


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function Filter({openDialog, setOpenDialog, operators, dataToFilter, setFilteredData}) {

  // Operators
  const initialStateOperators = operators.map(obj => {
    return {...obj, checked: true};
  })
  const [selectedOperators, setSelectedOperators] = useState(initialStateOperators);
  const operatorsFilters = selectedOperators.map(o => o.checked ? o.name : null).filter(i => i !== null);

  const updateState = (item) => {
    const newState = selectedOperators.map(obj => {
      if (obj.name === item.name) {
        return {...obj, checked: !obj.checked};
      }
      return obj;
    });

    setSelectedOperators(newState);
  };

  function selectAllOperators() {
    if (selectedOperators.every(i => i.checked)) {
      const newState = selectedOperators.map(obj => {
        return {...obj, checked: false};
      });
      setSelectedOperators(newState);
    } else {
      const newState = selectedOperators.map(obj => {
        return {...obj, checked: true};
      });
      setSelectedOperators(newState);
    }
  }

  // Density
  const initialStateDensity = [
    {name: "ACR A", checked: true},
    {name: "ACR B", checked: true},
    {name: "ACR C", checked: true},
    {name: "ACR D", checked: true}]

  const [selectedDensity, setSelectedDensity] = useState(initialStateDensity);

  const densityFilters = selectedDensity.map(d => d.checked === true ? d.name : null).filter(i => i !== null);

  function densityHandler(item) {
    const newState = selectedDensity.map(obj => {
      if (obj.name === item.name) {
        return {...obj, checked: !obj.checked};
      }
      return obj;
    });

    setSelectedDensity(newState);
  }

  function selectAllDensity() {
    if (selectedDensity.every(i => i.checked)) {
      const newState = selectedDensity.map(obj => {
        return {...obj, checked: false};
      });
      setSelectedDensity(newState);
    } else {
      const newState = selectedDensity.map(obj => {
        return {...obj, checked: true};
      });
      setSelectedDensity(newState);
    }
  }

  // Filter
  const [filter, setFilter] = useState({operators: operatorsFilters, density: densityFilters})

  function resetFilter() {
    setSelectedOperators(initialStateOperators)
    setSelectedDensity(initialStateDensity)
  }

  function onAccept() {
    setFilter({
      operators: operatorsFilters,
      density: densityFilters,
    });
  }

// Effects: after clicking onAccept the real filter function is running
  useEffect(() => {
    const filterData = dataToFilter.filter(item => {
      if (filter.density.some(key => item.density === key) && filter.operators.some(key => item.operator === key)) {
        return item
      }
    })
    setFilteredData(filterData)
  }, [filter]);

  return (
    <div className={{width: "100%"}}>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle style={{cursor: 'move', borderBottom: '1px solid gray', color: '#d81b60'}}
                     id="draggable-dialog-title">
          Filters
        </DialogTitle>
        <DialogContent style={{
          paddingTop: "25" +
            "px"
        }}>
          <Grid spacing={1} container direction="row" justifyContent="space-between">
            <Grid xs={6}
                  sm={6}
                  md={6}
                  spacing={3}
                  item
                  container
                  direction="column"
                  justifyContent="space-between">
              <Grid item>
                <MultiSelect
                  direction="column"
                  name={"Operators"}
                  items={selectedOperators}
                  labels={selectedOperators}
                  selected={selectedOperators}
                  handleClick={updateState}
                  selectAll={selectAllOperators}/>
              </Grid>
              <Grid item>
                <MultiSelect
                  direction="column"
                  name={"Density"}
                  items={selectedDensity}
                  selected={selectedDensity}
                  handleClick={densityHandler}
                  selectAll={selectAllDensity}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={resetFilter}>
            RESET
          </Button>
          <Button onClick={onAccept}>APPLY</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Filter;
