import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import registerImage from "../assets/register.png"; // Replace with your image path

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      console.error("Error registering");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 1000,
          p: 8,
          borderRadius: 20,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: 400, // Ensure the image has a minimum height
              }}
            >
              <Image
                src={registerImage} // Image related to a registration or account creation
                alt="Register"
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: 4, // Increase padding for a larger card feel
              }}
            >
              <Typography component="h1" variant="h4" mb={3}>
                Register
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    mb: 2,
                    textTransform: "none",
                    borderRadius: 10,
                    backgroundColor: "#F50057",
                    "&:hover": { backgroundColor: "#C51162" },
                  }}
                >
                  Register
                </Button>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
