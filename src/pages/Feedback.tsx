import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Stack,
  Chip
} from '../components/base';
import { useReceivedFeedbackQuery } from '../api';
import { formatRelativeTime, capitalizeFirst } from '../utils';

export const Feedback = () => {
  const { data: feedbackData, isLoading } = useReceivedFeedbackQuery();
  const feedback = feedbackData?.data?.data || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          My Feedback
        </Typography>
        <Button variant="contained">
          Give Feedback
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading feedback...</Typography>
      ) : feedback.length > 0 ? (
        <Stack spacing={2}>
          {feedback.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Chip 
                    label={capitalizeFirst(item.category)} 
                    variant="outlined"
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {formatRelativeTime(item.submittedAt)}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {item.content}
                </Typography>
                {item.rating && (
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {item.rating}/5
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" gutterBottom>
              No feedback yet
            </Typography>
            <Typography color="text.secondary" mb={3}>
              You haven't received any feedback yet
            </Typography>
            <Button variant="outlined">
              Ask for Feedback
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}; 