import { useParams } from "react-router-dom";

const PaymentCancel = () => {
  const { tran_id } = useParams();
  return (
    <div>
      <h3>Payment Cancel</h3>
      <p className="text-yellow-500">Trx id: {tran_id}</p>
    </div>
  );
};

export default PaymentCancel;
