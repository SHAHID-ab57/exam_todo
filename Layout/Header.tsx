"use client";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#3f51b5",
          position: "static",
          width: "100%",
          padding: "0 24px",
        }}
      >
        <Toolbar>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              alignItems: "center",

              
            }}
          >
            <Grid item>
              <Typography variant="h6">CRUD</Typography>
            </Grid>
            <Grid item>
              <Link className="link_style" href="/">
                Home
              </Link>
            </Grid>
            <Grid item>
              <Link className="link_style" href="/addtodo">
                Add todo
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
