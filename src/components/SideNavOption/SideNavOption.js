import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function SideNavOption({ name, id }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={`/playlist/${id}`}
        isActive={match => {
          setIsActive(!!match);
        }}
      >
        <ListItemText
          primary={name}
          sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SideNavOption;
