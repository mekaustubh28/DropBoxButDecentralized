export const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "int256",
          "name": "fileID",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "fileSize",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileDescription",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "uploadTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "FileUploaded",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "fileCounter",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "name": "fileMap",
      "outputs": [
        {
          "internalType": "int256",
          "name": "fileID",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "fileHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fileName",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "fileSize",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "fileType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fileDescription",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "uploadTime",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_fileHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_fileName",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "_fileSize",
          "type": "int256"
        },
        {
          "internalType": "string",
          "name": "_fileType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_fileDescription",
          "type": "string"
        }
      ],
      "name": "uploadFile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]