import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import http from "utils/http";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const styleButton = {
  background: "#fff",
  color: "black",
  fontWeight: "bold",
  fontSize: "17px",
  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.2)",
  display: "flex",
  gap: 1,
  mb: 2,
  "&:hover": {
    background: "#ffffff8f",
  },
};

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [background, setBackground] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [id, setId] = React.useState(null);
  const [createdBy, setCreatedBy] = React.useState(null);
  const [isCreator, setIsCreator] = React.useState(false);
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

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  React.useEffect(() => {
    const id = location.pathname.split("/")[2];
    const profile = localStorage.getItem("profile");

    setId(id);

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
      setCreatedBy(response.createdBy);

      setSocmed(isJsonString(response.social_media) ? JSON.parse(response.social_media) : {});
      setLink(isJsonString(response.social_media) ? JSON.parse(response.link) : []);

      if (profile && isJsonString(profile)) {
        if (JSON.parse(profile).id === response.createdBy) {
          setIsCreator(true);
        }
      }
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
            background: background,
          }}
        >
          <Grid item md={3}>
            <Box display="flex" justifyContent="center" mb={2}>
              <Box
                component="img"
                src={picture}
                alt="Profile"
                sx={{
                  width: "170px",
                  height: "170px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box mb={3}>
              <Typography variant="h3" component="h1" align="center">
                {title}
              </Typography>
              <Typography variant="body2" align="center">
                {desc}
              </Typography>
            </Box>

            {/* Instagram */}
            {socmed.instagram ? (
              <Button
                variant="contained"
                size="large"
                sx={styleButton}
                onClick={() => window.open(socmed.instagram, "_blank")}
                fullWidth
              >
                <InstagramIcon fontSize="small" />
                Instagram
              </Button>
            ) : null}

            {/* Linked In */}
            {socmed.linkedin ? (
              <Button
                variant="contained"
                size="large"
                sx={styleButton}
                onClick={() => window.open(socmed.linkedin, "_blank")}
                fullWidth
              >
                <LinkedInIcon fontSize="small" />
                Linkedin
              </Button>
            ) : null}

            {/* Github */}
            {socmed.github ? (
              <Button
                variant="contained"
                size="large"
                sx={styleButton}
                onClick={() => window.open(socmed.github, "_blank")}
                fullWidth
              >
                <GitHubIcon fontSize="small" />
                Github
              </Button>
            ) : null}

            {/* Youtube */}
            {socmed.youtube ? (
              <Button
                variant="contained"
                size="large"
                sx={styleButton}
                onClick={() => window.open(socmed.youtube, "_blank")}
                fullWidth
              >
                <YouTubeIcon fontSize="small" />
                Youtube
              </Button>
            ) : null}

            {/* Custome */}
            {link?.map((item, key) => (
              <Button
                variant="contained"
                size="large"
                sx={styleButton}
                onClick={() => window.open(item.link, "_blank")}
                fullWidth
              >
                <LanguageIcon fontSize="small" />
                <Typography variant="h5" noWrap>
                  {item?.title}
                </Typography>
              </Button>
            ))}

            {isCreator ? (
              <>
                <hr />

                {/* Edit */}
                <Button
                  variant="contained"
                  size="large"
                  sx={styleButton}
                  onClick={() => {
                    navigate(`/manage/${id}`);
                  }}
                  fullWidth
                >
                  Edit Space
                </Button>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Edit;
