import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const navigate = useNavigate();
    const alertError = (msg) => toast.error(msg);

    const [accounts, setaccounts] = useState({})
    const [data, setData] = useState({})

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('/data.json');
            console.log(response.data)
          setaccounts(response.data.users);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
       fetchAccounts() 
    },[])
    

    const submitData = async (e) => {
        e.preventDefault();
        accounts.forEach(account => {
            if (data.username == account.username) {
                alertError("username taken");
            } if (data.email == account.email) {
                alertError("email taken");
            }
            return;
        });
        
        accounts.push({
            username: data.username,
            password: data.password,
            email: data.email
        });
            navigate("/login")
            
    };

    const isValidEmail = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    }
    
    return (
        <motion.div exit={{ x: '-100vw' }} initial={{ x: '100vw' }} animate={{ x: 0 }} transition={{ ease: 'easeInOut' }} className="login-page">
            <ToastContainer floatingTime={5000} containerStyle={{ position: "fixed" }} />
            <h1>
                انشاء حساب جديد
            </h1>
            <h6>ادخل البيانات المطلوبة بالاسفل</h6>
            <form className="login-form" >
                <label htmlFor="name">
                    
                    <h5>الاسم بالكامل</h5>
                    <input  required={true} type="text" id='name' onChange={(e) => setData({ ...data, username: e.target.value })} />
                </label>
              
                <label htmlFor="email">
                    <h5>البريد الالكتروني </h5>
                    <input  style={{ border: isValidEmail(data?.email) ? '1px solid black' : '1px solid red' }} required={true} type="email" id='email' onChange={(e) => setData({ ...data, email: e.target.value })} />
                </label>
                <div className="accept-deals">

                <h6> GreenDefend</h6>
                <h6> اوافق علي ارسال اخر العروض من تطبيق </h6>
                </div>
                <label htmlFor="password">
                    <h5>كلمة المرور</h5>
                    <input min={8} required={true} type="password" id='password' onChange={(e) => setData({ ...data, password: e.target.value })} />
                </label>

                <label htmlFor="passwordAgain">
                    <h5>كلمة المرور مرة اخري </h5>
                    <input min={8} required={true}  type="password" id='passwordAgain' onChange={(e) => setData({ ...data, passwordAgain: e.target.value })} />
                </label>
            </form>
                <button onClick={submitData} disabled={!data.username || !data.email || !isValidEmail(data.email) || !data.password || !data.passwordAgain || data.password != data.passwordAgain} className="login-button">انشاء حساب</button>
        </motion.div>
    );
};

export default Login