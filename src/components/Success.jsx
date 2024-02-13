import { motion } from "framer-motion";

const Success = () => {
    return (
        <motion.div className="success" exit={{ x: '-100vw' }} initial={{ x: '100vw' }} animate={{ x: 0 }} transition={{ ease: 'easeInOut' }}>
            <img src="/427817645_357206207237434_5100119133933855191_n.jpg" alt="" />
            <h1>تم انشاء حساب بنجاح</h1>
            <h5>يمكنك تصفح التطبيق الان مع اخر العروض والخصومات</h5>
            <button className="login-button"> البدء الان</button>

        </motion.div>
    );
}

export default Success