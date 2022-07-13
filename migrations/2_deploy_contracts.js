const DropBox = artifacts.require("DropBox");

module.exports = function(deployer) {
  deployer.deploy(DropBox);
};
