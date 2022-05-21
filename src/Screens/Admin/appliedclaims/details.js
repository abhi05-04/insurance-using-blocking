import React, { useEffect, useState } from 'react'
import Insurance from '../../../ethereum/insurance'
import web3 from '../../../ethereum/web3';
import Insurancefactory from '../../../ethereum/admin';
// import Web3 from 'web3';
import Cookies from 'js-cookie';
export default function Details() {

    var [tmp1, setTemp1] = useState();
    var [tmp2, setTemp2] = useState();
    var [insurance, setInsurance] = useState();
    useEffect(() => {
        window.addEventListener('load', async function () {
            // let accounts = await web3.eth.getAccounts();
            console.log(await Insurancefactory.methods.getDeployedInsurances().call());
            const tmpInsurance = Insurance((await Insurancefactory.methods.getDeployedInsurances().call())[Cookies.get('id')]);
            setInsurance(tmpInsurance);
            setTemp1(await tmpInsurance.methods.getMembers(Cookies.get('data')).call());
            setTemp2(await tmpInsurance.methods.getClaim(Cookies.get('data')).call());
            console.log((await tmpInsurance.methods.getMembers(Cookies.get('data')).call()));
        });
    })

    const vote = async () => {
        const accounts = await web3.eth.getAccounts();
        await insurance.methods.approveClaim(tmp2[4]).send({
            from: accounts[0]
        });
    }

    return (
        <div style={{ paddingTop: 80 }}>
            {
                (tmp1 != undefined && tmp1[0] != "" && tmp2!=undefined) ?
                    <div class="card mb-3 text-center">
                        <div class="card-body">
                            <h5 class="card-title">Name: {tmp1[0]}</h5>
                            <p class="card-text">Aadhar Card: {tmp1[1]}</p>
                            <p class="card-text">Email: {tmp1[2]}</p>
                            <p class="card-text">Mobile No: {tmp1[3]}</p>
                            <p class="card-text">Nominee Metamask: {tmp1[5]}</p>
                            <p class="card-text">Ethers: {tmp1[6]}</p>
                            <p class="card-text">Description: {tmp2[0]}</p>
                            <p class="card-text">Document Uploaded</p>
                            <img src={tmp2[1]} class="card-img-top" alt="..." />
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <a onClick={vote} class="btn btn-primary">Approve</a>
                            </div>
                            <div className='col'>
                                <a href="/insurance/lifeinsurance" class="btn btn-primary">Reject</a>
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}