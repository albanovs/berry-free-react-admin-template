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
                <EarningCard url={'/liberty'} title={'Liberty'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/turan'} title={'Туран'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/monaco'} title={'Монако'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/otdel5'} title={'Отдел 5'} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard url={'/itotdel'} title={'IT отдел'} isLoading={isLoading} />
            </Grid>
        </Grid>
    )
}

export default Otdels;