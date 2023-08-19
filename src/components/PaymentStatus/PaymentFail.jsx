import { useParams } from "react-router-dom";

const PaymentFail = () => {
  const { tran_id } = useParams();
  return (
    <div>
      <h3>Payment fail</h3>
      <p className="text-red-500">Trx id: {tran_id}</p>
    </div>
  );
};

export default PaymentFail;
