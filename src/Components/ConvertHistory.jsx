import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const ConvertHistory = () => {
  const { historyData } = useSelector((state) => state.convertCurrency);
  return (
    <>
      <h2 className="text-center mb-4">Conversion History</h2>
      {historyData.length === 0 ? (
        <p className="text-center">No conversion history available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Converted Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.from}</td>
                <td>{record.to}</td>
                <td>{record.amount}</td>
                <td>{record.convertedAmount}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ConvertHistory;
