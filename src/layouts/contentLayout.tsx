import Todo from "../entities/todos/ui/todo";
import Drawer from "../entities/drawer"
import {Grid} from "@mui/material";

const ContentLayout = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Drawer/>
            </Grid>
            <Grid item xs={6}>
                <Todo />
            </Grid>
        </Grid>
    )
}

export default ContentLayout;