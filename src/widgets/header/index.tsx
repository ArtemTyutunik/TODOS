
import {Box, AppBar, Toolbar, IconButton, Typography, Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {CustomSearch, SearchIconWrapper, StyledInputBase, UserSettingsMenu} from "./ui";

import {useDispatch} from "react-redux";
import {toggleDrawerAction} from "../../entities/drawer/model";

export default function Header() {
    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }} position={"relative"}>
            <AppBar position="static" sx = {{boxShadow: "none"}}>
                <Container >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => dispatch(toggleDrawerAction())}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <HomeIcon />
                        </IconButton>
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
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </CustomSearch>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, position: "relative" }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <AddTaskIcon/>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <CheckCircleOutlineIcon sx ={{marginRight: "5px"}}/>
                                <Typography>0/0</Typography>
                            </IconButton>
                            <UserSettingsMenu/>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>

                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
