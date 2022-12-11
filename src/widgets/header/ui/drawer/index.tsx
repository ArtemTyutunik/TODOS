import React from "react";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import {default as ParamsIcon} from '@mui/icons-material/Apps';
type DrawerProps  = {
    isDrawerOpen: boolean
}

const responsiveListItem  = {
    fontSize: {md: '0.7rem', lg: '1rem'}
}


export default function Drawer({isDrawerOpen} : DrawerProps) {
   return (
       <Box position={"static"}  height={"calc(100vh - 64px)"} sx = {{
           width: { xs: '150px', sm: '200px', md: "250px", lg: "250px"},
           background: '#f5f5f5',
           transform: isDrawerOpen ? "translateX(0%)" : "translateX(-100%)",
           transition: "linear .4s "
       }}
       >
           <Box sx = {{paddingTop: "45px"}}>
               <List>
                   <ListItem disablePadding>
                       <ListItemButton>
                           <ListItemIcon>
                               <InboxIcon/>
                           </ListItemIcon>
                           <ListItemText sx={responsiveListItem} primary="Inbox"/>
                       </ListItemButton>
                   </ListItem>
                   <ListItem disablePadding>
                       <ListItemButton >
                           <ListItemIcon>
                               <TodayIcon/>
                           </ListItemIcon>
                           <ListItemText primary="Today" />
                       </ListItemButton>
                   </ListItem>
                   <ListItem disablePadding>
                       <ListItemButton >
                           <ListItemIcon>
                               <ParamsIcon/>
                           </ListItemIcon>
                           <ListItemText primary="Filters and labels" />
                       </ListItemButton>
                   </ListItem>
               </List>
           </Box>
        </Box>

   )
}