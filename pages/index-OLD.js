import Head from 'next/head'
import AuthProvider from "../components/auth-provider";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MyNavbar from '../components/navbar';
import MeowerMeow from '../components/test-component';
import Token from '../components/token-image';
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import reactDom from 'react-dom';
import { Grid , TablePagination } from '@mui/material';
import token from '../components/token-image';


export default function Home() {
  


  
  var items = []
  const [tokenArrCreator, updateTokenArrCreator] = useState(null)
  const [tokenArrOwner, updateTokenArrOwner] = useState(null)
  
  const getInventory = async (id) => {
    var tokenTemp = []
    const response = await fetch('https://api.tzkt.io/v1/tokens/balances?account='+id+'&token.contract=KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp&limit=2000')
    const json = await response.json()
    
    // get owned tokens
    for (let i = 0; i < json.length; i++){
        tokenTemp.push(json[i].token.tokenId)
    }
    // get data from owned tokens
    var tokensString = ""
    for (let i = 0; i < tokenTemp.length; i++){
        tokensString += tokenTemp[i]
        if (i < tokenTemp.length - 1){
          tokensString += ","
        }
    }
    const response2 = await fetch('https://api.tzkt.io/v1/contracts/KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp/bigmaps/rgb/keys?key.in='+tokensString+'&limit=2000')
    const json2 = await response2.json()
    var tempTokenArr2 =[]
    var tempTokenArr3 =[]
    // make array of rgb values from tokens omg this is awful carson HELP
    for (let i = 0; i < json2.length; i++){
      if (json2[i].value.creater === id)
      {
        tempTokenArr2.push({rgb:json2[i].value.rgb,id:json2[i].value.token_id})
        console.log(tokenTemp[i]+"TOKEN TEMP")
      } else {
        tempTokenArr3.push({rgb:json2[i].value.rgb,id:json2[i].value.token_id})
        console.log(tokenTemp[i]+"TOKEN TEMP")
      }
      console.log(tokenTemp[i])
      
      
      }
    
    updateTokenArrCreator(tempTokenArr2)
    updateTokenArrOwner(tempTokenArr3)
    console.log(tokenArrOwner)
    console.log(tokenArrCreator)
    }
  
    React.useEffect(() => {
      console.log("SHOULD BE DONE ONLY ONCE")
      if (typeof response === 'undefined'){
        getInventory("tz1aWjNP6Gf4d3zsaA6QwShyLw2t6sgcdZ2B")
      }
    
    }, [])
    //getInventory("tz1aWjNP6Gf4d3zsaA6QwShyLw2t6sgcdZ2B")



  return (
      <>
        <Layout>
          
          <div className='centerContent'>
            
{/*             <Grid container spacing={4} justifyContent="center">
                {items && items.map(item => (
                  <Grid item>
                    {item}
                  </Grid>
                ))}
            </Grid> */}

            <Grid container spacing={4} justifyContent="center">
                {tokenArrCreator && tokenArrCreator.map(({rgb, id}) => (
                  <Grid item>
                    <Token key={id} id={id} rgb={rgb} />
                  </Grid>
                ))}
            </Grid>

          </div>
        </Layout>
      </>
  )
}
