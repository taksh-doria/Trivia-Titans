import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import { useEffect, useState } from 'react';
import { logout } from '../Services/UserPool';

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    }, [])

    return (
        <div className='header-bg'>
            <p className='header-logo' onClick={() => navigate('/home')}>TRIVIA TITANS</p>
            <div className='header-menu'>
                {
                    isLoggedIn ?
                        <p className='header-menu-item'>GAMES</p>
                        :
                        null
                }
            </div>
            <div className="header-menu-right">
                {
                    isLoggedIn ?
                        <>
                            <UserOutlined className='header-menu-icon' onClick={() => navigate("/profile")} />
                            <p className='header-menu-item' onClick={async () => {
                                localStorage.clear();
                                setIsLoggedIn(false);
                                navigate("/")
                                logout()
                            }}>Logout</p>
                        </>
                        :
                        // <a className='header-logo' href='https://triviatitans.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=6hn9vmanqlt905sa1n0skc8ql6&redirect_uri=http%3A%2F%2Flocalhost%3A3000' onClick={() => navigate('/logout')}>Login</a>
                        // <a className='header-logo' href='https://triviatitans.auth.us-east-1.amazoncognito.com/login?client_id=6hn9vmanqlt905sa1n0skc8ql6&response_type=token&scope=email+profile+aws.cognito.signin.user.admin+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000' onClick={() => navigate('/logout')}>Login</a>
                        <a className='header-logo' href='https://triviatitans.auth.us-east-1.amazoncognito.com/login?client_id=6hn9vmanqlt905sa1n0skc8ql6&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000' onClick={() => navigate('/logout')}>Login</a>
                }
            </div>
        </div>
    );
}

export default Header;