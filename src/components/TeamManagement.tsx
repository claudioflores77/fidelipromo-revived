import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Trash2 } from 'lucide-react';

type BusinessUser = {
  id: string;
  email: string;
  role: 'admin' | 'operator';
};


const TeamManagement = () => {
  const { businessId, user } = useAuth();
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<BusinessUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'operator'>('operator');
  const [isInviting, setIsInviting] = useState(false);

  const fetchTeamMembers = useCallback(async () => {
    if (!businessId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('business_users')
        .select('id, user_id, role')
        .eq('business_id', businessId);

      if (error) throw error;

      // For now, we'll use user_id as identifier - email lookup would need a separate query
      const members: BusinessUser[] = (data || []).map((item) => ({
        id: item.user_id || item.id,
        email: `Usuario ${item.user_id?.slice(0, 8) || 'N/A'}`,
        role: item.role as 'admin' | 'operator',
      }));
      setTeamMembers(members);
    } catch (error) {
       const supabaseError = error as { message?: string };
      toast({
        title: "Error",
        description: supabaseError.message || "No se pudo cargar la lista de miembros del equipo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [businessId, toast]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !businessId) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsInviting(true);
    try {
      const { data, error } = await supabase.rpc('invite_user_to_business', {
        p_email: inviteEmail,
        p_business_id: businessId,
        p_role: inviteRole
      });

      if (error) throw error;

      if (data && data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Usuario añadido",
        description: `${inviteEmail} ha sido añadido al equipo.`,
      });
      setInviteEmail('');
      fetchTeamMembers();
    } catch (error) {
      const supabaseError = error as { message?: string };
      toast({
        title: "Error al añadir usuario",
        description: supabaseError.message || "No se pudo añadir al usuario.",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const handleDelete = async (userIdToDelete: string) => {
    if (userIdToDelete === user?.id) {
      toast({
        title: "Acción no permitida",
        description: "No puedes eliminarte a ti mismo.",
        variant: "destructive",
      });
      return;
    }

    try {
       const { error } = await supabase
        .from('business_users')
        .delete()
        .eq('user_id', userIdToDelete)
        .eq('business_id', businessId!);

      if (error) throw error;

      toast({
        title: "Usuario eliminado",
        description: "El miembro del equipo ha sido eliminado.",
      });
      fetchTeamMembers();
    } catch (error) {
      const supabaseError = error as { message?: string };
      toast({
        title: "Error al eliminar",
        description: supabaseError.message || "No se pudo eliminar al miembro del equipo.",
        variant: "destructive",
      });
    }
  };


  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Añadir Miembro al Equipo</CardTitle>
          <CardDescription>
            Añade un usuario existente en FideliPromo a tu equipo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Email del usuario a añadir"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Select value={inviteRole} onValueChange={(value: 'admin' | 'operator') => setInviteRole(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operator">Operador</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isInviting}>
              {isInviting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              Invitar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Miembros del Equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                      {member.role === 'admin' ? 'Administrador' : 'Operador'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
                      disabled={member.id === user?.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
