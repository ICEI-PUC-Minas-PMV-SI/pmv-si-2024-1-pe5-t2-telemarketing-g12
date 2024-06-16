import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { AppIcon } from "@components/app-icon";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "../providers/auth-provider";
import { dataProvider } from "../providers/data-provider";

export const metadata: Metadata = {
  title: "PUC Tele - Dashboard",
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "light" ? "light" : "dark";
 
  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                  <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    notificationProvider={notificationProvider}
                    authProvider={authProvider}
                    resources={[
                      {
                        name: "dashboard",
                        list: "/dashboard",
                        meta: {
                          canDelete: false,
                          label: "Dashboard"
                        },
                        icon: <DashboardIcon/>
                      },
                      {
                        name: "company",
                        list: "/company",
                        create: "/company/create",
                        edit: "/company/edit/:id",
                        show: "/company/show/:id",
                        meta: {
                          canDelete: true,
                        },
                        icon: <BusinessIcon/>
                      },
                      {
                        name: "product",
                        list: "/product",
                        create: "/product/create",
                        edit: "/product/edit/:id",
                        show: "/product/show/:id",
                        meta: {
                          canDelete: true,
                        },
                        icon: <LocalMallIcon/>
                      },
                      {
                        name: "client",
                        list: "/client",
                        create: "/client/create",
                        edit: "/client/edit/:id",
                        show: "/client/show/:id",
                        meta: {
                          canDelete: true,
                        },
                        icon: <AssignmentIndIcon/>
                      },
                      {
                        name: "user",
                        list: "/user",
                        create: "/user/create",
                        edit: "/user/edit/:id",
                        show: "/user/show/:id",
                        meta: {
                          canDelete: true,
                        },
                        icon: <PeopleAltIcon/>
                      },
                      {
                        name: "ticket",
                        list: "/ticket",
                        create: "/ticket/create",
                        edit: "/ticket/edit/:id",
                        show: "/ticket/show/:id",
                        meta: {
                          canDelete: false,
                        },
                        icon: <AssignmentIcon/>
                      },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "5tSY20-X5YMTS-QATgd4",
                      title: { text: "PUC Tele", icon: <AppIcon /> },
                    }}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
