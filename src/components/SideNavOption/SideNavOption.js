import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';

function SideNavOption({ name, playlistId }) {
  const history = useHistory();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => history.push(`/playlist/${playlistId}`)}>
        <ListItemText primary={name} sx={{ color: 'text.secondary' }} />
      </ListItemButton>
    </ListItem>
  );
}

export default SideNavOption;
