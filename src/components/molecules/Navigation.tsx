import { useLocation, Link } from 'react-router-dom';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText
} from '../base';
import { navigationItems } from '../../nav';
import { useAuth } from '../../hooks/useAuth';

export const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Only show navigation if user is authenticated
  if (!isAuthenticated) return null;

  return (
    <List>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isActive}
            >
              {item.icon && (
                <ListItemIcon>
                  {/* Material UI icon would go here */}
                  <span>{item.icon}</span>
                </ListItemIcon>
              )}
              <ListItemText 
                primary={item.label}
                secondary={item.description}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

 