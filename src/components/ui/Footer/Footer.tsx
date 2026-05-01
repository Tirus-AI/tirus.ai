import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import footerData from '../../../data/footerData.json';
import headerData from "../../../data/headerData.json";
import TirusLogo from "/assets/TirusLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { TARGETS_BY_LABEL, fallbackToId, navigateTop, scrollToId } from "../../utils/scrollToId";

const ROUTES_BY_LABEL: Record<string, string> = {
    "About Us": "/about",
    "Terms": "/terms",
    "Privacy": "/privacy"
};

const Footer: React.FC = () => {
    const { navLinks, socialLinks, copyright } = footerData;
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNav = (label: string, href?: string) => {
        const route = ROUTES_BY_LABEL[label];
        if (route) {
            navigateTop(navigate, route);
            return;
        }

        const target =
            TARGETS_BY_LABEL[label] ??
            (href && href.startsWith("#") ? href.slice(1) : undefined) ??
            fallbackToId(label);

        if (!target) return;

        if (location.pathname !== "/") {
            navigateTop(navigate, `/#${target}`);
        } else {
            scrollToId(target, undefined, "replace");
        }
    };

    return (
        <Box
            sx={{
                width: 'full',
                color: '#fff',
                px: { xs: 1.8, sm: 4, md: 6, lg: '120px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: { xs: 2, sm: 2, md: 7, lg: 0 }
            }}
        >
            <Container maxWidth="xl" sx={{ py: '5px', px:{ xs: 0, sm: 0, md: 0, lg: 0 }, mt: '40px' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'center', md: 'center' }}
                    spacing={{ xs: 4, md: 0 }}
                    mb={{ xs: "50px", sm: "65px", md: "85px" }}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={{ xs: 2, md: 6 }}
                        alignItems="center"
                    >
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
                    </Stack>

                    <Stack
                        direction={'row'}
                        spacing={{ sm: 3, xs: 3, md: 4, lg: 5, xl: 6 }}
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                    >
                        {navLinks.map((link) => {
                            const target =
                                TARGETS_BY_LABEL[link.title] ??
                                (link.href?.startsWith("#") ? link.href.slice(1) : undefined) ??
                                fallbackToId(link.title);

                            const computedHref =
                                ROUTES_BY_LABEL[link.title] ?? (target ? `/#${target}` : link.href ?? "#");

                            return (
                                <Typography
                                    key={link.title}
                                    component="a"
                                    href={computedHref}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNav(link.title, link.href);
                                    }}
                                    sx={{
                                        ...theme.typography.body2,
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 400,
                                        color: 'white',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                >
                                    {link.title}
                                </Typography>
                            );
                        })}
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {socialLinks.map((social) => (
                            <Box
                                key={social.label}
                                component="a"
                                href={social.href}
                                target="_blank"
                                aria-label={social.label}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box component="img" src={social.icon} alt={social.label} sx={{ width: 24, height: 24 }} />
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Container>
            <Box
                sx={{
                    width: '100%',
                    mb: '36px',
                    display: 'flex',
                    justifyContent: 'center',
                    py: '3px',
                }}
            >
                <Typography
                    sx={{
                        ...theme.typography.mobileMenu,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        textAlign: 'center',
                    }}
                >
                    {copyright}
                </Typography>
            </Box>
        </Box >
    );
};

export default Footer;