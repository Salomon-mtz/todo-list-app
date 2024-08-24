import { useState } from "react"; // Importing the useState hook from React
import { useRouter } from "next/router"; // Importing useRouter from Next.js for client-side navigation
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material"; // Importing Material-UI components
import Image from "next/image"; // Importing Image component from Next.js for optimized image loading
import registerImage from "../assets/register.png"; // Importing an image for the registration page

export default function Register() {
  const [email, setEmail] = useState(""); // State to store the user's email
  const [password, setPassword] = useState(""); // State to store the user's password
  const router = useRouter(); // Router instance for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const res = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
      },
      body: JSON.stringify({ email, password }), // Send email and password in the request body
    });
    if (res.ok) {
      router.push("/login"); // Redirect to the login page on successful registration
    } else {
      console.error("Error registering"); // Log an error message if registration fails
    }
  };

  // Function to navigate to the login page
  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
          width: "100%",
          maxWidth: 1000,
          p: { xs: 2, md: 8 },
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
                minHeight: 300,
                maxHeight: 500,
                mb: { xs: 2, md: 0 },
              }}
            >
              <Image
                src={registerImage}
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
                padding: { xs: 2, md: 4 },
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                mb={3}
                sx={{ fontSize: { xs: "24px", md: "32px" } }}
              >
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
                  sx={{ fontSize: { xs: "14px", md: "16px" } }}
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
                  sx={{ fontSize: { xs: "14px", md: "16px" } }}
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
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  Register
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleNavigateToLogin}
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    fontSize: { xs: "14px", md: "16px" },
                    color: "#F50057",
                    borderColor: "#F50057",
                    "&:hover": { backgroundColor: "#FFEBEE" },
                  }}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
