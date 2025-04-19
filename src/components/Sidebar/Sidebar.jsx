import React, { useState } from 'react';
import { Drawer, IconButton, List, Box, Typography, Divider } from '@mui/material';

import SidebarItem from './Items/SidebarItem';
import SidebarCollapseItem from './Items/SidebarCollapseItem';

import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ManualIcon from '@mui/icons-material/Api';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [open, setOpen] = useState(true); // 전체 Drawer 열림 여부
  const [openStatus, setOpenStatus] = useState(false); // 상태 메뉴 열림 여부
  const drawerWidth = open ? 240 : 64;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          p: 2,
        }}
      >
        {open && <Typography variant="h6">Rodi-Factory</Typography>}
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <SidebarItem icon={<MapIcon />} text="Monitoring" path="/map" isOpen={open} />

        <SidebarCollapseItem
          icon={<AnalyticsIcon />}
          text="Status"
          isOpen={open}
          openSub={openStatus}
          onToggle={() => setOpenStatus(!openStatus)}
        >
          {[{ icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' }]}
        </SidebarCollapseItem>

        <SidebarItem icon={<ManualIcon />} text="Manual Control" path="/manual" isOpen={open} />
        <SidebarItem icon={<SettingsIcon />} text="Settings" path="/settings" isOpen={open} />
      </List>
    </Drawer>
  );
};

export default Sidebar;
