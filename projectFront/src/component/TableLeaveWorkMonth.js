import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Table, Container, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import TableAdminCSS from './styles/TableAdmin.module.css'
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
// import { format } from 'date-fns';
export default function TableLeaveMonth() {
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
                const res = await axios.get('http://localhost:2484/getHisLeaveWork');
                console.log(res.data)
                setDatahis(res.data);  // ต้องใช้ res.data ไม่ใช่ res
                filterData(res.data, selectedDate);
                console.log(selectedDate)
            } catch (err) {
                console.error(err);
            }
        };
        getHis();
    }, []);


    // Filter data by selected date
    const filterData = (data, date) => {
        console.log(date)
        console.log(data)
        const filtered = data.filter(item => item.dateCreate.split('T')[0] === date);
        console.log(filtered)
        setFilteredData(filtered);
    };

    // Re-filter data when selectedDate changes
    useEffect(() => {
        filterData(datahis, selectedDate);
    }, [selectedDate]);

    // Handle date change

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        if (newDate === today) {
            setFilteredData(datahis);
        } else {
            setSelectedDate(newDate);
        }
    };
    const downloadFile = (filename) => {
        axios({
            url: `http://localhost:2484/download/${filename}`,
            method: 'GET',
            responseType: 'blob', // ทำให้การตอบสนองเป็น blob
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch((error) => {
            console.error('Error downloading file:', error);
        });
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
                                <th>วันที่ลางาน</th>
                                <th>หมายเหตุการลา</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.length > 0 ? (filteredData.map((item, index) => (
                                <tr style={{ textAlign: 'center' }} key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.leavework_std}</td>
                                    <td>{item.leavework_date}</td>
                                    <td>{item.leavework_detail}</td>
                                    <td><Button onClick={() => downloadFile(item.leavework_path)} variant="primary">ดาวโหลดไฟล์</Button></td>
                                    
                                </tr>
                            ))) : (
                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={5}>No data</td>
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
