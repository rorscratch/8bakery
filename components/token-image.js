import { AuthContext } from "./auth-provider";
import { useContext, useState } from "react";
import Image from 'next/image'
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { Cpu } from "react-bootstrap-icons";

export default function token(props){
    const [image, setImage] = useState(null)
    const [imageString, setImageString] = useState("")
    const [creatorName, setCreatorName] = useState("")
    
    
    function hex_to_ascii(str1)
    {
     var hex  = str1.toString();
     var str = '';
     for (var n = 0; n < hex.length; n += 2) {
       str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
     }
     return str;
    }
    
    function meow(){
      console.log("Meow")
    }
    
    const getImageData = async (id) => {
        //const response = await fetch('https://api.tzkt.io/v1/contracts/KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp/bigmaps/rgb/keys?key='+ id +'&limit=1')
        //const json = await response.json()
        //console.log(json[0])

        setImageString(id)
        console.log("colorval ==" + id)
        //Make 8X8 image
        if(typeof window !== "undefined"){
        console.log("setting color to "+id)
        // can't use setImageString and then read imageString here, have to directly read ID which isn't an issue but I should ask about it
        let t=id.split(""),n=document.createElement("canvas");
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
        setCreatorName("Micheal Henry");
        console.log("set image to " + image)
        }
 
    }
    


    useEffect(() => {
    
      getImageData(props.id)
    
    }, [])


    const [isHovering, setIsHovered] = useState(false);


    return (
    <>
        {image && <Image 
            src={image}
            height={50}
            width={50}
            alt="meow"
            onClick={meow}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
        }
        {isHovering && <p>
          {creatorName}
        </p>}
    </>)
};

