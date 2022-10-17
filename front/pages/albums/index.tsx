import React from 'react';
import Navbar from "../../components/Navbar";
import MainLayout from "../../layouts/MainLayout";

const Index = () => {
    return (
        <>
            <MainLayout>
                <div className={"center"}>
                    <h1>Альбомы</h1>
                </div>
            </MainLayout>
            <style jsx>
                {`
                  .center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }

                `}
            </style>
        </>
    );
};

export default Index;