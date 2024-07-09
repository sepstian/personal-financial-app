import React, { useEffect } from "react";
import { Card, Row } from "antd";

function Cards({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  cardStyle,
  reset,
  cardWidth = { width: "100%", boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)", borderRadius: "0.5rem", },
}) {
  const [isMobile, setIsMobile] = React.useState(window.matchMedia("(max-width: 460px)").matches);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia("(max-width: 460px)").matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function formatRibuan(number) {
    if (typeof number !== 'undefined' && number !== null) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return "0";
    }
  }
  return (

    <Row
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "space-between",
      }}
    >
      <Card className="box-card" bordered={true} style={isMobile ? {...cardWidth, marginTop:"20px"} : cardStyle}>
        <h2>Current Balance</h2>
        <p>Rp{formatRibuan(currentBalance)}</p>
        <div class="btn btn-blue" style={{ margin: 0 }} onClick={reset}>
          Reset Balance
        </div>
      </Card>

      <Card className="box-card" bordered={true} style={isMobile ? cardWidth : cardStyle}>
        <h2>Total Income</h2>
        <p>Rp{formatRibuan(income)}</p>
        <div
          class="btn btn-blue"
          style={{ margin: 0 }}
          onClick={showIncomeModal}
        >
          Add Income
        </div>
      </Card>

      <Card className="box-card" bordered={true} style={isMobile ? cardWidth : cardStyle}>
        <h2>Total Expenses</h2>
        <p>Rp{formatRibuan(expenses)}</p>
        <div className="btn btn-blue" onClick={showExpenseModal}>
          Add Expense
        </div>
      </Card>
    </Row>
  );
}

export default Cards;
