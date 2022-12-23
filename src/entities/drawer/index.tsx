import React from "react";
import {useSelector} from "react-redux";

import {Box, List, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import {default as ParamsIcon} from '@mui/icons-material/Apps';
import {styled} from "@mui/material/styles";

import {RootReducer} from "../../app/store";

const CustomListText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down(450)] : {
        fontSize: '20px'
    },
    [theme.breakpoints.up(450)] : {
        fontSize: '18px'
    }
}))

const Drawer  = () => {
    const {isOpen} = useSelector((state: RootReducer) => state.drawerReducer)
    localStorage.setItem('isSideBarOpen', isOpen.toString())

    const CustomBox = styled(Box)(({theme}) => ({
        position: "static" ,
        display: 'flex',
        width: "250px",
        height: "calc(100vh - 64px)",
        background: '#f5f5f5',
        transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
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