
import {Box, AppBar, Toolbar, IconButton, Typography, Container, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {CustomSearch, SearchIconWrapper, StyledInputBase, UserSettingsMenu} from "./ui";

import {useDispatch} from "react-redux";
import {toggleDrawerOpen} from "../../entities/drawer/model";

export default function Header() {
    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }} position={"relative"}>
            <AppBar position="static" sx = {{boxShadow: "none"}}>
                <Container >
                    <Toolbar>
                        <Tooltip title={"open drawer"}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                onClick={() => dispatch(toggleDrawerOpen())}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={"home"}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                            >
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            TODOS
                        </Typography>

                        <CustomSearch>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search???"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </CustomSearch>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, position: "relative" }}>
                            <Tooltip title={"add todo"}>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <AddTaskIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Your progress'}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                >
                                    <CheckCircleOutlineIcon sx ={{marginRight: "5px"}}/>
                                    <Typography>0/0</Typography>
                                </IconButton>
                            </Tooltip>
                            <UserSettingsMenu/>

                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <Tooltip title={'more'}>
                                    <IconButton
                                        size="large"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
