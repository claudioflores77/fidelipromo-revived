import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, TrendingUp, Star, DollarSign, ArrowRight, Zap, Shield, Share2 } from "lucide-react";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    navigate(`/register?type=business&plan=${planId}`);
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/mes',
      description: 'Perfecto para pequeños comercios que inician en fidelización',
      features: [
        'Hasta 100 clientes activos',
        'Sistema básico de cashback',
        'Referidos de 1 nivel',
        'Reportes básicos',
        'Soporte por email'
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$79',
      period: '/mes',
      description: 'Ideal para comercios en crecimiento con mayor volumen',
      features: [
        'Hasta 500 clientes activos',
        'Cashback personalizado por producto',
        'Referidos multinivel (3 niveles)',
        'Reportes avanzados y analytics',
        'Promociones especiales',
        'Soporte prioritario',
        'Integración con POS'
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: '/mes',
      description: 'Para grandes comercios y cadenas con múltiples sucursales',
      features: [
        'Clientes ilimitados',
        'Múltiples sucursales',
        'Cashback avanzado con IA',
        'Referidos multinivel ilimitados',
        'Dashboard ejecutivo completo',
        'API personalizada',
        'Soporte dedicado 24/7',
        'Integración completa con sistemas'
      ],
      popular: false,
    },
  ];

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
              Iniciar Sesión
            </Button>
            <Button 
              onClick={() => navigate('/register?type=customer')}
              variant="outline"
              className="hidden sm:inline-flex"
            >
              Soy Cliente
            </Button>
            <Button 
              onClick={() => navigate('/register?type=business')}
            >
              Soy Comercio
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
              onClick={() => navigate('/register?type=business')}
              className="text-lg px-8 py-4"
            >
              Prueba Gratuita 14 Días
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

      {/* Pricing Section */}
      <section className="py-20 px-4" id="pricing">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Planes diseñados para comercios de todos los tamaños
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde pequeños emprendimientos hasta grandes cadenas. 
              Comienza gratis y escala según tu crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-xl scale-105' 
                    : 'hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary">
                    Más Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm min-h-[60px]">
                    {plan.description}
                  </CardDescription>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? ''
                        : 'variant-secondary'
                    }`}
                    variant={plan.popular ? 'default' : 'secondary'}
                    onClick={() => handlePlanSelection(plan.id)}
                  >
                    Comenzar con {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/register?type=customer')}
              className="mx-auto"
            >
              ¿Eres cliente? Regístrate aquí para ganar cashback
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
