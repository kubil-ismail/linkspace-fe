import React from "react";
import {
  Box,
  Card,
  Grid,
  CardContent,
  List,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import http from "utils/http";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [spaceList, setSpaceList] = React.useState([]);

  React.useEffect(() => {
    http.get("/space").then((result) => {
      setSpaceList(result?.data?.data ?? []);
    });
  }, []);

  return (
    <>
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{
            background: "rgb(5,97,172)",
            background:
              "radial-gradient(circle, rgba(5,97,172,1) 29%, rgba(0,118,214,1) 70%)",
          }}
        >
          <Grid item md={3}>
            <Card>
              <CardContent>
                <Typography
                  align="center"
                  variant="h3"
                  color="primary"
                  sx={{ mb: 4, mt: 3 }}
                >
                  List Space
                </Typography>

                <List
                  component="nav"
                  sx={{ maxHeight: "50vh", overflowY: "auto" }}
                >
                  {spaceList?.map((item) => (
                    <ListItemButton
                      onClick={() => {
                        navigate(`/manage/${item?.slug}`);
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            {item?.title}
                          </Typography>
                        }
                        secondary={
                          <Typography component="span" noWrap>
                            {item?.slug ?? "-"}
                          </Typography>
                        }
                      />

                      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                        <ArrowForwardIosIcon fontSize="small" />
                      </ListItemIcon>
                    </ListItemButton>
                  ))}

                  <Link to={`/manage`}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ mt: 2 }}
                    >
                      Add New
                    </Button>
                  </Link>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    color="error"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      localStorage.clear();

                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
