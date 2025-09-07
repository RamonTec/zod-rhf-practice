import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Grid } from "@mui/material";
import RHFOnlyForm from "../components/RhfOnlyForm";
import ZodOnlyForm from "../components/ZodOnlyForm";
import RHFZodForm from "../components/RhfPlusZodForm";
import PostsFromAPI from "../components/PostFromApi";

const theme = createTheme({
  palette: { mode: "light" },
  shape: { borderRadius: 12 },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>zod-lab (MUI Edition)</Typography>
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}} ><RHFOnlyForm /></Grid>
          <Grid size={{xs: 12, md: 6}} ><ZodOnlyForm /></Grid>
          <Grid size={{xs: 12, md: 6}} ><RHFZodForm /></Grid>
          <Grid size={{xs: 12, md: 6}} ><PostsFromAPI /></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
