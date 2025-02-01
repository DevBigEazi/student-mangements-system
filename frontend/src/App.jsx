import { useState } from "react";
import { ethers } from "ethers";
import contractAbi from "./abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contractAddress = "0xf3a085BeBc772f4CD530584f575996554d77c99a";

function App() {
  const [fullName, setFullName] = useState("");
  const [curentClass, setCurentClass] = useState("");
  const [studentDetails, setStudentDetails] = useState();
  const [studentId, setStudentId] = useState();

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const handleRegisterStudent = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      try {
        const tx = await contractInstance.registerStudent(
          fullName,
          curentClass
        );

        toast.info("Adding student...", {
          autoClose: false,
          toastId: "addStudent",
        });

        await tx.wait();

        setFullName("");
        setCurentClass("");

        toast.dismiss("addStudent");
        toast.success("Success");
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    } else {
      await requestAccount();
    }
  };

  const handleRemoveStudent = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      try {
        const tx = await contractInstance.removeStudent(studentId);

        toast.info("Removing student...", {
          autoClose: false,
          toastId: "rmvStudent",
        });

        await tx.wait();

        setStudentId("");

        toast.dismiss("rmvStudent");
        toast.success("Success");
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    } else {
      await requestAccount();
    }
  };

  const handleGetStudentById = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );

      try {
        const result = await contractInstance.getStudentById(studentId);

        toast.info("Fetching ...", {
          autoClose: false,
          toastId: "fetch",
        });

        setStudentDetails(result);

        toast.dismiss("fetch");
        toast.success("Success");
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    } else {
      await requestAccount();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Student Registration System
        </h1>

        {/* Register Student Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Register a New Student</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Class"
              value={curentClass}
              onChange={(e) => setCurentClass(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleRegisterStudent}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Register Student
            </button>
          </div>
        </div>

        {/* Remove Student Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Remove a Student</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleRemoveStudent}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              Remove Student
            </button>
          </div>
        </div>

        {/* Get Student by ID Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Get Student by ID</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleGetStudentById}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Get Student Details
            </button>
          </div>
        </div>

        {/* Display Registered Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <span>Student Details: {studentDetails}</span>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
