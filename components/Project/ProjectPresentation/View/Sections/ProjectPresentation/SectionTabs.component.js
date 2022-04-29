import { Box, SwipeableDrawer, Tab, Tabs } from '@mui/material';
import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import { styled } from '@mui/system';
import React, { useState } from 'react';

const drawerBleeding = 35;

const SectionTabs = ({
  projectPresentation,
  setActiveSectionIndex,
  activeSectionindex,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openedDrawer, setOpenedDrawer] = useState(false);

  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  const selectSection = (_, selectedSection) => {
    setActiveSectionIndex(selectedSection);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenedDrawer(open);
  };

  const tabsComponents = (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      indicatorColor="secondary"
      value={activeSectionindex}
      onChange={selectSection}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      {projectPresentation.sections.map((s, i) => (
        <Tab key={i} label={s.title} />
      ))}
    </Tabs>
  );

  return isMobile ? (
    <SwipeableDrawer
      className="SectionTabs__SectionsDrawer"
      anchor="bottom"
      open={openedDrawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <StyledBox
        className="SectionTabs__SectionsDrawer__Puller"
        sx={{
          top: -drawerBleeding,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Puller />
      </StyledBox>
      <Box className="SectionTabs__Container">{tabsComponents}</Box>
    </SwipeableDrawer>
  ) : (
    <Box className="SectionTabs__Container SectionTabs__Container--contained">
      {tabsComponents}
    </Box>
  );
};

SectionTabs.defaultProps = {};

SectionTabs.propTypes = {};

export default SectionTabs;
