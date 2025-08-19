import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, TrendingUp, CreditCard, Star, ArrowRight } from "lucide-react";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>('starter');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/mes',
      description: 'Perfecto para pequeños negocios',
      features: [
        'Hasta 500 clientes',
        'Sistema de puntos básico',
        '3 tipos de recompensas',
        'Dashboard básico',
        'Soporte por email'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$79',
      period: '/mes',
      description: 'Ideal para negocios en crecimiento',
      features: [
        'Hasta 2,500 clientes',
        'Sistema de puntos avanzado',
        'Recompensas ilimitadas',
        'Analytics completos',
        'Programa de referidos',
        'API acceso',
        'Soporte prioritario'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      period: '/mes',
      description: 'Para grandes empresas',
      features: [
        'Clientes ilimitados',
        'Todas las funciones Pro',
        'Integración personalizada',
        'Manager dedicado',
        'SLA garantizado',
        'White-label disponible'
      ],
      popular: false
    }
  ];

  const stats = [
    {
      icon: Users,
      title: "Clientes Activos",
      value: "12,345",
      growth: "+23% este mes"
    },
    {
      icon: Gift,
      title: "Recompensas Canjeadas",
      value: "1,847",
      growth: "+18% este mes"
    },
    {
      icon: TrendingUp,
      title: "Ventas Incrementales",
      value: "$45,230",
      growth: "+35% este mes"
    },
    {
      icon: CreditCard,
      title: "Transacciones",
      value: "8,921",
      growth: "+28% este mes"
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
            <Button variant="ghost">Iniciar Sesión</Button>
            <Button>Empezar Gratis</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Plataforma de Fidelización #1 en LATAM
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Fideliza Clientes.<br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Incrementa Ventas.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transforma cada transacción en una oportunidad de fidelización con nuestro sistema 
            integral de recompensas, cashback y referidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Comenzar Prueba Gratuita
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resultados que Hablan por Sí Mismos</h2>
            <p className="text-muted-foreground">Datos promedio de nuestros clientes en los últimos 6 meses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {stat.growth}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planes Diseñados para tu Crecimiento</h2>
            <p className="text-muted-foreground">Comienza gratis y escala según tus necesidades</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-primary shadow-lg shadow-primary/10' 
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Más Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.id === 'starter' ? 'Comenzar Gratis' : 'Elegir Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">FideliPromo</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            La plataforma de fidelización que impulsa el crecimiento de tu negocio
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 FideliPromo. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
