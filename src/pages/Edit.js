import React from "react";
import {
  Box,
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import http from "utils/http";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [background, setBackground] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [link, setLink] = React.useState([
    {
      link: "",
      title: "",
    },
  ]);
  const [socmed, setSocmed] = React.useState({
    github: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const id = location.pathname.split("/")[2];

    http
      .put(`/space/${id}`, {
        title,
        desc,
        background,
        link: JSON.stringify(link),
        social_media: JSON.stringify(socmed),
      })
      .then(() => {
        Swal.fire({
          title: "Edit space success",
          icon: "success",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate('/login');
    }

    if (!localStorage.getItem("profile")) {
      navigate("/login");
    }
  }, []);

  React.useEffect(() => {
    const id = location.pathname.split("/")[2];
    http.get(`/space/${id}`).then((result) => {
      if (!result.data.data) {
        Swal.fire({
          title: "Data not found",
          icon: "error",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        }).then(() => {
          navigate("/profile");
        });

        return;
      }

      const response = result.data.data;

      setTitle(response.title);
      setDesc(response.desc);
      setBackground(response.background);
      setPicture(response.photo_profile);

      setSocmed(JSON.parse(response.social_media));
      setLink(JSON.parse(response.link));
    });
  }, []);

  return (
    <>
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{
            background: "rgb(5,97,172)",
            background:
              "radial-gradient(circle, rgba(5,97,172,1) 29%, rgba(0,118,214,1) 70%)",
          }}
        >
          <Grid item md={3.5}>
            <Card>
              <CardContent>
                <Typography
                  align="center"
                  variant="h3"
                  color="primary"
                  sx={{ mb: 4, mt: 3 }}
                >
                  Add Space
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    rows={3}
                    multiline
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />

                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Layout</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: "1px solid #C4C4C4" }}>
                      <Typography
                        color="#ADADAD"
                        fontWeight={200}
                        fontSize={12}
                        sx={{ mt: 1, mb: 0 }}
                      >
                        Profile Picture
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        type="file"
                        inputProps={{
                          accept: "image/*",
                        }}
                        onChange={(e) => setPicture(e.target.files[0])}
                      />

                      <TextField
                        label="Background Color"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        type="color"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                      />
                    </AccordionDetails>
                  </Accordion>

                  {/* Social Media collapse */}
                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Social Media</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: "1px solid #C4C4C4" }}>
                      <TextField
                        label="Youtube"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={socmed.youtube}
                        onChange={(e) => {
                          setSocmed({
                            github: socmed.github,
                            youtube: e.target.value,
                            linkedin: socmed.linkedin,
                            instagram: socmed.instagram,
                          });
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <YouTubeIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Instagram"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={socmed.instagram}
                        onChange={(e) => {
                          setSocmed({
                            github: socmed.github,
                            youtube: socmed.youtube,
                            linkedin: socmed.linkedin,
                            instagram: e.target.value,
                          });
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InstagramIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Linked In"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={socmed.linkedin}
                        onChange={(e) => {
                          setSocmed({
                            github: socmed.github,
                            youtube: socmed.youtube,
                            linkedin: e.target.value,
                            instagram: socmed.instagram,
                          });
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LinkedInIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Github"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={socmed.github}
                        onChange={(e) => {
                          setSocmed({
                            github: e.target.value,
                            youtube: socmed.youtube,
                            linkedin: socmed.linkedin,
                            instagram: socmed.instagram,
                          });
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GitHubIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>

                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Custom Link</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: "1px solid #C4C4C4" }}>
                      {link?.map((item, key) => (
                        <Grid
                          container
                          justifyContent="space-between"
                          key={`item-${key}`}
                        >
                          <Grid item md={5.8}>
                            <TextField
                              label="Title"
                              variant="outlined"
                              fullWidth
                              margin="dense"
                              value={item?.title}
                              onChange={(e) => {
                                setLink(
                                  link.map((res, _key) =>
                                    _key === key
                                      ? {
                                          title: e.target.value,
                                          link: res.link,
                                        }
                                      : res
                                  )
                                );
                              }}
                            />
                          </Grid>
                          <Grid item md={5.8}>
                            <TextField
                              label="Link"
                              variant="outlined"
                              fullWidth
                              margin="dense"
                              value={item?.link}
                              onChange={(e) => {
                                setLink(
                                  link.map((res, _key) =>
                                    _key === key
                                      ? {
                                          title: res.title,
                                          link: e.target.value,
                                        }
                                      : res
                                  )
                                );
                              }}
                            />
                          </Grid>
                        </Grid>
                      ))}

                      <Button
                        onClick={() => {
                          setLink([
                            ...link,
                            ...[
                              {
                                link: "",
                                title: "",
                              },
                            ],
                          ]);
                        }}
                      >
                        Add New Link
                      </Button>
                    </AccordionDetails>
                  </Accordion>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Save"}
                  </Button>
                </form>

                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 1 }}
                  onClick={() => navigate("/profile")}
                >
                  Back
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Edit;
