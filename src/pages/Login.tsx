import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useStore } from "@/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { contexts, selectedContext, setSelectedContext } = useStore();

  // Redirect if a context is already selected or determined
  useEffect(() => {
    if (!authLoading && user) {
      if (selectedContext) {
        const destination = selectedContext.type === 'business' ? '/dashboard' : '/customer';
        navigate(destination);
      } else if (contexts.length > 0) {
        if (contexts.length === 1) {
          setSelectedContext(contexts[0]);
          const destination = contexts[0].type === 'business' ? '/dashboard' : '/customer';
          navigate(destination);
        } else {
          navigate('/select-context');
        }
      }
    }
  }, [user, contexts, selectedContext, authLoading, navigate, setSelectedContext]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { error } = await signIn(values.email, values.password);

      if (error) {
        toast({
          title: "Error al iniciar sesión",
          description: error.message,
          variant: "destructive",
        });
        form.reset(); // Reset form on error to allow retries
      }
      // Redirection is handled by the useEffect hook
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
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
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>
            Accede a tu cuenta de FideliPromo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Contraseña</FormLabel>
                      <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="Tu contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿Eres comercio y no tienes cuenta?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/register/business')}
              className="w-full"
            >
              Registrar mi Comercio
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              ¿Eres cliente? Tu comercio te proporcionará acceso
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
