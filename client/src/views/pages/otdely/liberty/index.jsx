import React from "react";
import { Grid, Box } from "@mui/material";
import TotalIncomeDarkCard from "views/dashboard/TotalIncomeDarkCard";
import TotalIncomeLightCard from "views/dashboard/TotalIncomeLightCard";
import TotalOrderLineChartCard from "views/dashboard/TotalOrderLineChartCard";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TotalGrowthBarChart from "views/dashboard/TotalGrowthBarChart";
import TotalSumLineChartCard from "views/dashboard/TotalSumLineChartCard";
import RaitingManager from "../components/managers/raitingmanager";
import RaitingSeniorAdmin from "../components/admins/senioradmins";
import RaitingAdmin from "../components/admins/admins";
import RaitingLogist from "../components/admins/logist";
import { NavLink } from "react-router-dom";

const LibertyPage = ({ isLoading }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <NavLink to='/liberty-add-otchet'>
                                    <TotalIncomeDarkCard title={'Создать отчет'} isLoading={isLoading} />
                                </NavLink>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <NavLink to='/liberty-view-otchet'>
                                    <TotalIncomeDarkCard title={'Ежедневные отчеты'} isLoading={isLoading} />
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard buyers={20} admin={30} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalSumLineChartCard comission={40000} index={400} isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={{ xs: "column", lg: "row" }}
                    gap={2}
                >
                    <Box flex={1} width={{ xs: "100%", lg: "auto" }}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={"Привлеченные клиенты"}
                            icon={<AssignmentIcon fontSize="inherit" />}
                        />
                    </Box>
                    <Box flex={1} width={{ xs: "100%", lg: "auto" }}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={"Счет фактуры"}
                            icon={<AssignmentIcon fontSize="inherit" />}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <TotalGrowthBarChart />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <RaitingManager />
                <RaitingSeniorAdmin />
                <RaitingAdmin />
                <RaitingLogist />
            </Grid>
        </Grid>
    );
};

export default LibertyPage;