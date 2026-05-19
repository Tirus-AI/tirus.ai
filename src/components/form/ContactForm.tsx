import React, { useState } from "react";
import { Box, Typography, TextField, useTheme } from "@mui/material";
import ContactButton from "../ui/Buttons/ContactButton";
import AppSnackbar from "../utils/AppSnackbar";

type Field = { label: string };

interface ContactFormCardProps {
    title: string;
    submitText: string;
    fields: Field[];
    messages: {
        validationError: string;
        success: string;
        failure: string;
    };
    onSuccess?: () => void;
}

const API_URL = "https://n8n.lmstudentportal.com/webhook/smtp";

const ContactForm: React.FC<ContactFormCardProps> = ({ title, fields, messages, submitText, onSuccess }) => {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "info" as "success" | "error" | "info" | "warning",
    });
    const closeSnack = () => setSnack(s => ({ ...s, open: false }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!name.trim() || !emailOk || !message.trim()) {
            setSnack({ open: true, message: messages.validationError, severity: "error" });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({} as any));
                throw new Error(data?.error || "Request failed");
            }

            setSnack({ open: true, message: messages.success, severity: "success" });
            setName(""); setEmail(""); setMessage("");
            onSuccess?.();
        } catch {
            setSnack({ open: true, message: messages.failure, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                px: { xs: "16px", sm: "32px", md: "32px", lg: "32px", xl: "32px", xxl: "32px" },
                py: { xs: "32px", sm: "32px", md: "64px", lg: "64px", xl: "64px", xxl: "64px" },
                border: "2px solid transparent",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "924px",
                height: "100%",
                maxHeight: "424px",
                textAlign: "center",
                overflow: "hidden",
                backgroundColor: "transparent",
                "& > .content": { position: "relative", zIndex: 1 },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    padding: "2px",
                    background:
                        "linear-gradient(to left, #6785e866 25%, #ffffff1a 80%)",
                    pointerEvents: "none",

                    WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                },
            }}
        >
            <Typography sx={{ ...theme.typography.body1, fontWeight: 400, fontFamily: "Poppins, sans-serif", color: "#FFFFFFE6", marginBottom: 4, whiteSpace: { xs: 'none', sm: 'pre-line', md: 'pre-line' }, }}>
                {title}
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: '664px', xl: '666px' } }}
            >
                <TextField
                    label={fields[0]?.label}
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: "12px",
                        input: { color: "#FFFFFFE6", height: { xs: 48, sm: 48, md: 54 }, p: 0 },
                        "& .MuiInputLabel-root": {
                            ...theme.typography.body2, color: "#FFFFFFB3", fontFamily: "Poppins, sans-serif", fontWeight: 400, lineHeight: { xs: 1.2, sm: 1.2, md: 0.8 }, "&.Mui-focused": {
                                color: "#FFFFFFB3 !important",
                            }, padding: { xs: "0px", sm: "0px", md: "5px" },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            "& fieldset": {
                                borderColor: "#171C28",
                            },
                            "&:hover fieldset": {
                                borderColor: "#282E3A",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#282E3A",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px"
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#282E3A !important"
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-input": {
                            px: { xs: "16px", sm: "16px", md: "20px" },
                            lineHeight: 0,
                        },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label={fields[1]?.label}
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: "12px",
                        input: { color: "#FFFFFFE6", height: { xs: 48, sm: 48, md: 54 }, p: 0 },
                        "& .MuiInputLabel-root": {
                            ...theme.typography.body2, color: "#FFFFFFB3", fontFamily: "Poppins, sans-serif", fontWeight: 400, lineHeight: { xs: 1.2, sm: 1.2, md: 0.8 }, "&.Mui-focused": {
                                color: "#FFFFFFB3 !important",
                            }, padding: { xs: "0px", sm: "0px", md: "5px" },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            "& fieldset": {
                                borderColor: "#171C28",
                            },
                            "&:hover fieldset": {
                                borderColor: "#282E3A",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#282E3A",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#282E3A !important",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-input": {
                            px: { xs: "16px", sm: "16px", md: "20px" },
                            lineHeight: 0,
                        },
                         "& .MuiOutlinedInput-input:-webkit-autofill": {
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "#FFFFFFE6",
                            caretColor: "#FFFFFFE6",
                            transition: "background-color 9999s ease-in-out 0s",
                        },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label={fields[2]?.label}
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: "32px",
                        input: { color: "#FFFFFFE6", height: { xs: 48, sm: 48, md: 54 }, p: 0 },
                        "& .MuiInputLabel-root": {
                            ...theme.typography.body2, color: "#FFFFFFB3", fontFamily: "Poppins, sans-serif", fontWeight: 400, lineHeight: { xs: 1.2, sm: 1.2, md: 0.8 }, "&.Mui-focused": {
                                color: "#FFFFFFB3 !important"
                            }, padding: { xs: "0px", sm: "0px", md: "5px" }
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            "& fieldset": {
                                borderColor: "#171C28",
                            },
                            "&:hover fieldset": {
                                borderColor: "#282E3A",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#282E3A",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#282E3A !important",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-input": {
                            px: { xs: "16px", sm: "16px", md: "20px" },
                            lineHeight: 0,
                        },
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <ContactButton
                    label={loading ? "Sending..." : submitText}
                    type="submit"
                    loading={loading}
                />
            </Box>
            <AppSnackbar
                open={snack.open}
                message={snack.message}
                severity={snack.severity}
                onClose={closeSnack}
                autoHideDuration={3000}
            />
        </Box>
    );
};

export default ContactForm;