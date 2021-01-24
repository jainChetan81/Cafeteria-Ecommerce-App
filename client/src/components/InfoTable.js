import React from "react";

function InfoTable({ formData, userID }) {
    return (
        <table className="table table-striped table-dark">
            <tbody>
                <tr>
                    <th scope="row">Registration ID</th>
                    <td>{userID}</td>
                </tr>
                <tr>
                    <th scope="row">ID Card</th>
                    <td>
                        <img
                            src={formData.image}
                            style={{ width: "10rem", height: "7rem" }}
                            alt="product"
                            className="img-fluid ml-4"
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">Full Name</th>
                    <td>{formData.name}</td>
                </tr>
                <tr>
                    <th scope="row">Organization name</th>
                    <td>{formData.orgName}</td>
                </tr>
                <tr>
                    <th scope="row">Employee ID no.</th>
                    <td>{formData.empId}</td>
                </tr>
                <tr>
                    <th scope="row">Mobile No.</th>
                    <td>{formData.mobile}</td>
                </tr>
                <tr>
                    <th scope="row">E-Mail</th>
                    <td>{formData.email}</td>
                </tr>
                <tr>
                    <th scope="row">Payment Type</th>
                    <td>{formData.payment}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default InfoTable;
