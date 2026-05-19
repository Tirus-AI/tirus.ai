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
    if (el) el.play().catch(() => {});
  }, []);

  if (!open) return null;

  return (
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
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '95vw', sm: '88vw', md: '76vw', lg: '860px' },
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#0a0f1c',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
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
            color: 'rgba(255,255,255,0.7)',
            backgroundColor: 'rgba(0,0,0,0.45)',
            '&:hover': { color: '#fff', backgroundColor: 'rgba(0,0,0,0.65)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Fixed 16:9 container — both panels share the same dimensions */}
        <Box sx={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>

          {/* Video panel */}
          <Fade in={phase === 'video' && videoIn} timeout={350} mountOnEnter unmountOnExit>
            <Box sx={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}>
              <video
                ref={videoCallbackRef}
                key={videoSrc}
                src={videoSrc}
                autoPlay
                controls
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                onEnded={handleVideoEnd}
              />
            </Box>
          </Fade>

          {/* Contact form panel */}
          <Fade in={phase === 'form' && formIn} timeout={350} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                overflowY: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, sm: 3, md: 4 },
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
          </Fade>

        </Box>
      </Box>
    </Box>
  );
};

export default DemoModal;
