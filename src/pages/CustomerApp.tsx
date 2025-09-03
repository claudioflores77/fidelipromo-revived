import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Share2, DollarSign, Users } from "lucide-react";

const CustomerApp = () => {
  const navigate = useNavigate();
  const { user, userType, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && (!user || userType !== 'customer')) {
      navigate('/login');
    }
  }, [user, userType, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-primary">FideliPromo</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-2">¡Bienvenido a FideliPromo!</h2>
          <p className="text-muted-foreground">
            Gana cashback en cada compra y obtén comisiones por referir amigos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Mi Cashback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$0.00</p>
              <p className="text-sm text-muted-foreground">Disponible para canjear</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Mis Referidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Amigos referidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-purple-500" />
                Código de Referido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-mono bg-muted p-2 rounded">LOADING...</p>
              <Button variant="outline" className="mt-2 w-full">
                Compartir Código
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-orange-500" />
                Comercios Afiliados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Descubre donde puedes ganar cashback
              </p>
              <Button variant="outline" className="w-full">
                Explorar Comercios
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerApp;