import {memo} from 'react';
import {Link} from 'react-router-dom';
import {Box, AppBar, Toolbar, IconButton, Container, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {UserSettingsMenu} from './ui';

import BasicModal from '@shared/components/modal';
import {CreateTodoForm} from '@features/todoFeatures/CreateTodo';
import {AddIcon} from '@shared/components/icons';
import {useVisable} from '@shared/hooks';
import useToggleDrawer from '../drawer/hooks/useToggleDrawer';
import ProgressComponent from './ui/ProgresComponent';
import AppLogo from '@shared/components/AppLogo';


export default memo(function Header() {
  const [, toggleDrawer] = useToggleDrawer();
  const [isAddTaskModalOpen, openAddTaskModalOpen, closeAddTaskModal] = useVisable(false);

  return (
    <Box sx={{flexGrow: 1}} position={'relative'}>
      <AppBar position="static" sx = {{boxShadow: 'none'}}>
        <Container sx={{margin: {laptop: '0 auto'},
          width: {laptop: '100%'},
          padding: {mobile: '0px', laptop: '0 16px'}}}>
          <Toolbar>
            <Tooltip title={'menu'}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{padding: {mobile: '0 10px', tablet: '8px'}}}
                onClick={toggleDrawer}
              >
                <MenuIcon sx={{marginTop: '-3px'}}/>
              </IconButton>
            </Tooltip>

            <Tooltip title={'home'}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{padding: '0 10px'}}
              >
                <Link to={'/'}>
                  <HomeIcon />
                </Link>
              </IconButton>
            </Tooltip>

            <AppLogo sx={{
              display: {mobile: 'none', largeMobile: 'block'},
              transform: 'translateY(-2px)',
            }}/>

            <Box sx={{flexGrow: 1}} />

            <Box sx={{display: {mobile: 'none', largeMobile: 'flex'}, position: 'relative'}}>
              <Tooltip title={'add todo'}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={openAddTaskModalOpen}>
                  <AddIcon color={'inherit'}/>
                </IconButton>
              </Tooltip>

              {/* modal window to add a new task*/}
              <BasicModal open={isAddTaskModalOpen}
                onClose={closeAddTaskModal}>
                <Box minWidth={{mobile: '350px', largeMobile: '400px', tablet: '600px'}}>
                  <CreateTodoForm onClose={closeAddTaskModal}/>
                </Box>
              </BasicModal>
              <ProgressComponent/>
            </Box>
            <UserSettingsMenu/>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
})
