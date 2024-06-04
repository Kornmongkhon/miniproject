import React, { useState, useEffect } from 'react';
import LogoPic from '../picture/logo55.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeaveCSS from './styles/leavework.module.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function GoodbyeWork() {
    const [stdName, setStdName] = useState('');
    const [reason, setReason] = useState('');
    const [file, setFile] = useState(null);
    const [date, setDate] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const stdNameQuery = queryParams.get('stdName');
    const history = useNavigate()
    useEffect(() => {
        setStdName(stdNameQuery);
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, [stdNameQuery]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const dated = new Date();
            const result = dated.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                calendar: 'buddhist'
            });
        const formData = new FormData();
        formData.append('studentName', stdName);
        formData.append('reason', reason);
        formData.append('dateUse', result);
        formData.append('file', file);
        formData.append('date', date);

        try {
            const response = await axios.post('http://localhost:2484/upLoadLeavework', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            document.getElementById('textAlert').innerHTML = 'File uploaded successfully';
            document.getElementById('textAlert').style.color = 'green';
        } catch (error) {
            console.error(error);
            document.getElementById('textAlert').innerHTML = 'Failed to upload file';
            document.getElementById('textAlert').style.color = 'red';
        }

    };
    const gotomain = () =>{
        history('/')
    }
    return (
        <div className={`${LeaveCSS.bodyy}`}>
            <span
                id="clock"
                className={`${LeaveCSS.clock}`}
                style={{
                    display: 'none',
                }}
            ></span>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className={`${LeaveCSS.card} mx-auto`} style={{ alignItems: 'center' }}>
                    <div className={`${LeaveCSS.cardbody}`}>
                        <img src={LogoPic} alt="Logo" />
                        <h4>หมายเหตุการลางานของ {stdName}</h4>
                        <div className={`${LeaveCSS.formgroup}`}>
                            <div className="form-floating">
                                <textarea
                                    rows="6"
                                    className="form-control"
                                    placeholder="Leave a comment"
                                    id="floattextarea"
                                    style={{ height: '150px', maxHeight: '150px' }}
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                                <label htmlFor="floattextarea">หมายเหตุการลา</label>
                            </div>
                        </div>
                        <div className="input-group" style={{ paddingTop: '5%' }}>
                            <input
                                type="file"
                                className="form-control"
                                id="inputfile"
                                aria-label="upload"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="button" style={{ paddingTop: '9%' }}>
                            <h5 style={{ textAlign: 'center' }} id="textAlert">
                                ระบบลางานนักศึกษาฝึกงาน
                            </h5>
                            <div style={{display:'flex',justifyContent:'space-around',}}>
                            <Button style={{color:'white'}} onClick={handleSubmit} variant="primary" className="btn btn-outline-secondary">
                                UPLOAD
                            </Button>
                            <Button style={{color:'white'}} onClick={gotomain} variant="danger" className="btn btn-outline-secondary">
                                CLOSE
                            </Button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
