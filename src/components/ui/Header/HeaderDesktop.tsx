import { Box, Typography } from "@mui/material";
import Button from "../Buttons/Button";
import headerData from "../../../data/headerData.json";
import { useTheme } from "@mui/material/styles";
import TirusLogo from "/assets/TirusLogo.png";
import { TARGETS_BY_LABEL, fallbackToId, navigateTop, scrollToId } from "../../utils/scrollToId";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderDesktop: React.FC = () => {

  const theme = useTheme();
  const navigate = useNavigate?.();
  const location = useLocation?.();

  const LINKS = headerData.menuItems.map((label) => ({
    label,
    target: TARGETS_BY_LABEL[label] ?? fallbackToId(label),
  }));

  const ROUTES_BY_LABEL: Record<string, string> = {
    "About Us": "/about",
  };

  const handleNav = (label: string, target: string) => {
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
  };

  return (
    <>
      <Box
        component="img"
        src={TirusLogo}
        alt={headerData.logoText}
        sx={{
          height: 32,
          width: 125,
          cursor: "pointer",
        }}
        onClick={() => navigateTop(navigate, "/")}
      />

      <Box sx={{ display: "flex", gap: "48px", flexGrow: 1, justifyContent: "center" }}>
        {LINKS.map(({ label, target }) => (
          <Typography
            key={target}
            role="button"
            tabIndex={0}
            onClick={() => handleNav(label, target)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNav(label, target)}
            sx={{
              ...theme.typography.body2,
              fontFamily: "Poppins, sans-serif",
              cursor: "pointer",
              fontWeight: 400,
              "&:hover": {
                color: "#e0e0e0",
              },
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      <Button
        onClick={() => handleNav("Contact Us", "contact")}
        label={headerData.buttonLabel}
      />
    </>
  );
};

export default HeaderDesktop;