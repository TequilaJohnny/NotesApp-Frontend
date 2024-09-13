import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"
import Header from "../UI/Header/Header"

const Layout = () => (
    <>
        <Header />
        <Container sx={{ py: 10 }}>
            <Outlet />  
        </Container>
    </>
)

export default Layout