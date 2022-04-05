import Head from 'next/head'
import AuthProvider from "../components/auth-provider";
import styles from '../styles/Home.module.css'
import MyNavbar from '../components/navbar';
import MeowerMeow from '../components/test-component';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import reactDom from 'react-dom';
import { Grid , TablePagination } from '@mui/material';
import Token from '../components/token-card';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
export default function Home() {


  useEffect(() => {
    document.body.style.backgroundColor = "#222034"
  }),[];

  return (
    <>
        <Layout >
          <div>
          <Typography variant="h3" align="center" color="#ffffff">Go to profile
          </Typography>
          <Grid container spacing={2} columns={6} alignContent="center" className="randomGridBox">
            <Grid item xs={1}>
              <Token></Token>
            </Grid>
            <Grid item xs={1}>
              <Token></Token>
            </Grid>
            <Grid item xs={1}>
              <Token></Token>
            </Grid>
            <Grid item xs={1}>
              <Token></Token>
            </Grid>
            <Grid item xs={1}>
              <Token></Token>
            </Grid>
            <Grid item xs={1}>
              <Token></Token>
            </Grid>
          </Grid>

          </div>
        </Layout>
      </>
  )
}
