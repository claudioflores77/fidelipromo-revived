import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BusinessRegister from "./BusinessRegister";
import CustomerRegister from "./CustomerRegister";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get('type');

  useEffect(() => {
    // If no type specified, default to customer registration
    if (!userType) {
      navigate('/register?type=customer', { replace: true });
    }
  }, [userType, navigate]);

  if (userType === 'business') {
    return <BusinessRegister />;
  }

  if (userType === 'customer') {
    return <CustomerRegister />;
  }

  // Loading state while redirect happens
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

export default Register;