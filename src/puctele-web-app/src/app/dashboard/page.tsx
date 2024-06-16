'use client';

import { useList } from '@refinedev/core';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Stack, Typography, Grid, Divider, CircularProgress, Paper, Link, IconButton } from '@mui/material';
import { blueberryTwilightPalette, mangoFusionPalette, cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';
import { styled } from '@mui/material/styles';

import ptBR from '@locales/pt-br/common.json';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function BlogPostList() {
  const { data: companyData, isLoading: companyIsLoading } = useList({
    resource: 'company',
    pagination: { current: 1, pageSize: 300 },
  });

  const { data: productData, isLoading: productIsLoading } = useList({
    resource: 'product',
    pagination: { current: 1, pageSize: 300 },
  });

  const { data: userData, isLoading: userIsLoading } = useList({
    resource: 'user',
    pagination: { current: 1, pageSize: 300 },
  });

  const { data: clientData, isLoading: clientIsLoading } = useList({
    resource: 'client',
    pagination: { current: 1, pageSize: 2000 },
  });

  const { data: ticketData, isLoading: ticketIsLoading } = useList({
    resource: 'ticket',
    pagination: { current: 1, pageSize: 2000 },
  });

  const ticketsByProduct: object =
    ticketData?.data.reduce((memo, current) => {
      const product = productData?.data?.find((item) => {
        return item.id == current.productId;
      });
      const companyId: number = product?.companyId;
      const company = companyData?.data?.find((item) => {
        return item.id == companyId;
      });
      let companyArr = { ...(memo[companyId] || { company: company?.name }) };
      companyArr[current['productId']] = (companyArr[current['productId']] || 0) + 1;
      memo[companyId] = companyArr;
      return memo;
    }, {}) || {};

  const ticketValues = Object.values(ticketsByProduct);
  const dataset = new Array();
  for (let index = 0; index < ticketValues.length; index++) {
    const item = ticketValues[index];
    let countProd = 1;
    let newComp: object = {};
    Object.keys(item).map((key) => {
      if (key === 'company') {
        newComp = { ...newComp, [key]: item[key] };
      } else {
        newComp = { ...newComp, [`product_${countProd}`]: item[key] };
        countProd++;
      }
    });
    dataset.push(newComp);
  }

  const getPieChart = (param: string) => {
    const ticketsByParam = ticketData?.data.reduce(function (r, a) {
      r[a[param]] = r[a[param]] || [];
      r[a[param]].push(a);
      return r;
    }, Object.create(null));
    const keys = Object.keys(ticketsByParam);
    const dataValues = new Array();

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      //@ts-ignore
      const label = ptBR.ticket[param]?.[key];
      dataValues.push({ id: key, value: ticketsByParam[key]?.length, label: label });
    }
    return dataValues;
  };

  const PiechartProps = {
    innerRadius: 30,
    outerRadius: 110,
    paddingAngle: 3,
    cornerRadius: 9,
    startAngle: 0,
    endAngle: 360,
    cx: 120,
    cy: 120,
  };

  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 280,
    height: 520,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  return (
    <Box flexGrow={1}>
      <Grid container spacing={4} justifyContent="center" alignItems="center" direction="column">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Tabelas
          </Typography>
        </Grid>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box padding={3} height={110} flexDirection="column" display="flex" alignItems="flex-start" justifyContent="center">
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} gutterBottom>
                  Empresas
                </Typography>
                <Box sx={{ width: '100%' }} flexDirection="row" display="flex" alignItems="center" justifyContent="center">
                  <BusinessIcon sx={{ fontSize: 40, marginRight: 3, color: 'rgb(0, 89, 178)' }} />
                  <Typography sx={{ fontSize: 30, fontWeight: 'bold' }} >
                    {companyData?.data.length}
                  </Typography>
                  <Link href="/company" underline="none" sx={{marginLeft:'auto'}}>
                    <IconButton aria-label="fingerprint" color="success" size='large' >
                      <ArrowCircleRightOutlinedIcon fontSize="large" color='info'/>
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box padding={3} height={110} flexDirection="column" display="flex" alignItems="flex-start" justifyContent="center">
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} gutterBottom>
                  Produtos
                </Typography>
                <Box sx={{ width: '100%' }} flexDirection="row" display="flex" alignItems="center" justifyContent="center">
                  <LocalMallIcon sx={{ fontSize: 40, marginRight: 3, color: 'rgb(252, 95, 92)' }} />
                  <Typography sx={{ fontSize: 30, fontWeight: 'bold' }} >
                    {productData?.data.length}
                  </Typography>
                  <Link href="/product" underline="none" sx={{marginLeft:'auto'}}>
                    <IconButton aria-label="fingerprint" color="success" size='large' >
                      <ArrowCircleRightOutlinedIcon fontSize="large" color='info'/>
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box padding={3} height={110} flexDirection="column" display="flex" alignItems="flex-start" justifyContent="center">
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} gutterBottom>
                  Clientes
                </Typography>
                <Box sx={{ width: '100%' }} flexDirection="row" display="flex" alignItems="center" justifyContent="center">
                  <AssignmentIndIcon sx={{ fontSize: 40, marginRight: 3, color: 'rgb(255, 194, 76)' }} />
                  <Typography sx={{ fontSize: 30, fontWeight: 'bold' }} >
                    {clientData?.data.length}
                  </Typography>
                  <Link href="/client" underline="none" sx={{marginLeft:'auto'}}>
                    <IconButton aria-label="fingerprint" color="success" size='large' >
                      <ArrowCircleRightOutlinedIcon fontSize="large" color='info'/>
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box padding={3} height={110} flexDirection="column" display="flex" alignItems="flex-start" justifyContent="center">
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} gutterBottom>
                  Usuários
                </Typography>
                <Box sx={{ width: '100%' }} flexDirection="row" display="flex" alignItems="center" justifyContent="center">
                  <PeopleAltIcon sx={{ fontSize: 40, marginRight: 3, color: 'rgb(2, 178, 175)' }} />
                  <Typography sx={{ fontSize: 30, fontWeight: 'bold' }} >
                    {userData?.data.length}
                  </Typography>
                  <Link href="/user" underline="none" sx={{marginLeft:'auto'}}>
                    <IconButton aria-label="fingerprint" color="success" size='large' >
                      <ArrowCircleRightOutlinedIcon fontSize="large" color='info'/>
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box padding={3} height={110} flexDirection="column" display="flex" alignItems="flex-start" justifyContent="center">
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} gutterBottom>
                  Tickets
                </Typography>
                <Box sx={{ width: '100%' }} flexDirection="row" display="flex" alignItems="center" justifyContent="center">
                  <AssignmentIcon sx={{ fontSize: 40, marginRight: 3, color: 'rgb(144, 1, 203)' }} />
                  <Typography sx={{ fontSize: 30, fontWeight: 'bold' }} >
                    {ticketData?.data.length}
                  </Typography>
                  <Link href="/ticket" underline="none" sx={{marginLeft:'auto'}}>
                    <IconButton aria-label="fingerprint" color="success" size='large' >
                      <ArrowCircleRightOutlinedIcon fontSize="large" color='info'/>
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box width={1000} height={500} flexDirection="column" display="flex" alignItems="center" justifyContent="center">
            {dataset.length > 0 ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Chamadas Por Empresas
                </Typography>
                <BarChart
                  dataset={dataset}
                  yAxis={[{ scaleType: 'band', dataKey: 'company' }]}
                  xAxis={[
                    {
                      label: 'Número de Chamadas',
                    },
                  ]}
                  series={[
                    { dataKey: 'product_1', label: 'Produto 1' },
                    { dataKey: 'product_2', label: 'Produto 2' },
                  ]}
                  margin={{ left: 200 }}
                  layout="horizontal"
                  width={1000}
                  height={500}
                />
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <DemoPaper variant="elevation" elevation={3}>
              <Typography variant="h6" gutterBottom>
                Prioridade
              </Typography>
              {ticketData ? (
                <PieChart
                  series={[
                    {
                      ...PiechartProps,
                      data: getPieChart('priority'),
                    },
                  ]}
                  width={300}
                  height={380}
                  colors={blueberryTwilightPalette}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                    },
                  }}
                />
              ) : (
                <Box width={280} height={380} display="flex" alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
            </DemoPaper>
            <DemoPaper variant="elevation" elevation={3}>
              <Typography variant="h6" gutterBottom>
                Status
              </Typography>
              {ticketData ? (
                <PieChart
                  series={[
                    {
                      ...PiechartProps,
                      data: getPieChart('status'),
                    },
                  ]}
                  width={300}
                  height={410}
                  colors={mangoFusionPalette}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                    },
                  }}
                />
              ) : (
                <Box width={280} height={400} display="flex" alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
            </DemoPaper>
            <DemoPaper variant="elevation" elevation={3}>
              <Typography variant="h6" gutterBottom>
                Tipo
              </Typography>
              {ticketData ? (
                <PieChart
                  series={[
                    {
                      ...PiechartProps,
                      data: getPieChart('type'),
                    },
                  ]}
                  width={300}
                  height={440}
                  colors={cheerfulFiestaPalette}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                    },
                  }}
                />
              ) : (
                <Box width={280} height={400} display="flex" alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
            </DemoPaper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
