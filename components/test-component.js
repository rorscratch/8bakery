import { AuthContext } from "./auth-provider";
import { useContext } from "react";

export default function MeowerMeow(){
    const { status, user, wallet, profileMetadata, isProfileMetadataLoaded } = useContext(AuthContext);

    console.log(profileMetadata)
    return (
        <>
        {isProfileMetadataLoaded && <>
            <img src={"https://services.tzkt.io/v1/avatars2/"+wallet.address} width="30" height="30" className="d-none d-md-inline align-top rounded-circle"/> 
                  {" "}{isProfileMetadataLoaded ? profileMetadata.alias : wallet.addressShortened }
        </>}
        </>
    )
}