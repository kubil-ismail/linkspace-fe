import React, { memo } from "react";
import { connect } from "react-redux";
import Text from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <img width="350px" src="/vector/home.png" alt="vector" />
      <Text align="center" variant="h4">
        Welcome to Linkspace
      </Text>
      <Text align="center" gutterBottom>
        Get started now
      </Text>
      <Box display="flex" justifyContent="center" gap={1} mt={2}>
        <Link to="/login">
          <Button color="primary" variant="outlined" size="large">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button color="primary" variant="contained" size="large">
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

Home.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
