import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Gift, TrendingUp } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCustomerRegister = () => {
    navigate('/register/customer' + (searchParams.get('ref') ? `?ref=${searchParams.get('ref')}` : ''));
  };

  const handleBusinessRegister = () => {
    navigate('/register/business' + (searchParams.get('plan') ? `?plan=${searchParams.get('plan')}` : ''));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Gift className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">¡Únete a FideliPromo!</h1>
          <p className="text-xl text-muted-foreground">
            Elige el tipo de cuenta que mejor se adapte a ti
          </p>
        </div>

        {/* Registration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customer Registration */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10 flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center">
                <Users className="h-6 w-6 mr-3 text-green-600" />
                Soy Cliente
              </CardTitle>
              <CardDescription className="text-base">
                Quiero ganar cashback en mis compras y referir amigos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Gana cashback en cada compra</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Obtén comisiones por referir amigos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Acceso a comercios afiliados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Seguimiento de tus ganancias</span>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full" onClick={handleCustomerRegister}>
                  Registrarme como Cliente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Business Registration */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 flex items-center justify-center">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center">
                <Store className="h-6 w-6 mr-3 text-blue-600" />
                Tengo un Comercio
              </CardTitle>
              <CardDescription className="text-base">
                Quiero fidelizar clientes y aumentar mis ventas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Sistema de cashback personalizable</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Programa de referidos automatizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Analytics y reportes detallados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Dashboard de gestión completo</span>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full" onClick={handleBusinessRegister}>
                  Registrar mi Comercio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium"
            >
              Iniciar sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;