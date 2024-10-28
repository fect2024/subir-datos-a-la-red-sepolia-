const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { ethers } = require('ethers');
require('dotenv').config();
const cors = require('cors'); // Asegúrate de que cors esté importado

const app = express();
const PORT = process.env.PORT || 5000; // Usar el puerto de Heroku o el 5000 localmente

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Middleware para parsear el cuerpo de la solicitud como JSON

app.post('/sendUser', async (req, res) => {
    const userData = req.body;

    // Asegúrate de que se reciban los datos correctos
    if (!userData.cedula || !userData.nombre) {
        return res.status(400).json({ error: "Cédula y nombre son requeridos" });
    }

    // Guardar los datos en singleUser.json
    fs.writeFileSync('singleUser.json', JSON.stringify(userData));

    // Configuración de provider y wallet
    const provider = new ethers.getDefaultProvider("https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = [
        {
            "inputs": [
                { "internalType": "string", "name": "_cedula", "type": "string" },
                { "internalType": "string", "name": "_nombre", "type": "string" }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const userRegistry = new ethers.Contract(contractAddress, abi, wallet);

    try {
        const tx = await userRegistry.registerUser(userData.cedula, userData.nombre);
        
        // Esperar la confirmación de la transacción
        await tx.wait();

        // Enviar el hash de la transacción como respuesta
        res.json({ hash: tx.hash });
    } catch (error) {
        console.error(`Error al registrar usuario: ${error.message}`);
        res.status(500).send('Error al registrar usuario');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
