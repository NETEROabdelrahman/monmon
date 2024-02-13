import { motion } from "framer-motion";
import { useState } from "react";
import PinInput from 'react-pin-input';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    return (
        <motion.div className="login-page" exit={{ x: '-100vw' }} initial={{ x: '100vw' }} animate={{ x: 0 }} transition={{ ease: 'easeInOut' }}>
            <h1>
                انشاء حساب جديد
            </h1>
            <h6>ادخل الرمز المرسل الي البريد الالكتروني</h6>
            <PinInput
                length={4}
                secret
                secretDelay={100}
                type="numeric"
                inputMode="numeric"
                style={{ padding: '15px',display:"flex", width:"100%", justifyContent: "space-evenly" }}
                inputStyle={{ borderColor: '#b9a4a4', width:"100px", height:"100px" }}
                inputFocusStyle={{ borderColor: 'green' }}
                onChange={(value) => {
                    if (value.length == 4) {
                        setIsDisabled(false)
                    } else {
                        setIsDisabled(true)
                    }
                }}

                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
            <div>
                <h6>2.45</h6>
                <h6>  اعد ارسال الرمز التعريفي</h6>
            </div>
            <button disabled={isDisabled} onClick={()=>navigate("/success")} className="login-button"> ارسال</button>

        </motion.div>
    );
}

export default Login