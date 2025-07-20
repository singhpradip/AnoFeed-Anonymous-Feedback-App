import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Chip,
  Avatar,
  Stack
} from '../components/base';
import { useAuth } from '../hooks/useAuth';
import { useDashboardStatsQuery, useUserTeamsQuery } from '../api';
import { generateInitials } from '../utils';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStatsQuery();
  const { data: teamsData, isLoading: isTeamsLoading } = useUserTeamsQuery();

  const stats = statsData?.data;
  const teams = teamsData?.data || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's your feedback overview
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user?.name ? generateInitials(user.name) : 'U'}
          </Avatar>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mb={4}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Feedback
            </Typography>
            <Typography variant="h4">
              {isStatsLoading ? '...' : stats?.totalFeedback || 0}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Received
            </Typography>
            <Typography variant="h4">
              {isStatsLoading ? '...' : stats?.receivedFeedback || 0}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Given
            </Typography>
            <Typography variant="h4">
              {isStatsLoading ? '...' : stats?.givenFeedback || 0}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Teams
            </Typography>
            <Typography variant="h4">
              {isTeamsLoading ? '...' : teams.length}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Teams Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Your Teams
          </Typography>
          
          {isTeamsLoading ? (
            <Typography>Loading teams...</Typography>
          ) : teams.length > 0 ? (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {teams.map((team) => (
                <Chip
                  key={team.id}
                  label={team.name}
                  variant="outlined"
                  clickable
                />
              ))}
            </Box>
          ) : (
            <Box textAlign="center" py={3}>
              <Typography color="text.secondary" mb={2}>
                You're not part of any teams yet
              </Typography>
              <Button variant="contained">
                Create Your First Team
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box mt={4}>
        <Typography variant="h6" component="h2" gutterBottom>
          Quick Actions
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="contained" color="primary">
            Give Feedback
          </Button>
          <Button variant="outlined">
            Create Team
          </Button>
          <Button variant="outlined">
            Join Team
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}; 