import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerData, useCustomerBalances, useCustomerTransactions, useReferralStats } from "@/hooks/useCustomerData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Share2, DollarSign, Users, Store, History, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerApp = () => {
  const navigate = useNavigate();
  const { user, userType, loading, signOut } = useAuth();
  const { customer, loading: customerLoading } = useCustomerData();
  const { balances, totalAvailableBalance, totalEarned, loading: balancesLoading } = useCustomerBalances();
  const { transactions, loading: transactionsLoading } = useCustomerTransactions();
  const { referralCount, referralEarnings, loading: referralLoading } = useReferralStats();
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!loading && (!user || userType !== 'customer')) {
      navigate('/login');
    }
  }, [user, userType, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCopyReferralCode = async () => {
    if (customer?.referral_code) {
      await navigator.clipboard.writeText(customer.referral_code);
      setCopiedCode(true);
      toast({
        title: "¡Código copiado!",
        description: "Tu código de referido ha sido copiado al portapapeles.",
      });
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || customerLoading) {
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
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-primary">FideliPromo</h1>
            {customer && (
              <p className="text-sm text-muted-foreground">
                Hola, {customer.first_name} {customer.last_name}
              </p>
            )}
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="resumen" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="comercios">Mis Comercios</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
            <TabsTrigger value="referidos">Referidos</TabsTrigger>
          </TabsList>

          {/* Resumen Tab */}
          <TabsContent value="resumen" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Cashback Disponible
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {balancesLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(totalAvailableBalance)}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Gift className="h-4 w-4 text-blue-500" />
                    Total Ganado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {balancesLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalEarned)}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Store className="h-4 w-4 text-purple-500" />
                    Comercios Afiliados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {balancesLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">{balances.length}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4 text-orange-500" />
                    Mis Referidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {referralLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">{referralCount}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Referral Code Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-purple-500" />
                  Mi Código de Referido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {customer ? (
                    <>
                      <div className="flex-1 font-mono text-lg bg-muted p-3 rounded border">
                        {customer.referral_code}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyReferralCode}
                        className="px-3"
                      >
                        {copiedCode ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </>
                  ) : (
                    <Skeleton className="h-12 w-full" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Comparte este código con tus amigos para ganar comisiones por sus compras
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comercios Tab */}
          <TabsContent value="comercios" className="space-y-6">
            <div className="grid gap-4">
              {balancesLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-48 mb-4" />
                      <div className="grid grid-cols-3 gap-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : balances.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tienes comercios afiliados</h3>
                    <p className="text-muted-foreground">
                      Cuando hagas tu primera compra en un comercio afiliado, aparecerá aquí.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                balances.map((balance) => (
                  <Card key={balance.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {balance.business?.business_name || 'Comercio'}
                          </h3>
                          {balance.business?.description && (
                            <p className="text-sm text-muted-foreground">
                              {balance.business.description}
                            </p>
                          )}
                        </div>
                        <Badge variant="secondary">
                          {balance.business?.cashback_percentage}% cashback
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(Number(balance.available_balance))}
                          </p>
                          <p className="text-sm text-muted-foreground">Disponible</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="text-2xl font-bold">
                            {formatCurrency(Number(balance.total_earned))}
                          </p>
                          <p className="text-sm text-muted-foreground">Total Ganado</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <p className="text-2xl font-bold">
                            {formatCurrency(Number(balance.total_redeemed))}
                          </p>
                          <p className="text-sm text-muted-foreground">Total Canjeado</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Historial Tab */}
          <TabsContent value="historial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Historial de Compras
                </CardTitle>
              </CardHeader>
              <CardContent>
                {transactionsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No hay transacciones</h3>
                    <p className="text-muted-foreground">
                      Tus compras aparecerán aquí una vez que realices transacciones.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Comercio</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Cashback</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              {formatDate(transaction.created_at)}
                            </TableCell>
                            <TableCell>
                              {transaction.business?.business_name || 'Comercio'}
                            </TableCell>
                            <TableCell>{formatCurrency(Number(transaction.amount))}</TableCell>
                            <TableCell className="text-green-600 font-semibold">
                              {formatCurrency(Number(transaction.cashback_amount))}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                              >
                                {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referidos Tab */}
          <TabsContent value="referidos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Estadísticas de Referidos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {referralLoading ? (
                    <>
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Personas referidas:</span>
                        <span className="font-bold text-lg">{referralCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Ganancias totales:</span>
                        <span className="font-bold text-lg text-green-600">
                          {formatCurrency(referralEarnings)}
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-purple-500" />
                    Compartir Código
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 font-mono text-sm bg-muted p-2 rounded border">
                          {customer.referral_code}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopyReferralCode}
                        >
                          {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Gana comisiones de hasta 3 niveles: 2% del nivel 1, 1% del nivel 2, y 0.5% del nivel 3
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerApp;