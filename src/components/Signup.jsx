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
    const [emailmsg, setEmailmsg] = useState(false)
    const [passwordmsg, setPasswordmsg] = useState(false)
    const [passwordAgainmsg, setPasswordAgainmsg] = useState(false)


    console.log(emailmsg)
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
    }, [])
    // useEffect(() => {
    //     if (!isValidEmail(data.email)) {
    //         setEmailmsg(true)
    //     } else {
    //         setEmailmsg(false)
    //     }
    // },[data.email])
    

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

    const handleEmailBlur = () => {
        if (!isValidEmail(data.email)) {
            setEmailmsg(true)
        } else {
            setEmailmsg(false)
        }
    }

    const handlePasswordBlur = () => {
        if (data?.password?.length >= 8) {
            setPasswordmsg(false)
        } else {
            setPasswordmsg(true)
        }
    }

    const handlePasswordAgainBlur = () => {
        if (data?.password != data?.passwordAgain) {
            setPasswordAgainmsg(true)
        } else {
            setPasswordAgainmsg(false)
        }
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
                    
                    <h5 className="field-name">الاسم بالكامل</h5>
                    <input placeholder="name" required={true} type="text" id='name' onChange={(e) => setData({ ...data, username: e.target.value })} />
                </label>
              
                <label htmlFor="email">
                    <h5 className="field-name">البريد الالكتروني </h5>
                    <p style={{display:`${emailmsg?"block":"none"}`}} className="blurred-msg"> please enter a valid email  </p>
                    <input onBlur={handleEmailBlur} placeholder="example@email.com" style={{ border: isValidEmail(data?.email) ? '1px solid black' : '1px solid red' }} required={true} type="email" id='email' onChange={(e) => setData({ ...data, email: e.target.value })} />
                </label>
                <div className="accept-deals">

                <h6> GreenDefend</h6>
                <h6> اوافق علي ارسال اخر العروض من تطبيق </h6>
                </div>
                <label htmlFor="password">
                    <h5 className="field-name">كلمة المرور</h5>
                    <p  style={{display:`${passwordmsg?"block":"none"}`}} className="blurred-msg"> password should have at least 8 characters  </p>

                    <input onBlur={handlePasswordBlur} min={8} required={true} type="password" id='password' onChange={(e) => setData({ ...data, password: e.target.value })} />
                </label>

                <label htmlFor="passwordAgain">
                    <h5 className="field-name">كلمة المرور مرة اخري </h5>
                    <p style={{display:`${passwordAgainmsg?"block":"none"}`}} className="blurred-msg"> this field should be identical to the password field  </p>

                    <input onBlur={handlePasswordAgainBlur} min={8} required={true}  type="password" id='passwordAgain' onChange={(e) => setData({ ...data, passwordAgain: e.target.value })} />
                </label>
            </form>
                <button onClick={submitData} disabled={!data.username || !data.email || !isValidEmail(data.email) || data.password.length <8 || !data.passwordAgain || data.password != data.passwordAgain} className="login-button">انشاء حساب</button>
        </motion.div>
    );
};

export default Login