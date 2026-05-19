import React, { useState, useEffect, useCallback } from 'react';
import { Box, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContactForm from '../../form/ContactForm';
import contactFormData from '../../../data/ContactFormData.json';

interface DemoModalProps {
  open: boolean;
  videoSrc: string;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ open, videoSrc, onClose }) => {
  const [phase, setPhase] = useState<'video' | 'form'>('video');
  const [videoIn, setVideoIn] = useState(true);
  const [formIn, setFormIn] = useState(false);

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

  // Callback ref: called the moment the <video> element mounts into the DOM.
  // This is the most reliable autoplay trigger after a user gesture.
  const videoCallbackRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) el.play().catch(() => { });
  }, []);

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
                <video
                  ref={videoCallbackRef}
                  key={videoSrc}
                  src={videoSrc}
                  autoPlay
                  controls
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                  onEnded={handleVideoEnd}
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
