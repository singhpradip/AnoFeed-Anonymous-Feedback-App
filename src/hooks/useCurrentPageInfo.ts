import { useLocation } from 'react-router-dom';
import { getNavigationByPath } from '../nav';

// Hook to get current page info from navigation config
export const useCurrentPageInfo = () => {
  const location = useLocation();
  const pageInfo = getNavigationByPath(location.pathname);
  
  return {
    title: pageInfo?.label || 'Page',
    description: pageInfo?.description || '',
    icon: pageInfo?.icon,
    isProtected: pageInfo?.requiresAuth || false,
  };
}; 