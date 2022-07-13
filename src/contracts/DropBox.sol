pragma solidity > 0.5.15;

contract DropBox{
    string public name = "DropBox";
    int public fileCounter = 0;
    // address public fileHash;
    struct FileData{
        int fileID;
        string fileHash;
        string fileName;
        int fileSize;
        string fileType;
        string fileDescription;
        uint uploadTime;
        address owner;
    }

    event FileUploaded(
        int fileID,
        string fileHash,
        string fileName,
        int fileSize,
        string fileType,
        string fileDescription,
        uint uploadTime,
        address owner
    );

    mapping(int => FileData) public fileMap;
    
    function uploadFile(string memory _fileHash, string memory _fileName, int _fileSize, string memory _fileType, string memory _fileDescription) public{
        if(
            bytes(_fileHash).length > 0 &&
            bytes(_fileName).length > 0 &&
            _fileSize > 0 &&
            bytes(_fileType).length > 0 &&
            bytes(_fileDescription).length > 0 &&
            msg.sender != address(0)
        ){
            fileMap[fileCounter] = FileData(fileCounter, _fileHash, _fileName, _fileSize, _fileType, _fileDescription, block.timestamp, msg.sender);

            emit FileUploaded(fileCounter, _fileHash, _fileName, _fileSize, _fileType, _fileDescription, block.timestamp, msg.sender);
            fileCounter++;
        }
    }
    function setName(string memory _name) public {
            name = _name;
        }
    function getName() public view returns (string memory){
        return name;
    }
}