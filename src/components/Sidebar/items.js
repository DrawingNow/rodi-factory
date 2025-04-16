import MapIcon from '@mui/icons-material/Map';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const sidebarItems = [
  { label: '지도', icon: <MapIcon />, href: '/' },
  { label: '상태 그래프', icon: <ShowChartIcon />, href: '/status' },
  { label: '로그 뷰어', icon: <ListAltIcon />, href: '/logs' },
];
