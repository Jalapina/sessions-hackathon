import React ,{useEffect}from 'react'
import Web3 from "web3"
const nft_contract_address = "0x24426a17f5dfcb9c65329776465cf8c5e6d9dd80"
import Sessions from "../../contracts/Sessions.json"

const MintSession = async (_uri) =>{
    let web3 = window.ethereum? new Web3(window.ethereum) : null

    const networkId = await web3.eth.net.getId();

    let smartContract = new web3.eth.Contract(
		Sessions.abi,
		nft_contract_address
    );
    
    // const name = await nftContract.name();
    {useEffect(()=>{
        mint()
    },[])}
    
    const mint = async () => {
        try {
            
            const transaction = await contractState.mint(_uri, {
                value: '10000000000000000',
                gasLimit: 9000000
            });

            await transaction.wait().then(result =>{
                console.log(result);
            })

        } catch (e) {
            console.error(e);
        }

      };

}
export default MintSession