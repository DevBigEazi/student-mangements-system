// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract RegistrationSystem {
    address public admin;
    uint256 public studentCounts;

    struct StudentDetails {
        uint256 id;
        string fullName;
        string class;
    }

    StudentDetails[] private students;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Hey! You are not the admin.");
        _;
    }

    function registerStudent(
        string memory _fullName,
        string memory _class
    ) external onlyAdmin returns (bool) {
        require(msg.sender != address(0), "Address zero not allowed");

        require(
            bytes(_fullName).length > 0,
            "Student full name must be filled"
        );

        uint256 studentId = studentCounts++;

        StudentDetails memory studentDetails;

        studentDetails.id = studentId;
        studentDetails.fullName = _fullName;
        studentDetails.class = _class;

        students.push(studentDetails);

        return true;
    }

    function removeStudent(
        uint256 _studentId
    ) external onlyAdmin returns (bool) {
        require(msg.sender != address(0), "Address zero not allowed");

        require(_studentId < students.length, "Out of bound!");

        students[_studentId] = students[students.length - 1];

        students.pop();

        studentCounts--;

        return true;
    }

    function getStudentById(
        uint256 _studentId
    ) external view returns (StudentDetails memory) {
        require(_studentId < students.length, "Out of bound!");

        StudentDetails memory studentDetails = students[_studentId];

        return studentDetails;
    }
}
