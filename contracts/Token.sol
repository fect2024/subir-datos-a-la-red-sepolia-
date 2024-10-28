// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract UserRegistry {
    struct User {
        string cedula;
        string nombre;
        address walletAddress;
    }

    mapping(address => User) private users;

    // Evento para informar que un usuario ha sido registrado
    event UserRegistered(address indexed walletAddress, string cedula, string nombre);

    // Registrar un usuario si no existe previamente
    function registerUser(string memory _cedula, string memory _nombre) public {
        require(bytes(users[msg.sender].cedula).length == 0, "User already registered.");
        users[msg.sender] = User(_cedula, _nombre, msg.sender);
        emit UserRegistered(msg.sender, _cedula, _nombre);
    }

    // Obtener los datos de un usuario por su dirección
    function getUser(address _userAddress) public view returns (string memory, string memory, address) {
        require(bytes(users[_userAddress].cedula).length > 0, "User not found.");
        User memory user = users[_userAddress];
        return (user.cedula, user.nombre, user.walletAddress);
    }

    // Verificar si un usuario está registrado
    function isUserRegistered(address _userAddress) public view returns (bool) {
        return bytes(users[_userAddress].cedula).length > 0;
    }
}
