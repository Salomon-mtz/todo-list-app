import { useState } from "react"; // Importing useState hook from React
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
import loginImage from "../assets/login.png"; // Importing an image for the login page

export default function Login() {
  // Component to handle user login
  const [email, setEmail] = useState(""); // State for storing the user's email
  const [password, setPassword] = useState(""); // State for storing the user's password
  const router = useRouter(); // Router instance to handle navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const res = await fetch("http://localhost:5001/api/auth/login", {
      // Make an API request to the login endpoint
      method: "POST", // HTTP method POST
      headers: {
        "Content-Type": "application/json", // Set the request headers to send JSON data
      },
      body: JSON.stringify({ email, password }), // Send the email and password as JSON in the request body
    });
    if (res.ok) {
      // If the login is successful
      const data = await res.json(); // Parse the response JSON
      localStorage.setItem("token", data.token); // Store the JWT token in local storage
      router.push("/"); // Redirect the user to the home page
    } else {
      console.error("Error logging in"); // Log an error message if the login fails
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
                src={loginImage}
                alt="Login"
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
                Login
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
                  autoComplete="current-password"
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
