import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import rawTerms from "../../data/terms.json";
import { useDocumentTitle } from "../../hooks";

function parseCustomBold(text: string) {
  return text
    .replace(/<b(\d+)>(.*?)<\/b\1>/g, (_, weight, content) => {
      return `<span style="font-weight:${weight}">${content}</span>`;
    });
}
const cleanBullet = (s: string) => s.replace(/^\s*[•\-–—]\s*/, "");

const TOKENS = {
  pageBg: "transparent",
  panelBg: "transparent",
  title: "#FFFFFFE6",
  text: "#FFFFFFE6",
  dim: "#FFFFFFE6",
  accent: "#FFFFFFE6"
};

const terms = rawTerms as any;

export default function TermsPage() {
  useDocumentTitle("Terms of Service");
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: TOKENS.pageBg,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            bgcolor: TOKENS.panelBg,
            px: { xs: 3, md: 5 },
            pt: { xs: 7, md: 7 },
          }}
        >
          <Typography
            align="center"
            sx={{ ...theme.typography.h5, color: TOKENS.title, fontWeight: 600, fontFamily: "Poppins, sans-serif", lineHeight: "100%", letterSpacing: 0.2, mb: 1 }}
          >
            {terms.title}
          </Typography>

          <Typography align="center" sx={{ ...theme.typography.body1, color: TOKENS.dim, lineHeight: "30px", fontWeight: 400, fontFamily: "Poppins, sans-serif", letterSpacing: 0.4, mb: 1 }}>
            {terms.effectiveDate}
          </Typography>

          {terms.subtitle && (
            <Typography align="center" sx={{ ...theme.typography.body1, color: TOKENS.dim, lineHeight: "25px", fontWeight: 400, fontFamily: "Poppins, sans-serif", mb: {xs: 5, md: 7} }}>
              {terms.subtitle}
            </Typography>
          )}

          <Box component="section" sx={{ color: TOKENS.text, gap: 3 }}>
            {terms.sections.map((sec: any) => {
              const groups = sec.groups ?? [];
              return (
                <Box
                  key={sec.number}
                  sx={{ mb: 3 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1, p: 0 }}>
                    <Chip
                      label={`${sec.number})`}
                      size="small"
                      sx={{
                        ...theme.typography.body1,
                        bgcolor: "transparent",
                        color: TOKENS.accent,
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                        height: 24,
                        "& .MuiChip-label": {
                          pl: 0,
                        },
                      }}
                    />
                    <Typography sx={{ ...theme.typography.body1, fontFamily: "Poppins, sans-serif", color: TOKENS.title, fontWeight: 600 }}>
                      {sec.title}
                    </Typography>
                  </Box>
                  {sec.paragraphs?.map((p: string, idx: number) => (
                    <Typography
                      key={idx}
                      sx={{
                        ...theme.typography.body1,
                        fontFamily: "Poppins, sans-serif",
                        color: TOKENS.text,
                        lineHeight: {xs: "25px", md: "30px"},
                        fontWeight: 300,
                      }}
                      dangerouslySetInnerHTML={{ __html: parseCustomBold(p) }}
                    />
                  ))}

                  {groups.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {groups.map((g: any, gi: number) => (
                        <Box key={`${sec.number}-${g.title}-${gi}`} sx={{ mb: 3 }}>
                          <Typography sx={{ ...theme.typography.body1, fontFamily: "Poppins, sans-serif", lineHeight: {xs: "25px", md: "30px"}, color: TOKENS.title, fontWeight: 600, mb: 0.8 }}>
                            {g.title}
                          </Typography>

                          {g.paragraphs?.map((gp: string, gpi: number) => (
                            <Typography key={gpi} sx={{ ...theme.typography.body1, fontWeight: 300, p: 0, lineHeight: {xs: "25px", md: "30px"}, fontFamily: "Poppins, sans-serif", color: TOKENS.text, mb: 1 }}>
                              {gp}
                            </Typography>
                          ))}
                          {g.bullets.map((b: string, i: number) => (
                            <ListItem key={i} sx={{ ...theme.typography.body1, p: 0, fontWeight: 300, lineHeight: {xs: "25px", md: "30px"}, fontFamily: "Poppins, sans-serif", display: "list-item", pl: 1.25 }}>
                              <ListItemText primary={cleanBullet(b)} />
                            </ListItem>
                          ))}
                        </Box>
                      ))}
                    </Box>
                  )}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <List disablePadding sx={{
                      listStyleType: 'disc',
                      listStylePosition: 'outside',
                      pl: 4,
                      m: 0,
                      '& .MuiListItem-root': {
                        display: 'list-item',
                        listStyleType: 'inherit',
                        listStylePosition: 'outside',
                        p: 0,
                        m: 0,
                        lineHeight: {xs: "25px", md: "30px"},
                      },
                    }}>
                      {sec.bullets.map((b: string, i: number) => (
                        <ListItem key={i} sx={{ ...theme.typography.body1, display: "list-item", pl: 1.25 }}>
                          <ListItemText primary={<span style={{ lineHeight: "25px", fontWeight: 300, fontFamily: "Poppins, sans-serif" }} dangerouslySetInnerHTML={{ __html: parseCustomBold(cleanBullet(b)) }} />} />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  {sec.labeledParagraphs?.map((lp: any, idx: number) => (
                    <Typography key={`lp-${idx}`} sx={{ color: TOKENS.text, mt: 1 }}>
                      <Box component="span" sx={{ ...theme.typography.body1, lineHeight: {xs: "25px", md: "30px"}, fontFamily: "Poppins, sans-serif", fontWeight: 600, color: TOKENS.title }}>
                        {lp.label}
                      </Box>
                      {lp.text}
                    </Typography>
                  ))}

                  {sec.postParagraphs?.map((p: string, idx: number) => (
                    <Typography key={`post-${idx}`} sx={{ ...theme.typography.body1, lineHeight: {xs: "25px", md: "30px"}, fontWeight: 300, fontFamily: "Poppins, sans-serif", color: TOKENS.text, mt: 1 }}>
                      {p}
                    </Typography>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}