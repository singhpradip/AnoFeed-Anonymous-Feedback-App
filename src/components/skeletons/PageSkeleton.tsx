import { Box, Container, Skeleton, Stack } from '../base';

export const PageSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Header skeleton */}
        <Box>
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="text" width="60%" height={24} />
        </Box>

        {/* Content skeleton */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Skeleton variant="rectangular" height={200} sx={{ flex: 1 }} />
          <Skeleton variant="rectangular" height={200} sx={{ flex: 1 }} />
          <Skeleton variant="rectangular" height={200} sx={{ flex: 1 }} />
        </Stack>

        {/* Additional content skeleton */}
        <Box>
          <Skeleton variant="text" width="30%" height={32} />
          <Skeleton variant="rectangular" height={300} />
        </Box>
      </Stack>
    </Container>
  );
}; 