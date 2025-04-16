import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  ListItem,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SidebarItem from './SidebarItem';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function SidebarCollapseItem({ icon, text, isOpen, openSub, onToggle, children }) {
  const location = useLocation();
  const theme = useTheme();

  const isSelected =
    Array.isArray(children) && children.some((child) => location.pathname === child.path);

  return (
    <>
      <ListItemButton
        onClick={onToggle}
        selected={isSelected}
        sx={{
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
        <ListItemIcon>{icon}</ListItemIcon>
        {isOpen && (
          <>
            <ListItemText primary={text} />
            {openSub ? <ExpandLess /> : <ExpandMore />}
          </>
        )}
      </ListItemButton>
      <Collapse in={openSub} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Array.isArray(children) &&
            children.map((child) => (
              <ListItem key={child.text} disablePadding sx={{ pl: 4 }}>
                <SidebarItem
                  icon={child.icon}
                  text={child.text}
                  path={child.path}
                  isOpen={isOpen}
                />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  );
}

SidebarCollapseItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openSub: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
