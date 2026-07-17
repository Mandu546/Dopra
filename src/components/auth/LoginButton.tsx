import { useOauth2 } from '@/hooks/auth/useOauth2';

const LoginButton = () => {
    const { retriggerOAuth2Login, isSingleLoggingIn } = useOauth2();

    const handleLogin = async () => {
        await retriggerOAuth2Login();
    };

    return (
        <button className='dopra-login-btn' onClick={handleLogin} disabled={isSingleLoggingIn}>
            {isSingleLoggingIn ? 'Connecting...' : 'Login with Deriv'}
        </button>
    );
};

export default LoginButton;
