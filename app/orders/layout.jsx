import { Container } from "@mui/material";

export const metadata = {
  title: "Orders page",
};

export default function Layout({ children }) {
  return (
    <Container
      sx={{
        paddingY: "2rem",
      }}
    >
      {children}
    </Container>
  );
}
