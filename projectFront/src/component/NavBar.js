import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LogoPic from '../picture/logo55.png'

export default function NavBar() {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token'); // ลบ token จาก localStorage
        history('/'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
    };
    const gotohome = () => {
        history('/TableAdmin');
    }
    return (
        <Navbar className="bg-secondary-subtle">
            <Container fluid>
                {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                 */}
                <img onClick={gotohome} src={LogoPic} />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavDropdown title="ตารางนักศึกษาเข้างาน-เลิกงาน" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="TableAdmin">เลือกดูรายวัน</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action4">
                                
                            </NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="TableAdminMonth">
                                เลือกดูรายเดือน
                            </NavDropdown.Item>
                        </NavDropdown>
                        {/* <NavDropdown title="ตารางนักศึกษาลางาน" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="TableLeaveWork">เลือกดูรายวัน</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="TableLeaveWorkMonth">
                                เลือกดูรายเดือน
                            </NavDropdown.Item>
                        </NavDropdown> */}
                        {/* <Nav.Link href="TableLeaveWork">ตารางนักศึกษาลางาน</Nav.Link> */}
                        <Nav.Link href="TableLeaveWork">ตารางนักศึกษาลางาน</Nav.Link>
                        <Nav.Link href="AllStudent">นักศึกษาทั้งหมด</Nav.Link>
                        <Nav.Link href="AllPlace">สถานที่ทำงานทั้งหมด</Nav.Link>
                    </Nav>

                    <Button onClick={handleLogout} variant="danger">Logout</Button>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
