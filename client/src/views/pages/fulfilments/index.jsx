import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import TotalIncomeLightCard from 'views/dashboard/TotalIncomeLightCard'
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';

export default function Fulfilments() {

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <Grid item xs={12}>
            <Box
                display="flex"
                justifyContent="space-between"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={2}
            >
                <Box flex={1} width={{ xs: "100%", lg: "auto" }}>
                    <NavLink to="add-otchet-full1">
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={"Создать"}
                            icon={<AssignmentIcon fontSize="inherit" />}
                        />
                    </NavLink>
                </Box>
                <Box flex={1} width={{ xs: "100%", lg: "auto" }}>
                    <NavLink to="/fulfilments/view">
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={"Отчеты"}
                            icon={<AssignmentIcon fontSize="inherit" />}
                        />
                    </NavLink>
                </Box>
            </Box>
        </Grid>
    )
}
