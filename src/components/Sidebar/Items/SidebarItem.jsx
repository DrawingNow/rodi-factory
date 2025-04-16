import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export default function SidebarItem({ icon, text, path, isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isSelected = location.pathname === path;

  return (
    <ListItemButton
      onClick={() => navigate(path)}
      selected={isSelected}
      sx={{
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.palette.action.selected + 'CC',
          },
        },
      }}
    >
      <ListItemIcon sx={{ color: theme.palette.text.primary }}>{icon}</ListItemIcon>
      {isOpen && <ListItemText primary={text} />}
    </ListItemButton>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
