import Head from 'next/head'
import AuthProvider from '../../components/auth-provider';
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Token from '../../components/token-image';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import reactDom from 'react-dom';
import { Grid , TablePagination } from '@mui/material';
import token from '../../components/token-image';
import router, { useRouter } from 'next/router'



export default function Home() {
  var TokenID = 0
  const { asPath } = useRouter()
  const [image, setImage] = useState(null)
  const [imageString, setImageString] = useState("")
  const [creatorName, setCreatorName] = useState("")


  React.useEffect(() => {
/*     if (TokenID == null){
      getImageData(100)
    } else {
    getImageData(TokenID)} */
    
    
    //const { asPath} = router.pathname;
    //TokenID = router.query
    if(asPath.replace('/tokens/','') !== '[id]'){
    console.log("REAL ROUTER ID HOURS: "+ asPath.replace('/tokens/',''))
    getImageData(asPath.replace('/tokens/',''))
    }
  }, [asPath])
  

  // make Token Image
  const getImageData = async (id) => {
    const response = await fetch('https://api.tzkt.io/v1/contracts/KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp/bigmaps/rgb/keys?key='+ id +'&limit=1')
    const json = await response.json()
    console.log("Drawing image of "+id)
    const imageString2 = json[0].value.rgb
    //Make 8X8 image
    if(typeof window !== "undefined"){
    // can't use setImageString and then read imageString here, have to directly read ID which isn't an issue but I should ask about it
    let t=imageString2.split(""),n=document.createElement("canvas");
    n.width=8,n.height=8;
    let a=n.getContext("2d");
    a.clearRect(0,0,8,8);
    let o=0;
    for(let e=0;e<8;e++)
      for(let n=0;n<8;n++){
        let l="#"+(t[o]+t[o+1]+t[o+2]+t[o+3]+t[o+4]+t[o+5]);
        a.fillStyle=l,a.fillRect(n,e,1,1),o+=6
      }
    console.log(imageString)
    setImage(n.toDataURL("image/png",1))
    //const byteArray = json[0].value.creater_name.match(/.{1,2}/g);
    //setCreatorName(hex_to_ascii(json[0].value.creater_name));
    setCreatorName("5124");
    console.log("set image to " + image)
    }

}

//getImageData(Index())



return (
      <>
        <Layout>
          
          <div className='centerContent'>
            {image && <Image 
            src={image}
            height={250}
            width={250}
            alt="meow">

            </Image>}
          </div>
        </Layout>
      </>
  )
}