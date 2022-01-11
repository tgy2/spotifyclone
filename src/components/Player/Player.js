import { useState, useEffect } from 'react';
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

const Player = ({ spotifyApi, deviceId, image, title, artist }) => {
  const [volume, setVolume] = useState(30);
  const [playing, setPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({});

  const togglePlay = async isPlaying => {
    if (!isPlaying) {
      try {
        const transferPlayback = await spotifyApi.transferMyPlayback([
          deviceId,
        ]);
        console.log({ transferPlayback });

        const tryToPlay = await spotifyApi.play();
        console.log({ tryToPlay });
        updateSongInfo();
      } catch (e) {
        console.error(e);
      }
    } else {
      const tryToPause = await spotifyApi.pause();
      console.log({ tryToPause });
    }
  };

  const updateSongInfo = async () => {
    const currentSong = await spotifyApi.getMyCurrentPlayingTrack();
    // console.log(currentSong.body)
    const item = currentSong.body.item;
    setSongInfo({
      title: item.name,
      image: item.album.images[1],
      artist: item.artists[0].name,
      duration_s: item.duration_ms / 1000,
      progress_s: currentSong.body.progress_ms / 1000,
    });
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  useEffect(() => {
    console.log(deviceId);
  }, [deviceId]);

  const sliderStyle = {
    color: '#fff',
    height: 4,
    width: { xs: 100, md: 250 },
    '& .MuiSlider-thumb': {
      width: 8,
      height: 8,
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
      '&:before': {
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
      },
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px 'rgb(0 0 0 / 16%)`,
      },
      '&.Mui-active': {
        width: 20,
        height: 20,
      },
    },
    '& .MuiSlider-rail': {
      opacity: 0.28,
    },
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
        <Grid item xs={4} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Stack direction="row" spacing={4}>
            <Avatar
              alt={songInfo.title}
              src={songInfo.image ? songInfo.image.url : ''}
              variant="square"
              sx={{
                width: 56,
                height: 56,
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                {songInfo.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {songInfo.artist}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={8} md={6}>
          <Stack spacing={0} direction="column" alignItems="center">
            <Stack spacing={2} direction="row" alignItems="center">
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                onClick={async () => {
                  console.log('Skip prev');
                  setPlaying(true);
                  await spotifyApi.skipToPrevious();
                  updateSongInfo();
                }}
              >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                onClick={() => {
                  setPlaying(v => !v);
                  togglePlay(playing);
                }}
              >
                {playing ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                onClick={async () => {
                  console.log('Skip next');
                  setPlaying(true);
                  await spotifyApi.skipToNext();
                  updateSongInfo();
                }}
              >
                <SkipNextIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {(songInfo.progress_s / 60).toFixed(0)}:
                {(songInfo.progress_s % 60).toFixed(0)}
              </Typography>
              <Slider
                sx={sliderStyle}
                size="medium"
                defaultValue={95}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={() => {
                  console.log('Move through the song');
                }}
              />
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {(songInfo.duration_s / 60).toFixed(0)}:
                {(songInfo.duration_s % 60).toFixed(0)}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          md={3}
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                aria-label="Volume"
                value={volume}
                onChange={handleVolumeChange}
              />
              <VolumeUp />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Player;
