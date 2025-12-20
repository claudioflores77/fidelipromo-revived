import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "¡Éxito!",
      description: "Tu dirección de correo ha sido confirmada.",
      variant: "default"
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Confirmado</CardTitle>
          <CardDescription>
            ¡Gracias! Tu cuenta ha sido verificada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Ya puedes iniciar sesión con tu nueva cuenta.
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Ir a Iniciar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmation;
