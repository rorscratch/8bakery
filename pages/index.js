import Head from 'next/head'
import AuthProvider from "../components/auth-provider";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MyNavbar from '../components/navbar';
import MeowerMeow from '../components/test-component';
import Token from '../components/token-image';
import React, { useState, useEffect } from 'react';

export default function Home() {
  
  const [tokenArr, updateTokenArr] = useState(null)
  const getInventory = async (id) => {
    const response = await fetch('https://api.tzkt.io/v1/tokens/balances?account='+id+'&token.contract=KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp&limit=2000')
    const json = await response.json()
    var tokenTemp = []

    // get owned tokens
    for (let i = 0; i < json.length; i++){
        tokenTemp.push(json[i].token.tokenId)
    }
    // get data from owned tokens
    var tokensString = ""
    for (let i = 0; i < tokenTemp.length; i++){
        //console.log(tokenTemp[i])
        tokensString += tokenTemp[i]
        if (i < tokenTemp.length - 1){
          tokensString += ","
        }
    }
    console.log(tokensString)
    const response2 = await fetch('https://api.tzkt.io/v1/contracts/KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp/bigmaps/rgb/keys?key.in='+tokensString+'&limit=2000')
    const json2 = await response2.json()
    console.log(json2)
    var tempTokenArr2 =[]
    // make array of rgb values from tokens omg this is awful carson HELP
    for (let i = 0; i < json2.length; i++){
      tempTokenArr2.push(json2[i].value.rgb)

    }
    updateTokenArr(tempTokenArr2)
    console.log(tokenArr)
  }
    
    useEffect(() => {
    
      if (typeof response === 'undefined'){
        getInventory("tz1aWjNP6Gf4d3zsaA6QwShyLw2t6sgcdZ2B")
      }
    
    }, [])
    //getInventory("tz1aWjNP6Gf4d3zsaA6QwShyLw2t6sgcdZ2B")

  
  
 
 
  return (
      <>
        <MyNavbar />
        <MeowerMeow />
        {tokenArr && tokenArr.map(item => (
          <Token key={item} id={item} />
        ))}
        
      </>
  )
}
