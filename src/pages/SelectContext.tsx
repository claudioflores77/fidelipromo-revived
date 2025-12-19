import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore, AppContext } from "@/store";
import { useEffect } from "react";

const SelectContext = () => {
  const navigate = useNavigate();
  const { contexts, setSelectedContext, user } = useStore();

  useEffect(() => {
    // If there's no user or contexts, redirect to login
    if (!user || !contexts || contexts.length === 0) {
      navigate('/login');
    }
    // If there's only one context, select it automatically and redirect
    else if (contexts.length === 1) {
      setSelectedContext(contexts[0]);
      const destination = contexts[0].type === 'business' ? '/dashboard' : '/customer';
      navigate(destination);
    }
  }, [user, contexts, navigate, setSelectedContext]);

  const handleSelectContext = (context: AppContext) => {
    setSelectedContext(context);
    const destination = context.type === 'business' ? '/dashboard' : '/customer';
    navigate(destination);
  };

  if (!contexts || contexts.length <= 1) {
    // Render nothing or a loading spinner while redirecting
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Seleccionar Contexto</CardTitle>
          <CardDescription>
            Tienes varios roles. Por favor, elige cómo quieres continuar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contexts.map((context, index) => (
            <Button
              key={index}
              onClick={() => handleSelectContext(context)}
              className="w-full"
              variant="outline"
            >
              {context.type === 'business'
                ? `Administrar ${context.name}`
                : 'Acceder como Cliente'}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectContext;
