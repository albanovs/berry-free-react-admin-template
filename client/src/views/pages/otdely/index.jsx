import { Grid } from "@mui/material";
import { gridSpacing } from "store/constant";
import EarningCard from "views/dashboard/EarningCard";
import { useState, useEffect } from "react";

const Otdels = () => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/leader'} title={'Лидер'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/otdel2'} title={'Отдел 2'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/otdel3'} title={'Отдел 3'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/otdel4'} title={'Отдел 4'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/otdel5'} title={'Отдел 5'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/otdel6'} title={'Отдел 6'} isLoading={isLoading} />
            </Grid>
        </Grid>
    )
}

export default Otdels;