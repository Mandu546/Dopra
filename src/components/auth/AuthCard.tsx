import LoginButton from './LoginButton';

const AuthCard = () => {
    return (
        <div className='auth-card'>
            <div className='auth-card__logo'>DOPRA</div>

            <h1>Welcome Back</h1>

            <p>Sign in securely using your Deriv account to access your dashboard, trading bots and portfolio.</p>

            <LoginButton />

            <div className='auth-card__footer'>OAuth 2.0 • PKCE • Secure Authentication</div>
        </div>
    );
};

export default AuthCard;
