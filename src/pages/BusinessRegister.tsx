import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const BusinessRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const selectedPlan = searchParams.get('plan') || 'starter';

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    phone: '',
    address: '',
    plan: selectedPlan
  });

  const businessTypes = [
    'Restaurante',
    'Tienda de Ropa',
    'Farmacia',
    'Supermercado',
    'Belleza y Estética',
    'Electrónicos',
    'Librería',
    'Ferretería',
    'Panadería',
    'Otro'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, 'business', {
        business_name: formData.businessName,
        business_type: formData.businessType,
        phone: formData.phone,
        address: formData.address,
        plan: formData.plan
      });

      if (error) {
        toast({
          title: "Error al registrar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Registro exitoso!",
          description: "Revisa tu email para confirmar tu cuenta y acceder al dashboard",
        });
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Registrar Comercio</CardTitle>
          <CardDescription>
            Únete a FideliPromo y transforma tu negocio con nuestro sistema de fidelización
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="businessName">Nombre del Comercio</Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                required
                placeholder="Ej: Mi Tienda"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Comercial</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="comercio@ejemplo.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Ej: +54 3722 123456"
              />
            </div>

            <div>
              <Label htmlFor="businessType">Tipo de Negocio</Label>
              <Select 
                value={formData.businessType} 
                onValueChange={(value) => handleInputChange('businessType', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de negocio" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Calle 123, Resistencia, Chaco"
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                placeholder="Repite la contraseña"
              />
            </div>

            <div>
              <Label htmlFor="plan">Plan Seleccionado</Label>
              <Select 
                value={formData.plan} 
                onValueChange={(value) => handleInputChange('plan', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter - $29/mes</SelectItem>
                  <SelectItem value="pro">Professional - $79/mes</SelectItem>
                  <SelectItem value="enterprise">Enterprise - $199/mes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                'Crear Cuenta de Comercio'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:underline"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessRegister;