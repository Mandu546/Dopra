import { AuthCard } from '@/components/auth';
import './login.scss';

const Login = () => {
    return (
        <div className='dopra-login'>
            <div className='dopra-login__background' />

            <AuthCard />
        </div>
    );
};

export default Login;
