import React, { useState, useEffect, useCallback, useId } from 'react';
import { Box, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContactForm from '../../form/ContactForm';
import contactFormData from '../../../data/ContactFormData.json';

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => { destroy: () => void };
      PlayerState: {
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface DemoModalProps {
  open: boolean;
  videoSrc: string;
  onClose: () => void;
}

const getYouTubeVideoId = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.split('/').filter(Boolean)[0] ?? '';
    }

    if (parsedUrl.pathname.startsWith('/embed/')) {
      return parsedUrl.pathname.split('/').filter(Boolean)[1] ?? '';
    }

    if (parsedUrl.pathname.startsWith('/shorts/')) {
      return parsedUrl.pathname.split('/').filter(Boolean)[1] ?? '';
    }

    return parsedUrl.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
};

const DemoModal: React.FC<DemoModalProps> = ({ open, videoSrc, onClose }) => {
  const [phase, setPhase] = useState<'video' | 'form'>('video');
  const [videoIn, setVideoIn] = useState(true);
  const [formIn, setFormIn] = useState(false);
  const playerId = `youtube-player-${useId().replace(/:/g, '')}`;
  const videoId = getYouTubeVideoId(videoSrc);

  useEffect(() => {
    if (open) {
      setPhase('video');
      setVideoIn(true);
      setFormIn(false);
    }
  }, [open]);

  const handleVideoEnd = useCallback(() => {
    setVideoIn(false);
    setTimeout(() => {
      setPhase('form');
      setFormIn(true);
    }, 350);
  }, []);

  useEffect(() => {
    if (!open || !videoId || phase !== 'video') return;

    let player: { destroy: () => void } | undefined;
    let isMounted = true;

    const createPlayer = () => {
      if (!isMounted || !window.YT) return;

      player = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT?.PlayerState.ENDED) {
              handleVideoEnd();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        createPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
      player?.destroy();
    };
  }, [handleVideoEnd, open, phase, playerId, videoId]);

  return (
    <Fade in={open} timeout={300} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(10, 15, 28, 0.82)',
          backdropFilter: 'blur(3px)',
          borderRadius: "20px",
        }}
        onClick={onClose}
      >
        <Box
          sx={{
            position: 'relative',
            mx: '20px',

            // video keeps fixed width
            width: { xs: '95vw', sm: '88vw', md: '76vw', lg: '860px' },

            borderRadius: '20px',
            overflow: 'visible',

            // only show dark bg during video
            backgroundColor:
              phase === 'video'
                ? '#0a0f1c'
                : 'transparent',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              color: 'rgba(255,255,255,0.75)',

              backgroundColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(6px)',

              border: '1px solid rgba(255,255,255,0.08)',

              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.12)',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Fixed 16:9 container — both panels share the same dimensions */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: phase === 'video' ? '0' : 'auto',
            }}
          >

            {/* Video panel */}
            <Fade in={phase === 'video' && videoIn} timeout={350} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  backgroundColor: '#000',
                }}
              >
                <Box
                  id={playerId}
                  key={videoSrc}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                  }}
                />
              </Box>
            </Fade>

            {/* Contact form panel */}
            <Fade in={phase === 'form' && formIn} timeout={350} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '924px',

                    borderRadius: '20px',
                    backgroundColor: '#0a0f1c',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    overflow: 'hidden',
                  }}
                >
                  <ContactForm
                    title={contactFormData.title}
                    fields={contactFormData.fields}
                    messages={contactFormData.messages}
                    submitText={contactFormData.submitButton.text}
                    onSuccess={onClose}
                  />
                </Box>
              </Box>
            </Fade>

          </Box>
        </Box>
      </Box>
    </Fade>

  );
};

export default DemoModal;