import React from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Buttons/Button";
import headerData from "../../../data/headerData.json";
import { useTheme } from "@mui/material/styles";
import TirusLogo from "/assets/TirusLogo.png";
import SidebarGradient from "/assets/SidebarGradient1.svg";
import { navigateTop, scrollToId } from "../../utils/scrollToId";
import { TARGETS_BY_LABEL, fallbackToId } from "../../utils/scrollToId";
import { useLocation, useNavigate } from "react-router-dom";

const ROUTES_BY_LABEL: Record<string, string> = {
  "About Us": "/about",
};

const HeaderMobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleNav = (label: string) => {
    const target = TARGETS_BY_LABEL[label] ?? fallbackToId(label);

    setMenuOpen(false);

    setTimeout(() => {
      const route = ROUTES_BY_LABEL[label];
      if (route) {
        navigateTop(navigate, route);
        return;
      }

      if (location.pathname !== "/") {
        navigateTop(navigate, `/#${target}`);
      } else {
        scrollToId(target, undefined, "replace");
      }
    }, 250);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <IconButton
          sx={{ py: 0, px: 0, ml: 0, mr: 0, width: "25px" }}
          onClick={() => setMenuOpen(true)}
          edge="start"
        >
          <MenuIcon sx={{ fontSize: "32px", color: "white" }} />
        </IconButton>
        <Box
          component="img"
          src={TirusLogo}
          alt={headerData.logoText}
          sx={{
            height: 32,
            width: 125,
            cursor: "pointer",
            ml: "10px",
          }}
          onClick={() => navigateTop(navigate, "/")}
        />
      </Box>

      <Box sx={{ flex: "1 0 auto", display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => {
          if (location.pathname !== "/") navigateTop(navigate, "/#contact");
          else scrollToId("contact");
        }} label={headerData.buttonLabel} />
      </Box>

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 265,
            py: 2,
            backgroundColor: "#0A0F1C",
          },
        }}
      >
        <Box
          component="img"
          src={SidebarGradient}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            top: { xs: '40%', sm: '35%', },
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "100%",
            height: "auto",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex: 0,
            filter: "blur(58px)"
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1.25, py: 2 }}>
          <Box
            component="img"
            src={TirusLogo}
            alt={headerData.logoText}
            sx={{
              height: 32,
              width: 125,
              cursor: "pointer",
            }}
            onClick={() => {
              setMenuOpen(false);
              setTimeout(() => navigateTop(navigate, "/"), 250);
            }}
          />
          <IconButton sx={{ color: "white", p: 0 }} onClick={() => setMenuOpen(false)}>
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 1, px: 1.5 }} role="presentation">
          <List sx={{ gap: 2, p: 0, display: "flex", flexDirection: "column" }}>
            {headerData.menuItems.map((item: string) => (
              <ListItem
                onClick={() => handleNav(item)}
                key={item}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(2px)",
                  cursor: "pointer",
                  px: "12px",
                  py: "7px",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    sx: {
                      ...theme.typography.mobileMenu,
                      color: "white",
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                  primary={item}
                />
                <Box sx={{ pr: "8px" }}>
                  <IconButton
                    onClick={() => handleNav(item)}
                    edge="end"
                    sx={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "50%",
                      color: "white",
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      "&:hover": {
                        background: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderMobile;