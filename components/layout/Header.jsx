import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {
  Box,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  SwipeableDrawer,
} from "@material-ui/core";
import { routes } from "../../data/routes";
import { useRouter } from "next/router";
// import Image from 'next/image';
import Link from "../Link";
import MenuIcon from "@material-ui/icons/Menu";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const router = useRouter();

  const path = routes;

  const tabs = (
    <>
      <Grid item>
        <Grid
          container
        //   justifyContent="flex-start"
        //   alignItems="center"
          spacing={6}
        >
          {path.map(({ name, link }) => (
            <Grid item key={link}>
              <Link href={link}>
                <Typography
                  // className={classes.link}
                  sx={{ fontSize: "1rem", color: "#fff" }}
                  style={{
                    fontWeight: router.pathname === link && "bold",
                    //   borderBottom: router.pathname === link && "",
                    borderBottom:
                      router.pathname === link && "5px solid #757ce8",
                  }}
                >
                  {name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        // classes={{ paper: classes.drawer }}
        anchor="right"
      >
        <div className={{}} />
        <List disablePadding>
          {path.map(({ name, link }) => (
            <ListItem
              key={link}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ListItemText disableTypography>
                <Link href={link}>
                  <Typography
                    style={{
                      color:
                        router.pathname === link
                          ? "primary"
                          : "rgb(107 107 107)",
                      fontWeight: router.pathname === link && "bold",
                    }}
                  >
                    {name}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <Button
        variant="contained"
        endIcon={<MenuIcon />}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        // className={classes.drawerIconContainer}
      >
        Menu
      </Button>
    </>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar variant="dense">
            <Container>
              <Grid container>
                <Grid
                  item
                  sx={{ display: "flex", alignItems: "center" }}
                  lg={3}
                >
                  <Link href="/">
                  {/* <Image src="images/header-logo-blue.png" alt="logo" width={300} height={150} /> */}
                  </Link>
                </Grid>
                <Grid item xs></Grid>

                {matches ? drawer : tabs}
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
