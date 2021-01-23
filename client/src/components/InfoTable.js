import React from "react";

function InfoTable({ formData }) {
    return (
        <table className="table table-striped table-dark">
            <tbody>
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
