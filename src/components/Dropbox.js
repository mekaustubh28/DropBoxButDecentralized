import React, { useEffect, useState } from "react";
import logo from "../logo.png";
// import { json } from "@nomiclabs/buidler/internal/core/params/argumentTypes";
import List from "./List";
import { useForm } from "react-hook-form";
import "./App.css";
import { create } from "ipfs-http-client";
import DropBox from "../abis/DropBox.json";
import detectEthereumProvider from "@metamask/detect-provider";
// import { abi } from "../abis/abi";
// const Web3 = require("web3");
import Web3 from "web3";
var web3 = new Web3();

export default function Dropbox() {
  const { register, handleSubmit } = useForm();
  const [fileUrl, updateFileUrl] = useState("");
  const [ethID, setEthID] = useState(0);
  const [isConnected, setConnection] = useState(false);
  const [myAccount, setMyAccount] = useState("");
  const [abi, setABI] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [filedata, addFileData] = useState([]);
  const [isAutheticated, userAuthentication] = useState(false);
  const [fileData, setFileData] = useState({
    URL: "",
    Name: "",
    Size: "",
    Type: "",
    Description: "",
  });

  // Connecting to ipfs
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  useEffect(() => {
    connect();
    addFileData([]);
  }, []);

  async function connect() {
    try {
      // const provider = detectEthProvider();
      if (window.ethereum) {
        const provider = await detectEthereumProvider();
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);
        // const provider = web3.eth.getSigner()
        // //console.log(provider);
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const account = accounts[0];
        setEthID(networkId);
        setMyAccount(account);
        connectToBackend(networkId, account);
        userAuthentication(true);
        setConnection(true);
      } else {
        window.alert(
          "Contract is Not Deployed to given network. Change your Network"
        );
      }
    } catch (error) {
      //console.log(error);
    }
  }

  function disconnect() {
    setConnection(false);
    updateFileUrl("");
    setEthID(0);
    setMyAccount("");
    setABI("");
    setContractAddress("");
    addFileData([]);
    userAuthentication(false);
    setFileData({
      URL: "",
      Name: "",
      Size: "",
      Type: "",
      Description: "",
    });
    // window.location.reload();
  }

  async function connectToBackend(networkId, account) {
    const networkID = networkId;
    const networkData = DropBox.networks[networkID];
    console.log(networkData.address);
    if (networkData) {
      await window.ethereum.enable();
      const abi = DropBox.abi;
      const contractAddress = networkData.address;
      setABI(abi);
      setContractAddress(contractAddress);
      // var contract = new web3.eth.Contract(abi, contractAddress, {
      //   from: myAccount,
      //   gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
      // });
      var contract = new web3.eth.Contract(DropBox.abi, networkData.address);
      contract.setProvider(window.ethereum);

      contract.methods.fileCounter().call(function (error, result) {
        console.log(result, error);
        for (var x = 0; x < result; x++) {
          contract.methods
            .fileMap(x)
            .call({ from: myAccount }, function (error, result) {
              var newData = {
                fileID: result.fileID,
                fileHash: result.fileHash,
                fileName: result.fileName,
                fileSize: result.fileSize,
                fileDescription: result.fileDescription,
                fileType: result.fileType,
                owner: result.owner,
                uploadTime: result.uploadTime,
              };

              addFileData((filedata) => [...filedata, newData]);
            });
        }
      });
    } else {
      window.alert("Smart Contract not detected!!");
    }
  }

  async function sendToBlockchain(fileData) {
    var contract = new web3.eth.Contract(abi, contractAddress);
    contract.setProvider(window.ethereum);
    console.log("yes!!");
    contract.methods
      .uploadFile(
        fileData.URL,
        fileData.Name,
        fileData.Size,
        fileData.Type,
        fileData.Description
      )
      .send({ from: myAccount }, function (error, transactionHash) {
        // console.log(transactionHash);
        window.location.reload();
      });

    // window.location.reload();
    //console.log("File successfully Uploaded to IPFS");
  }

  async function onSubmit(data) {
    const file = data.file[0];
    console.log(file.type);
    try {
      const added = await ipfs.add(file);
      console.log("noobs");
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      var filedata = {
        URL: url,
        Name: file.name,
        Size: file.size,
        Type: file.type,
        Description: file.name + "fofobar",
      };
      setFileData(filedata);
      updateFileUrl(...fileUrl, url);
      await sendToBlockchain(filedata);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-light fixed-top flex-md-nowrap p-0">
        <a
          className="navbar-brand col-3 col-md-2 mr-0"
          href="."
          target="_blank"
          rel="noopener noreferrer"
        >
          DropBox but Decentralized
        </a>
        {}
        {!isConnected && (
          <button type="button" onClick={connect} class="login btn btn-primary">
            Login
          </button>
        )}
        {isConnected && (
          <div className="disconnect">
            <a
              href={"https://etherscan.io/address/" + myAccount}
              style={{ color: "#000", marginTop: "100px!" }}
              target="_blank"
              rel="noopener noreferrer"
              className="account"
            >
              {myAccount.substring(0, 6) +
                "...." +
                myAccount.substring(myAccount.length - 6)}
            </a>
            <button
              style={{ marginLeft: "20px" }}
              onClick={disconnect}
              class="login btn btn-primary"
            >
              LogOut
            </button>
          </div>
        )}
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="container-fluid m-2">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} className="App-logo" alt="logo" width="300vw" />
              </a>
              <br />
              <br />
              <h1>Login to Upload a File</h1>
              {isAutheticated && (
                <form className="" style={{ marginTop: "20px" }}>
                  <div className="file-input">
                    <div class="mb-3 container-fluid" style={{ width: "40vw" }}>
                      <input
                        class="file form-control form-control-lg"
                        {...register("file", { required: true })}
                        type="file"
                        id="formFileLg"
                      />
                    </div>
                    <br />
                    <input class="btn btn-primary" type="submit" value="Submit" onClick={handleSubmit(onSubmit)} />
                  </div>
                </form>
              )}

              <div className="fileContent container-fluid" style={{width:'70vw'}}>
                <ul>
                  <table class="table">
                    <thead>
                      <List
                        id="ID"
                        key="Key"
                        hash="URL"
                        name="Name"
                        description="Description"
                        type="Type"
                        owner="Owner"
                        size="Size"
                        time="Upload Time"
                        weight="bold"
                      ></List>
                    </thead>
                    <tbody>
                      {filedata.map((file, index) => (
                        <List
                          id={file.fileID}
                          key={index}
                          hash={file.fileHash}
                          name={file.fileName}
                          description={file.fileDescription}
                          type={file.fileType}
                          owner={file.owner}
                          size={file.fileSize}
                          time={file.uploadTime}
                          weight="normal"
                        ></List>
                      ))}
                    </tbody>
                  </table>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// export default App;
