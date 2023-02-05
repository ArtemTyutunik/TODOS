import React, {useState} from 'react';
import DropdownMenu from "../../../../shared/components/dropdownMenu";
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material";
import Calendar from "./Calendar";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TodayIcon from '@mui/icons-material/Today';

const buttonsStyles = {
    color: '#7d7b74',
    borderColor: '#7d7b74',
    textTransform: 'none',
    padding: '0 8px',
    fontSize:'13px'
}

type menuItem = {
    label: string,
    Icon: () => React.ReactElement,
    onClick: () => void
}

const DueDateButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null)
    };

    const  menuItems: menuItem[] = [
        {
            label: 'Today',
            Icon: () => <TodayIcon fontSize={'small'} sx={{ color: '#058527'}}/>,
            onClick: () => {}
        },
        {
            label: 'Tomorrow',
            Icon: () => <WbSunnyIcon fontSize={'small'} sx={{ color: '#eb8909'}}/>,
            onClick: () => {}
        }]


    return (
        <>
            <Button variant={'outlined'} sx={buttonsStyles} onClick={handleOpenMenu}>
                Due data
            </Button>
            <DropdownMenu anchorEl={anchorEl} handleClose={handleCloseMenu}>
                <Box display={"flex"} flexDirection={"column"} paddingTop={'5px'}>
                    <List>
                        {menuItems.map(({label,Icon, onClick}) => (
                            <ListItem
                                key={label}
                                onClick={() => {
                                    handleCloseMenu();
                                    onClick()}}
                                sx={{padding: 0, mb: '10px'}}
                            >
                                <ListItemButton sx={{padding: '5px 0 5px 16px'}}>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <Typography fontSize={'14px'}>
                                        {label}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <Calendar/>
                </Box>
            </DropdownMenu>
        </>

    );
};

export default DueDateButton;
