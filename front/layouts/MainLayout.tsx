import React from 'react';
import Navbar from "../components/Navbar";
import {Container} from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
  description?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description}) => {
  return (
    <>
      <Head>
          <title>{title || 'Музыкальная платформа'}</title>
      </Head>
      <Navbar/>
      <Container style={{margin: "80px auto"}}>
        {children}
      </Container>
      <Player/>
    </>
  );
};

export default MainLayout;