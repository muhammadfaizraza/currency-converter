import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Nav, Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCurrencies } from "../Redux/Actions/getCurrencies";
import { convertCurrency } from "../Redux/Actions/convertCurrency";
import ConvertHistory from "./ConvertHistory";
import Loader from "./Loader";
import ConvertedResult from "./ConvertedResult";

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { data: currencies, loading: currenciesLoading } = useSelector(
    (state) => state.getCurrencies
  );
  const { loading: conversionLoading } = useSelector(
    (state) => state.convertCurrency
  );
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState(null);
  const [currencyTo, setCurrencyTo] = useState(null);
  const [amount, setAmount] = useState("");

  const handleFlip = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  const handleConvert = async () => {
    if (!currencyFrom || !currencyTo || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const conversionRecord = {
        from: currencyFrom.value,
        to: currencyTo.value,
        amount,
        date: new Date().toLocaleString(),
      };

      await dispatch(
        convertCurrency({
          conversionRecord,
        })
      );
    } catch (error) {
      console.error("Conversion failed:", error);
    }
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (currencies && Array.isArray(currencies)) {
      const options = currencies.map((item) => ({
        value: item,
        label: item,
      }));
      setCurrencyOptions(options);
    }
  }, [currencies]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12}>
          <Tab.Container defaultActiveKey="convert">
            <Nav
              variant="pills"
              className="justify-content-center mb-4"
              style={{ borderBottom: "2px solid #ddd" }}
            >
              <Nav.Item>
                <Nav.Link eventKey="convert" className="px-4">
                  Convert
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history" className="px-4">
                  History
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* Convert Tab */}
              <Tab.Pane eventKey="convert">
                <h2 className="text-center mb-4">Currency Converter</h2>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                  <Select
                    options={currencyOptions}
                    value={currencyFrom}
                    onChange={setCurrencyFrom}
                    className="mb-3 mb-md-0 w-100 w-md-auto"
                    isLoading={currenciesLoading}
                    placeholder={
                      currenciesLoading
                        ? "Loading currencies..."
                        : "Select a currency"
                    }
                  />

                  <Button
                    onClick={handleFlip}
                    style={{
                      fontSize: "20px",
                      padding: "10px 15px",
                      margin: "10px 0",
                    }}
                    className="mx-md-3 my-3 my-md-0"
                  >
                    ↔
                  </Button>

                  <Select
                    options={currencyOptions}
                    value={currencyTo}
                    onChange={setCurrencyTo}
                    className="w-100 w-md-auto"
                    isLoading={currenciesLoading}
                    placeholder={
                      currenciesLoading
                        ? "Loading currencies..."
                        : "Select a currency"
                    }
                  />
                </div>

                <input
                  type="number"
                  className="form-control mt-3"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                />

                <ConvertedResult />

                <Button
                  onClick={handleConvert}
                  className="mt-4 w-100"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                  }}
                  disabled={conversionLoading}
                >
                  {conversionLoading ? <Loader /> : "Convert"}
                </Button>
              </Tab.Pane>

              {/* History Tab */}
              <Tab.Pane eventKey="history">
                <ConvertHistory />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CurrencyConverter;
