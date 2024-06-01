import React from 'react';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import InfoIcon from '@material-ui/icons/Info';
import './HospitalAdvertisement.scss';

const useStyles = makeStyles((theme) => ({
  advertisementContainer: {
    position: 'absolute',
    top: '40%',  // Center vertically
    left: '10%',  // Align to the left
    transform: 'translateY(-50%)',  // Adjust for vertical centering
    color: '#fff',
    zIndex: 2,
    animation: '$bounce 2s infinite',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    textAlign: 'left',
    maxWidth: '500px', // Limit the width of the advertisement
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-30px)',
    },
    '60%': {
      transform: 'translateY(-15px)',
    },
  },
  advertisementTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  advertisementText: {
    fontSize: '16px',
    marginBottom: theme.spacing(2),
  },
  callToAction: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  actionButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
  },
  iconButton: {
    color: '#fff',
  },
}));

const HospitalAdvertisement = () => {
  const classes = useStyles();

  return (
    <Box className={classes.advertisementContainer}>
      <Typography variant="h4" className={classes.advertisementTitle}>
        BỆNH VIỆN GIA ĐÌNH THANH TÚ
      </Typography>
      <Typography variant="body1" className={classes.advertisementText}>
        Chăm sóc sức khỏe tận tâm, dịch vụ hoàn hảo. Hãy đến với chúng tôi để trải nghiệm những dịch vụ y tế tốt nhất.
      </Typography>
      <div className={classes.iconContainer}>
        <IconButton className={classes.iconButton} aria-label="call">
          <PhoneIcon fontSize="large" />
        </IconButton>
        <IconButton className={classes.iconButton} aria-label="hospital">
          <LocalHospitalIcon fontSize="large" />
        </IconButton>
        <IconButton className={classes.iconButton} aria-label="info">
          <InfoIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={classes.callToAction}>
        <Button className={classes.actionButton} variant="contained" href="#learn-more">
          Tìm hiểu thêm
        </Button>
      </div>
    </Box>
  );
};

export default HospitalAdvertisement;
