import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Stack,
  Slider,
  IconButton,
} from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const Player = ({ image, title, artist }) => {
  const [volume, setVolume] = useState(30);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  return (
    <Box
      p={1}
      sx={{
        bgcolor: 'background.paper',
        height: 90,
        width: '100%',
        position: 'fixed',
        bottom: { xs: 56, md: 0 },
        left: 0,
        right: 0,
        boxSizing: 'border-box',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Stack direction="row" spacing={4}>
            <Avatar
              alt={title}
              src={image}
              variant="square"
              sx={{
                width: 56,
                height: 56,
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                {title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {artist}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              marginLeft: { xs: '120px', md: '4%' },
              marginTop: { xs: '13px', md: '0%' },
            }}
          >
            <IconButton
              size="small"
              sx={{ color: 'white' }}
              onClick={() => {
                console.log('Skip prev');
              }}
            >
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'white' }}
              onClick={() => {
                console.log('Paus');
              }}
            >
              <PlayArrowIcon fontSize="large" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'white' }}
              onClick={() => {
                console.log('Skip next');
              }}
            >
              <SkipNextIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', md: 'block' },
              }}
            >
              2:51
            </Typography>
            <Slider
              defaultValue={95}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={() => {
                console.log('Move through the song');
              }}
              sx={{
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', md: 'block' },
              }}
            >
              3:00
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
        >
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown
                sx={{
                  display: { xs: 'none', md: 'inline' },
                }}
              />
              <Slider
                aria-label="Volume"
                value={volume}
                onChange={handleVolumeChange}
                sx={{
                  display: { xs: 'none', md: 'inline' },
                }}
              />
              <VolumeUp
                sx={{
                  display: { xs: 'none', md: 'inline' },
                }}
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Player;
