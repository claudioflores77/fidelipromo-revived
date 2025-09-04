import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Gift, TrendingUp, CreditCard, Settings, Star, UserPlus } from "lucide-react";
import CustomerRegistrationForm from "@/components/CustomerRegistrationForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userType, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && (!user || userType !== 'business')) {
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
  const stats = [
    {
      icon: Users,
      title: "Clientes Activos",
      value: "1,234",
      growth: "+12% este mes",
      color: "text-blue-600"
    },
    {
      icon: Gift,
      title: "Recompensas Canjeadas",
      value: "89",
      growth: "+8% este mes",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Ventas Incrementales",
      value: "$12,450",
      growth: "+25% este mes",
      color: "text-purple-600"
    },
    {
      icon: CreditCard,
      title: "Transacciones",
      value: "456",
      growth: "+15% este mes",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              FideliPromo
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Plan Starter</Badge>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">¡Bienvenido a tu Dashboard!</h1>
          <p className="text-muted-foreground">
            Aquí tienes un resumen de tu programa de fidelización
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    {stat.growth}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Registration Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Registrar Nuevo Cliente</h2>
          <CustomerRegistrationForm 
            businessId="temp-business-id" 
            onSuccess={() => {
              // Optionally refresh data or show success message
            }}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Gestionar Clientes
              </CardTitle>
              <CardDescription>
                Ve y administra tu base de clientes registrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Ver Clientes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-primary" />
                Configurar Recompensas
              </CardTitle>
              <CardDescription>
                Crea y gestiona los premios para tus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Gestionar Recompensas
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Ver Reportes
              </CardTitle>
              <CardDescription>
                Analiza el rendimiento de tu programa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Ver Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Próximamente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-background/30 backdrop-blur-sm opacity-60">
              <CardHeader>
                <CardTitle className="text-muted-foreground">
                  Integración con POS
                </CardTitle>
                <CardDescription>
                  Conecta directamente con tu sistema de punto de venta
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-background/30 backdrop-blur-sm opacity-60">
              <CardHeader>
                <CardTitle className="text-muted-foreground">
                  App Móvil para Clientes
                </CardTitle>
                <CardDescription>
                  Aplicación nativa para que tus clientes gestionen sus puntos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;