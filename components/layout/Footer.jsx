import React from "react";
import { useRouter } from "next/router";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Link from "../Link";

import { routes } from "../../data/routes";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#1398d6",
    width: `100%`,
    // position: "relative",
    overflow: "hidden",
    // bottom: 0,
    // marginTop: "6em",
    padding: "1.5rem 0 ",
  },
});

const Footer = () => {
  const classes = useStyles();
  const router = useRouter();

  const path = routes;
  return (
    <Box sx={{ bgcolor: "primary.main", py: "1rem" }}>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          {path.map(({ name, link }) => (
            <Grid item key={link}>
              <Link href={link}>
                <Typography
                  color="white"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: router.pathname === link && "bold",
                    borderBottom: router.pathname === link && "3px solid teal",
                    "&:hover": { color: "green", overflox: "hidden" },
                  }}
                >
                  {name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
