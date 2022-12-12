import React, {FC, useEffect, useState} from "react";
import {Box, List, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import {default as ParamsIcon} from '@mui/icons-material/Apps';
import {styled} from "@mui/material/styles";


const CustomListText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down(450)] : {
        fontSize: '20px'
    },
    [theme.breakpoints.up(450)] : {
        fontSize: '18px'
    }
}))

type drawerProps = {
    isSideBarOpen: boolean
}

const Drawer : FC<drawerProps> = ({isSideBarOpen}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<string | null>(null)

    useEffect(() => {
        setIsDrawerOpen(localStorage.getItem('isSideBarOpen'))
    }, [isSideBarOpen])

    const CustomBox = styled(Box)(({theme}) => ({
        position: "static" ,
        display: 'flex',
        width: "250px",
        height: "calc(100vh - 64px)",
        background: '#f5f5f5',
        transform: isDrawerOpen === 'true' ? "translateX(0%)" : "translateX(-100%)",
        transition: "transform .4s linear",
        [theme.breakpoints.down(450)] : {
            width: "100%",
        },
        [theme.breakpoints.up(600)] : {
            width: "250px"
        },
        [theme.breakpoints.up(900)] : {
            width: "320px"
        }
    }))

    return (
       <CustomBox>
           <Box sx = {{paddingTop: "45px"}}>
               <List>
                   <ListItem disablePadding>
                       <ListItemButton>
                           <ListItemIcon>
                               <InboxIcon/>
                           </ListItemIcon>
                           <CustomListText>Inbox</CustomListText>
                       </ListItemButton>
                   </ListItem>
                   <ListItem disablePadding>
                       <ListItemButton >
                           <ListItemIcon>
                               <TodayIcon/>
                           </ListItemIcon>
                           <CustomListText>Today</CustomListText>
                       </ListItemButton>
                   </ListItem>
                   <ListItem disablePadding>
                       <ListItemButton >
                           <ListItemIcon>
                               <ParamsIcon/>
                           </ListItemIcon>
                           <CustomListText>Filters and labels</CustomListText>
                       </ListItemButton>
                   </ListItem>
               </List>
           </Box>
        </CustomBox>

   )
}


export default Drawer;