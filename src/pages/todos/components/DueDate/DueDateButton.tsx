import React, {useState} from 'react';
import DropdownMenu from "../../../../shared/components/dropdownMenu";
import {Box, Button, Divider,} from "@mui/material";
import Calendar from "./Calendar";
import DueDateMenuList from "./DueDateMenu";
import {IDate} from "../../../../shared/interfaces";


const buttonsStyles = {
    color: '#7d7b74',
    borderColor: '#7d7b74',
    textTransform: 'none',
    padding: '0 8px',
    fontSize:'13px'
}

interface Props {
    date: IDate,
    onPassDateToBaseForm: (date: IDate) => void
}

const DueDateButton = ({date, onPassDateToBaseForm}: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onSetDate = (date: IDate) => {
        onPassDateToBaseForm(date)
        handleCloseMenu()
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null)
    };


    return (
        <>
            <Button variant={'outlined'} sx={buttonsStyles} onClick={handleOpenMenu}>
                {
                    date || 'Due date'
                }
            </Button>

            <DropdownMenu anchorEl={anchorEl} handleClose={handleCloseMenu}>
                <Box display={"flex"} flexDirection={"column"} paddingTop={'5px'}>
                    <DueDateMenuList onSetDate={onSetDate}/>
                    <Divider/>
                    <Calendar onSetDate={onSetDate} initialDate={date}/>
                </Box>
            </DropdownMenu>
        </>

    );
};

export default DueDateButton;
