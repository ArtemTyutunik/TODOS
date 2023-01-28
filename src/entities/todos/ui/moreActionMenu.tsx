import React from 'react';
import DropdownMenu from "../../../shared/ui/dropdownMenu";
import {
    Box, Divider,
    IconButton, List, ListItemButton,
    Tooltip,
    Typography
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlagIcon from '@mui/icons-material/Flag';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';

interface MoreActionsMenuProps {
    onDelete: () => void,
    onDuplicate: () => void,
    onSetPriority: (priority: string) => void
}

const Priorities = [
    {value: '1', Icon:() => <FlagIcon sx={{color: '#cc2a25'}}/>},
    {value: '2', Icon: () => <FlagIcon sx={{color: '#ff824d'}}/>},
    {value: '3', Icon: () => <FlagIcon sx={{color: '#1531d1'}}/>},
    {value: '4', Icon: () => <FlagIcon sx={{color: '#babbc2'}}/>},
]

const MoreActionsMenu = ({onDelete,onDuplicate,onSetPriority}: MoreActionsMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={'More actions'}>
                <IconButton onClick={handleOpenUserMenu}>
                    <MoreHorizIcon color={"action"}/>
                </IconButton>
            </Tooltip>

            <DropdownMenu anchorEl={anchorEl } handleClose={handleCloseMenu}>
                    <Box padding={'0 10px'}>
                        <Box m={'10px 0'}>
                            <Typography>Set priority</Typography>
                            <Box display={"flex"}>
                                {Priorities.map(Priority => <Box mr={'10px'} key={Priority.value}>
                                            <IconButton onClick={() => onSetPriority(Priority.value)}>
                                                <Priority.Icon/>
                                            </IconButton>
                                        </Box>
                                )}
                            </Box>
                        </Box>
                        <List>
                            <ListItemButton sx = {{padding: '10px 0', marginBottom: '10px'}} onClick={onDuplicate}>
                                <QueueIcon sx={{color: 'grey'}}/>
                                <Typography ml={'15px'}>
                                    Duplicate
                                </Typography>
                            </ListItemButton>
                        </List>

                        <Divider/>
                        <ListItemButton sx = {{padding: '10px 0', margin: '10px 0'}} onClick={onDelete}>
                            <DeleteIcon sx={{color: 'grey'}}/>
                            <Typography ml={'15px'}>
                                Delete
                            </Typography>
                        </ListItemButton>
                    </Box>
            </DropdownMenu>
        </>
    );
};

export default MoreActionsMenu;
