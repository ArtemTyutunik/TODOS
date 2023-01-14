import React, {FC} from "react";
import {Box, Modal} from "@mui/material";

interface IModal {
    children?: React.ReactElement;
    open: boolean,
    onClose: () => void
}


const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '600px',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const BasicModal:FC<IModal> = ({children, open, onClose}) => {
    return <Modal open={open} onClose={onClose}>
        <Box sx = {style}>
            {children}
        </Box>
    </Modal>
}

export default BasicModal