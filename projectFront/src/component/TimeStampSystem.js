import React, { useState, useEffect } from 'react'
import LogoPic from '../picture/logo55.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import TimeStampCSS from './styles/TimeStampSystem.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function TimeStampSystem() {

    // const clockStyle = {
    //     backgroundColorcolor: 'rgb(213, 212, 245)',
    //     color: 'rgb(0, 0, 0)',
    //     padding: '5px 10px',
    //     borderRadius: "5px",
    //     textShadow: '2px 2px 4px rgba(0, 0, 0, 0)'
    // }
    const [std, setStd] = useState([])
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState('');
    const [errorLogin,setErrorLogin] = useState('')
    let history = useNavigate();
    const goodbye = async () => {
        if (!selectStd) {
            // alert('Please select student')
            document.getElementById('textAlert').innerHTML = `กรุณาเลือกนักศึกษา`
            document.getElementById('textAlert').style.color = 'red'
        } else {
            const date = new Date();
            const result = date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                calendar: 'buddhist'
            });
            const params = new URLSearchParams({ student: selectStd, datenow: result }).toString();
            const resCheck = await axios.get(`http://localhost:2484/checkGoodbyeStudent?${params}`);
            // console.log(resCheck.data)
            if (resCheck.data.length) {
                document.getElementById('textAlert').innerHTML = `วันนี้${selectStd}ลางานไปแล้ว`
                document.getElementById('textAlert').style.color = 'red'
                return;
            } else {
                const queryParams = new URLSearchParams({
                    stdName: selectStd,
                }).toString();
                history(`/goodbyework?${queryParams}`)
            }
        }



    }
    useEffect(() => {
        const getStudent = async () => {
            try {
                // const url = new URL(import.meta.env.VITE_API + '/selectStudent');
                // const url = new URL('/http://localhost:2484/selectStudent');
                //http://localhost:2484
                const res = await axios.get('http://localhost:2484/selectStudent');
                // console.log(res.data)
                setStd(res.data);
                // console.log(std)
            } catch (err) {
                console.log(err);
            }
        };
        getStudent()
    }, [])
    const [place,setPlace] = useState([])
    useEffect(() => {
        const getPlace = async () => {
            try {
                // const url = new URL(import.meta.env.VITE_API + '/selectStudent');
                // const url = new URL('/http://localhost:2484/selectStudent');
                //http://localhost:2484
                const res = await axios.get('http://localhost:2484/selectPlace');
                // console.log(res.data)
                setPlace(res.data);
                // console.log(std)
            } catch (err) {
                console.log(err);
            }
        };
        getPlace()
    }, [])
    const [show, setShow] = useState(false);
    const [timenow, setTimenow] = useState('')
    const [selectStd, setSelectStd] = useState(null)
    const [selectPlace,setSelectPlace] = useState(null)
    const Login = async () => {
        if(!username||!password){
            setErrorLogin('กรุณากรอก Username หรือ Password ให้ครบ')
            return
        }
        try {
           
            const response = await axios.post('http://localhost:2484/login', { username, password });
            const { token } = response.data;
            console.log('Login successful:', token);
            localStorage.setItem('token', token); // Store the token in local storage
            handleClose(); // Close the modal on successful login
            if (token) {
                history('/TableAdmin')
            }else{

            }
        } catch (error) {
            setErrorLogin(error.response.data)
            console.error('Login failed:', error.response.data);
        }
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);
    function displayTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const timeString = `${hours}:${minutes}:${seconds}`;
        const clockElement = document.getElementById("clock"); // Ensure this ID exists in your HTML
        // if (clockElement) {
        clockElement.textContent = timeString;
        setTimenow(timeString)
        // } else {
        //     console.error("Clock element not found");
        // }
    }



    setInterval(displayTime, 1000); // อัพเดทเวลาทุก 1 วินาที

    /*   Map ตรงนี้   */
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: null
    });

    const handleCheckIn = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, handleError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(prevState => ({
            ...prevState,
            latitude,
            longitude
        }));
        getGeocode(latitude, longitude);
    };

    // const handleError = (error) => {
    //     console.error('Error occurred in geolocation:', error);
    // };
    //const apiKey = 'AIzaSyAPLDYVknztuLesQrAktrMk7_MpgolcY6o'
    const getGeocode = (lat, lng) => {
        // const apiKeyy = `${import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        // const apiKeyy = import.meta.env.VITE_API
        // console.log(apiKeyy)
        const apiKey = 'AIzaSyAPLDYVknztuLesQrAktrMk7_MpgolcY6o'
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // แสดงรายละเอียดข้อมูลที่ได้รับจาก API
                if (data.results && data.results.length > 0) {
                    setLocation(prevState => ({
                        ...prevState,
                        address: data.results[0].formatted_address
                    }));
                } else {
                    console.log('No address found for this location');
                    setLocation(prevState => ({
                        ...prevState,
                        address: 'No address found'
                    }));
                }
            })
            .catch(error => console.error('Error in fetching address:', error));
        //   console.log(location.latitude)
        //   console.log(location.longitude)
        //   console.log(location.address)
    };
    useEffect(() => {
        handleCheckIn();  // ทำการเช็คอินทันทีเมื่อคอมโพเนนต์เริ่มต้น
    }, []);
    const handleError = (error) => {
        console.error('Error occurred in geolocation:', error);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is currently unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            default:
                alert("An unknown error occurred.");
                break;
        }
    };

    const checkin = async () => {
        // console.log(place)
        if (!selectStd) {
            // alert('Please select student')
            document.getElementById('textAlert').innerHTML = `กรุณาเลือกนักศึกษา`
            document.getElementById('textAlert').style.color = 'red'
        } 
        else if(!selectPlace){
            document.getElementById('textAlert').innerHTML = `กรุณาเลือกสถานที่`
            document.getElementById('textAlert').style.color = 'red'
        }
        else {
            const date = new Date(); // ใช้วันที่ปัจจุบัน
            const result = date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                calendar: 'buddhist'  // เพิ่มเพื่อใช้ปฏิทินพุทธศักราช
            });
            const params = new URLSearchParams({ student: selectStd, datenow: result }).toString();
            const resCheck = await axios.get(`http://localhost:2484/checkCheckInStudent?${params}`);
            // console.log(resCheck.data)
            if (resCheck.data.length) {
                document.getElementById('textAlert').innerHTML = `วันนี้${selectStd}เช็คชื่อไปแล้ว`
                document.getElementById('textAlert').style.color = 'red'
                // alert(`วันนี้${selectStd}เช็คชื่อไปแล้ว`)
                return;
            } else {
                const checkinData = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    timenow: timenow,
                    student: selectStd,
                    datenow: result,
                    place: selectPlace

                };
                axios.post('http://localhost:2484/checkinStudent', checkinData)
                    .then(response => {
                        console.log('Check-in successful:', response.data);
                    })
                    .catch(error => {
                        console.error('Error in check-in:', error);
                    });
            }
            document.getElementById('textAlert').innerHTML = `เช็คชื่อเสร็จสิ้น`
            document.getElementById('textAlert').style.color = 'green'
            // alert('เช็คชื่อเสร็จสิ้น')
        }
    }
    const checkout = async () => {
        if (!selectStd) {
            document.getElementById('textAlert').innerHTML = `กรุณาเลือกนักศึกษา`
            document.getElementById('textAlert').style.color = 'red'
        } 
        else if(!selectPlace){
            document.getElementById('textAlert').innerHTML = `กรุณาเลือกสถานที่`
            document.getElementById('textAlert').style.color = 'red'
        }
        else {
            const date = new Date(); // ใช้วันที่ปัจจุบัน
            const result = date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                calendar: 'buddhist'  // เพิ่มเพื่อใช้ปฏิทินพุทธศักราช
            });
            const params = new URLSearchParams({ student: selectStd, datenow: result }).toString();
            const resCheck = await axios.get(`http://localhost:2484/checkCheckInStudent?${params}`);
            // console.log(resCheck.data)
            if (!resCheck.data.length) {
                document.getElementById('textAlert').innerHTML = `วันนี้${selectStd}ยังไม่มีการเช็คชื่อ`
                document.getElementById('textAlert').style.color = 'red'
                // alert(`วันนี้${selectStd}ยังไม่มีการเช็คชื่อ`)
                return;
            } else {
                const params = new URLSearchParams({ student: selectStd, datenow: result }).toString();
                const resCheckOut = await axios.get(`http://localhost:2484/checkCheckOutStudent?${params}`);
                console.log(resCheckOut.data)
                if (resCheckOut.data.length) {
                    document.getElementById('textAlert').innerHTML = `วันนี้${selectStd}ลงชื่อเลิกงานไปแล้ว`
                    document.getElementById('textAlert').style.color = 'red'
                    // alert(`วันนี้${selectStd}ลงชื่อเลิกงานไปแล้ว`)
                    return;
                }
                const checkinData = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    timenow: timenow,
                    student: selectStd,
                    datenow: result,
                    place: selectPlace
                };
                axios.post('http://localhost:2484/checkoutStudent', checkinData)
                    .then(response => {
                        console.log('Check-in successful:', response.data);
                    })
                    .catch(error => {
                        console.error('Error in check-in:', error);
                    });
            }
            document.getElementById('textAlert').innerHTML = `ลงชื่อเลิกงานเสร็จสิ้น`
            document.getElementById('textAlert').style.color = 'green'
            // alert('ลงชื่อเลิกงานเสร็จสิ้น')
        }
    }
    return (
        <div>


            <div className={`${TimeStampCSS.bodyy}`}>
                <Button variant="primary" onClick={handleShow}>
                    Login
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Admin Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type Username"
                                    autoFocus
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Type Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                        </Form>
                        <h5 style={{color:'red'}}>{errorLogin}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                       
                        <Button variant="primary" onClick={Login}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className={`container d-flex align-items-center justify-content-center min-vh-100`}>
                    <div className={`${TimeStampCSS.card} mx-auto`}>
                        <div className={`${TimeStampCSS.cardbody}`}>
                            <img src={LogoPic} />
                            <h4 >ระบบลงเวลางานนักศึกษาฝึกงาน</h4>
                            <span id="clock" className={`${TimeStampCSS.clock}`} style={{
                                backgroundColor: 'rgb(213, 212, 245)',
                                color: '#000000',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0)'

                            }}></span>
                            <div className={`${TimeStampCSS.formgroup}`}>
                                {/* <i class="bi bi-person-fill"></i> */}
                                <select name='asddas' className="form-select" value={selectStd}
                                    onChange={e => setSelectStd(e.target.value)}>
                                    <option selected>----เลือกนักศึกษา----</option>
                                    {std.map((data, key) => (

                                        <option key={key}>{data.stdName}</option>

                                    )
                                    )}</select>


                            </div>
                            <div className={`${TimeStampCSS.formgroup}`}>
                            <select name='asddas' className="form-select" value={selectPlace}
                                    onChange={e => setSelectPlace(e.target.value)}>
                                    <option selected>----สถานที่ทำงาน----</option>
                                    {place.map((data, key) => (

                                        <option key={key}>{data.placework_name}</option>

                                    )
                                    )}</select>
                            </div>
                            <div className={`${TimeStampCSS.formgroup}`}>
                                <div className={`${TimeStampCSS.btngroup}`}>
                                    <button onClick={checkin} type="button" className="btn btn-info">เข้างาน</button>
                                    <button onClick={goodbye} type="button" className="btn btn-danger">การลา</button>
                                    <button onClick={checkout} type="button" className="btn btn-warning">เลิกงาน</button>
                                </div>
                            </div>
                            <hr />
                            <div className={`${TimeStampCSS.footerdisplay}`}>
                                <h4 style={{ textAlign: 'center' }} id='textAlert'>ระบบลงเวลางานนักศึกษาฝึกงาน</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
