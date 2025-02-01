// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RegistrationSystemModule = buildModule("RegistrationSystemModule", (m) => {


  const registrationSystem = m.contract("RegistrationSystem");

  return { registrationSystem };
});

export default RegistrationSystemModule;
