import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import TableAdminCSS from './styles/TableAdmin.module.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function TableAdminMonth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            history('/');
        }
    }, [history]);

    if (!isLoggedIn) {
        history(`/`);
    }

    const Dater = new Date(); // ใช้วันที่ปัจจุบัน
    const date = Dater.getDate();
    const month = (Dater.getMonth() + 1) < 10 ? '0' + (Dater.getMonth() + 1) : (Dater.getMonth() + 1);
    const year = Dater.getFullYear();
    const today = `${year}-${month}-${date}`;

    const [datahis, setDatahis] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(month); // ตั้งค่าเริ่มต้นเป็นวันปัจจุบัน

    useEffect(() => {
        const getHis = async () => {
            try {
                const res = await axios.get('http://localhost:2484/getHistoryCheckYear');
                setDatahis(res.data);
                filterData(res.data, selectedMonth);
            } catch (err) {
                console.error(err);
            }
        };
        getHis();
    }, [selectedMonth]);

    const filterData = (data, date) => {
        const filtered = data.filter(item => item.dateCreatein.split('-')[1] === date);
        setFilteredData(filtered);
    };

    const handleMonthChange = (event) => {
        const newMonth = event.target.value;
        setSelectedMonth(newMonth);
    };
    console.log(datahis)
    return (
        <div>
            <NavBar />
            <div className={`${TableAdminCSS.bodyy}`}>
                <Container className={`${TableAdminCSS.container}`}>
                    <div style={{display:'flex',marginBottom:'20px'}}>
                        <select className={`${TableAdminCSS.selectstyle} ${TableAdminCSS.margintest}`} value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            <option selected disabled>----เลือกเดือน----</option>
                            <option value={'01'}>มกราคม</option>
                            <option value={'02'}>กุมภาพันธ์</option>
                            <option value={'03'}>มีนาคม</option>
                            <option value={'04'}>เมษายน</option>
                            <option value={'05'}>พฤษภาคม</option>
                            <option value={'06'}>มิถุนายน</option>
                            <option value={'07'}>กรกฎาคม</option>
                            <option value={'08'}>สิงหาคม</option>
                            <option value={'09'}>กันยายน</option>
                            <option value={'10'}>ตุลาคม</option>
                            <option value={'11'}>พฤศจิกายน</option>
                            <option value={'12'}>ธันวาคม</option>
                        </select>
                        <ReactHTMLTableToExcel
                            id="export-excel-button"
                            className="mt-3 btn btn-success"
                            table="table-to-xls"
                            filename={`ตารางเข้าออกงาน_เดือน-${selectedMonth}`}
                            sheet={`ตารางเข้าออกงาน_เดือน-${selectedMonth}`}
                            buttonText="Download Excel"
                        />
                    </div>
                    <div className={`${TableAdminCSS.tableContainer}`}>
                        <Table id='table-to-xls' striped bordered hover responsive>
                            <thead style={{ textAlign: 'center', verticalAlign: "top" }}>
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อนักศึกษา</th>
                                    <th>วันที่เข้างาน</th>
                                    <th>เวลาที่เข้างาน</th>
                                    <th>สถานที่เข้างาน</th>
                                    <th>เวลาที่เลิกงาน</th>
                                    <th>สถานที่เลิกงาน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {item.isLate==0?(
                                                <td>{item.chin_student}</td>
                                            ):(
                                                <td style={{color:'red'}}>{item.chin_student}</td>
                                            )}
                                            
                                            <td>{item.chin_date}</td>
                                            <td>{item.chin_time}</td>
                                            <td>{item.locain}</td>
                                            <td>{item.chout_time}</td>
                                            <td>{item.locaout}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan={7}>No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    );
}
