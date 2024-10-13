import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BkashCallback = () => {
  const router = useRouter();
  const { paymentID, status } = router.query;

  useEffect(() => {
    if (paymentID && status) {
      if (status === 'success') {
        // Redirect to the success page
        router.push(`/purchase/payment-success?paymentID=${paymentID}`);
      } else {
        // Redirect to the failure page
        router.push(`/purchase/payment-failure?paymentID=${paymentID}`);
      }
    }
  }, [paymentID, status, router]);

  return (
    <div>
      <p>Redirecting based on payment status...</p>
    </div>
  );
};

export default BkashCallback;
