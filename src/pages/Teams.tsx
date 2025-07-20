import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Stack
} from '../components/base';
import { useUserTeamsQuery } from '../api';

export const Teams = () => {
  const { data: teamsData, isLoading } = useUserTeamsQuery();
  const teams = teamsData?.data || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Teams
        </Typography>
        <Button variant="contained">
          Create Team
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading teams...</Typography>
      ) : teams.length > 0 ? (
        <Stack spacing={2}>
          {teams.map((team) => (
            <Card key={team.id}>
              <CardContent>
                <Typography variant="h6">{team.name}</Typography>
                {team.description && (
                  <Typography color="text.secondary">{team.description}</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" gutterBottom>
              No teams yet
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Create your first team to start collecting feedback
            </Typography>
            <Button variant="contained">
              Create Your First Team
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}; 