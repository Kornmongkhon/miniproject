import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Table, Container } from 'react-bootstrap';
import NavBar from './NavBar';
import TableAdminCSS from './styles/TableAdmin.module.css'
// import { format } from 'date-fns';
export default function TableAdmin() {
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
    if (!isLoggedIn) {
        history(`/`)
    }
    const Dater = new Date(); // ใช้วันที่ปัจจุบัน
    const date = Dater.getDate()
    const month = (Dater.getMonth() + 1) < 10 ? '0' + (Dater.getMonth() + 1) : (Dater.getMonth() + 1)
    const year = Dater.getFullYear()
    const today = `${year}-${month}-${date}`
    // console.log(today)
    const [datahis, setDatahis] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today); // ตั้งค่าเริ่มต้นเป็นวันปัจจุบัน
    // console.log(selectedDate)
    useEffect(() => {
        const getHis = async () => {
            try {
                const res = await axios.get('http://localhost:2484/getHistoryCheck');
                console.log(res.data)
                setDatahis(res.data);  // ต้องใช้ res.data ไม่ใช่ res
                filterData(res.data, selectedDate); // Filter data initially
            } catch (err) {
                console.error(err);
            }
        };
        getHis();
    }, []);


    const filterData = (data, date) => {
        const filtered = data.filter(item => item.dateCreatein.split('T')[0] === date);
        setFilteredData(filtered);
    };


    useEffect(() => {
        filterData(datahis, selectedDate);
    }, [selectedDate]);



    const handleDateChange = (event) => {
        const newDate = event.target.value;
        if (newDate === today) {
            setFilteredData(datahis);
            setSelectedDate(newDate);
        } else {
            setSelectedDate(newDate);
        }
    };
    return (
        <div >
            <span id="clock" style={{
                display: 'none'

            }}></span>
            <NavBar />
            {/* <button onClick={handleLogout}>Log Out</button> */}
            <div className={`${TableAdminCSS.bodyy} `}>
                <Container className={`${TableAdminCSS.container}`}>
                    <input onChange={handleDateChange} className={`${TableAdminCSS.margintest}`} type='date' value={selectedDate} />
                    <Table striped bordered hover responsive>
                        <thead style={{ textAlign: 'center', verticalAlign: "top" }}>
                            <tr>
                                <th></th>
                                <th>ชื่อนักศึกษา</th>
                                <th>วันที่เข้างาน</th>
                                <th>เวลาที่เข้างาน</th>
                                <th>สถานที่เข้างาน</th>
                                <th>เวลาที่เลิกงาน</th>
                                <th>สถานที่เลิกงาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.length > 0 ? (filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {item.isLate == 0 ? (
                                        <td>{item.chin_student}</td>
                                    ) : (
                                        <td style={{ color: 'red' }}>{item.chin_student}</td>
                                    )}
                                    <td>{item.chin_date}</td>
                                    <td>{item.chin_time}</td>
                                    <td>{item.locain}</td>
                                    <td>{item.chout_time}</td>
                                    <td>{item.locaout}</td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={7}>No data</td>
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
