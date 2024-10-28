require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // Asegúrate de que dotenv esté importado

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY; // Cambiado a process.env
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY; // Cambiado a process.env

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, // Usando la variable de entorno
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
