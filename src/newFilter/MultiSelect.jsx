import React from "react";


import { Button, Chip, Grid, Typography } from "@mui/material";


const selectionBox = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "10px",

}

const titleFilterCard = {
  letterSpacing: "0.2rem",
  textTransform: "uppercase",
  color: "black",
  inlineSize: "min-content",
  margin: 0,
}

const buttonStyles = {
  borderColor: "#D81B60",
  backgroundColor: "rgba(216,27,96,0.1)",
  color: "#000000",
  boxShadow: "none"
}

const buttonStylesFilled = {
  backgroundColor: "#D81B60", color: "#ffffff", boxShadow: "none"
}
//
// const checkbox = {
//   transform: "scale(1.1)",
// }
//
// const InstitutionsButton = {
//   marginLeft: 'auto'
// }
//
// const SelectButton = {
//   marginLeft: '1%'
// }


export function MultiSelect(props) {
  const allItemsSelected = props.selected.every(i => i.checked);
  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
          direction="row"
        >
          <Grid item>
            <Typography variant="h6" style={titleFilterCard}>
              {props.name}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              // variant="outlined"
              variant={
                allItemsSelected
                  ? "outlined"
                  : "contained"
              }
              size="small"
              style={allItemsSelected ? buttonStyles : buttonStylesFilled}
              onClick={props.selectAll}
              color="primary"
            >
              {allItemsSelected
                ? "unselect all"
                : "select all"}
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <div style={selectionBox}>
            {props.items.map((item) => (
              <Chip key={item.name} label={item.name} variant="filled"
                    color={item.checked ? "primary" : "default"}
                    onClick={() => props.handleClick(item)}
                    style={item.checked ? {backgroundColor: "#D81B60"} : {backgroundColor: "#d7d3d3"}}/>

            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
