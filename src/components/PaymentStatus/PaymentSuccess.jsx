import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tran_id } = useParams();
  return (
    <div>
      <h3>Payment is done successfully</h3>
      <p>Trx id: {tran_id}</p>
    </div>
  );
};

export default PaymentSuccess;
