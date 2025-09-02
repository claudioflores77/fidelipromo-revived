import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Gift, TrendingUp, ArrowLeft, Play } from "lucide-react";

const Demo = () => {
  const features = [
    {
      title: "Dashboard Intuitivo",
      description: "Monitorea tus métricas de fidelización en tiempo real",
      preview: "Vista previa del dashboard con gráficos interactivos"
    },
    {
      title: "Gestión de Recompensas",
      description: "Crea y administra diferentes tipos de recompensas",
      preview: "Interfaz para configurar puntos, descuentos y premios"
    },
    {
      title: "Programa de Referidos",
      description: "Incentiva a tus clientes a traer nuevos usuarios",
      preview: "Sistema automático de tracking de referidos"
    },
    {
      title: "Analytics Avanzados",
      description: "Reportes detallados sobre el comportamiento de tus clientes",
      preview: "Análisis de retención, lifetime value y segmentación"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              FideliPromo
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Empezar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            🎬 Demo Interactivo
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Ve FideliPromo<br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              en Acción
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explora todas las funcionalidades de nuestra plataforma de fidelización 
            con datos reales y casos de uso prácticos.
          </p>
          
          {/* Video Demo Placeholder */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Video Demo</h3>
                  <p className="text-muted-foreground">
                    Ver recorrido completo de la plataforma (5 min)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <Link to="/register">
                Comenzar Prueba Gratuita
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link to="/">
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Demo */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades Principales</h2>
            <p className="text-muted-foreground">
              Descubre cómo FideliPromo puede transformar tu negocio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                      {index === 0 && <TrendingUp className="w-5 h-5 text-primary" />}
                      {index === 1 && <Gift className="w-5 h-5 text-primary" />}
                      {index === 2 && <Users className="w-5 h-5 text-primary" />}
                      {index === 3 && <TrendingUp className="w-5 h-5 text-primary" />}
                    </div>
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-muted-foreground text-center px-4">
                      {feature.preview}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Empezar?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comienza tu prueba gratuita de 14 días, sin tarjeta de crédito requerida
          </p>
          <Button size="lg" className="px-8" asChild>
            <Link to="/register">
              Crear Cuenta Gratis
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Demo;