import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Table, Container, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import TableAdminCSS from './styles/TableAdmin.module.css'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import { format } from 'date-fns';
export default function AllPlace() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let history = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token'); // อ่าน token จาก localStorage
        console.log(token)
        if (token) {
            setIsLoggedIn(true);
        } else {
            history('/');
        }
    }, []);



    const [datahis, setDatahis] = useState([])
    const [name, setName] = useState('')

    // console.log(selectedDate)
    useEffect(() => {
        const getHis = async () => {
            try {
                const res = await axios.get('http://localhost:2484/selectPlace');
                setDatahis(res.data);  // ต้องใช้ res.data ไม่ใช่ res
                console.log(res.data);  // ใช้ตรงนี้เพื่อตรวจสอบข้อมูลทันทีหลังจากตั้งค่า
            } catch (err) {
                console.error(err);
            }
        };
        getHis();
        console.log(datahis);
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    if (!isLoggedIn) {
        history(`/`)
    }

    const addStudent = async () => {
        console.log(name)
        if (!name) {
            document.getElementById('textAlert').innerHTML = 'กรุณากรอกชื่อสถานที่ทำงาน'
            document.getElementById('textAlert').style.color = 'red'
            return
        } else {
            const checkname = datahis.find(item => item.stdName === name)
            console.log(checkname)
            if (checkname) {
                document.getElementById('textAlert').innerHTML = 'ชื่อสถานที่ทำงานซ้ำ'
                document.getElementById('textAlert').style.color = 'red'
                return
            } else {
                try {
                    const response = await axios.post('http://localhost:2484/addPlacework', { name });
                    console.log(response)
                    setName('')
                    window.alert('เพิ่มสถานที่ทำงานเสร็จสิ้น')
                    history('/AllStudent')
                } catch (err) {
                    console.error(err);
                }
            }
        }
    };
    const deleteStudent = async (stuname) =>{
        const con = window.confirm(`ต้องการลบ ${stuname} หรือไม่`)
        if(con){
            try{
                const response = await axios.delete(`http://localhost:2484/deletePlacework/${stuname}`);
               
                console.log(response)
                window.alert('ลบชื่อสถานที่ทำงานเสร็จสิ้น')
                history('/AllStudent')
            }catch(err){
                console.error(err);
            }
            
        }
    }
    return (
        <div >
            <span id="clock" style={{
                display: 'none'

            }}></span>
            <NavBar />
            {/* <button onClick={handleLogout}>Log Out</button> */}
            <div className={`${TableAdminCSS.bodyy} `}>
                <Container className={`${TableAdminCSS.container}`}>
                    <Button onClick={handleShow} className={`${TableAdminCSS.margintest}`} >เพิ่มสถานที่ทำงาน</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>เพิ่มสถานที่ทำงาน</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>กรอกชื่อสถานที่ทำงาน</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="กรอกชื่อสถานที่ทำงาน"
                                        autoFocus
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <h4 id='textAlert'></h4>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="primary" onClick={addStudent}>
                                เพิ่มสถานที่ทำงาน
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Table style={{ width: '100%', maxWidth: '1200px', overflowX: 'auto' }} className={`${TableAdminCSS.margintestt}`} striped bordered hover responsive>
                        <thead style={{ textAlign: 'center', verticalAlign: "top" }}>
                            <tr>
                                <th></th>
                                <th>ชื่อสถานที่ทำงาน</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datahis && datahis.length > 0 ? (datahis.map((item, index) => (
                                <tr style={{ textAlign: 'center' }} key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.placework_name}</td>
                                    <td>
                                        <Button onClick={() => deleteStudent(item.placework_name)} variant="danger" >
                                            ลบสถานที่ทำงาน
                                        </Button>
                                    </td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={3}>No data</td>
                                </tr>
                            )

                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
}
