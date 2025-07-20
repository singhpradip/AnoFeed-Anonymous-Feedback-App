import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
} from '../base';
import { Login as LoginIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface AuthLayoutProps {
  children: ReactNode;
}
 
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`auth-tabpanel-${index}`}
    aria-labelledby={`auth-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname === '/login' ? 0 : 1;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ minWidth: 450, maxWidth: 500 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom align="center">
            Anonymous Feedback
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom align="center">
            System
          </Typography>

          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab icon={<LoginIcon />} label="Login" />
            <Tab icon={<PersonAddIcon />} label="Register" />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            {location.pathname === "/login" && children}
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            {location.pathname === "/register" && children}
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}; 