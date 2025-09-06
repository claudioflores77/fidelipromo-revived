import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, TrendingUp, Star, DollarSign, ArrowRight, Zap, Shield, Share2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      title: "Comercios Activos",
      value: "500+",
      growth: "+25% este mes"
    },
    {
      icon: DollarSign,
      title: "Cashback Distribuido",
      value: "$45,000",
      growth: "+40% vs mes anterior"
    },
    {
      icon: TrendingUp,
      title: "Ventas Incrementales",
      value: "35%",
      growth: "promedio por comercio"
    },
    {
      icon: Star,
      title: "Satisfacción Cliente",
      value: "4.8/5",
      growth: "98% lo recomiendan"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Cashback Inteligente",
      description: "Cada compra genera un porcentaje de vuelta que se acumula como saldo para el próximo consumo en tu negocio."
    },
    {
      icon: Share2,
      title: "Referidos Multinivel",
      description: "Tus clientes se convierten en embajadores. Hasta 3 niveles de comisiones por referir nuevos compradores."
    },
    {
      icon: Shield,
      title: "Sin Apps que Descargar",
      description: "Web App progresiva (PWA) que funciona desde cualquier navegador y se puede instalar como una app nativa."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              FideliPromo
            </span>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión (Clientes)
            </Button>
            <Button 
              onClick={() => navigate('/register/business')}
            >
              Registrar Comercio
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Transforma cada cliente en tu mejor promotor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            FideliPromo fusiona cashback inteligente con referidos multinivel. 
            Más que fidelización: un ecosistema de crecimiento orgánico para tu negocio en Resistencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/register/business')}
              className="text-lg px-8 py-4"
            >
              Prueba Gratuita 30 Días
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/demo')}
              className="text-lg px-8 py-4"
            >
              Ver Demo
            </Button>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.title}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.growth}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="text-2xl font-bold">FideliPromo</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Tu aliado estratégico en fidelización y crecimiento
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 FideliPromo. Todos los derechos reservados. Hecho en Resistencia, Chaco.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
