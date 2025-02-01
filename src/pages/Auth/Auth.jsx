import { useState } from 'react';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../api/auth'
import { validateName, validateMobile, validatePassword, validateEmail } from '../../utils/validation';
import { useToast } from '../../context/ToastContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { showToast } = useToast();


    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setErrors({});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = validateEmail(email);
        }

        if (!validatePassword(password)) {
            newErrors.password = validatePassword(password);
        }

        if (!isLogin) {
            if (validateName(name)) {
                newErrors.name = validateName(name);
            }

            if (validateMobile(mobile)) {
                newErrors.mobile = validateMobile(mobile);
            }

            if (password !== confirmPassword) {
                newErrors.confirmPassword = "Passwords don't match!";
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            if (isLogin) {
                const response = await signin({ email, password })

                localStorage.setItem('token', response.token);
                if (response.success) {
                    showToast("Login successful!", "success");
                    navigate('/dashboard');
                }
            } else {
                if (password !== confirmPassword) {
                    alert("Passwords don't match!");
                    return;
                }

                const response = await signup({ email, password, confirmPassword, name, mobile })
                navigate('/');
                window.location.reload();
            }

        } catch (error) {
            console.error('Auth error:', error);
        }

        setEmail("");
        setPassword("");
    }

    const handleLogin = () => {
        setIsLogin(true)
    }

    const handleSignup = () => {
        setIsLogin(false)
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.imgContainer}>
                <img src="../auth.svg" alt="Auth Image" className={styles.authImage} />
            </div>
            <div className={styles.container}>

                <div className={styles.formContainer}>

                    <div className={styles.buttonContainer}>
                        <button className={styles.signUpButton} onClick={handleSignup}>SignUp</button>
                        <button className={styles.loginButton} onClick={handleLogin}>Login</button>
                    </div>


                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2>{isLogin ? 'Login' : 'Join Us Today!'}</h2>

                        {!isLogin && (
                            <div className={styles.formItem}>
                                <input
                                    type="text"
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder='Name'
                                ></input>
                                {errors.name && <p className={styles.error}>{errors.name}</p>}
                            </div>
                        )}

                        <div className={styles.formItem}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email ID"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></input>
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>

                        {!isLogin && (
                            <div className={styles.formItem}>
                                <input
                                    type="mobile"
                                    name="mobile"
                                    placeholder="Mobile No"
                                    label="Mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                ></input>
                                {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
                            </div>

                        )}


                        <div className={styles.formItem}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></input>
                            {errors.password && <p className={styles.error}>{errors.password}</p>}
                        </div>

                        {!isLogin && (
                            <div className={styles.formItem}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Confirm Password"
                                    label="Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                ></input>
                                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                            </div>
                        )}

                        <div className={styles.formItem}>
                            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                        </div>

                        <p>
                            {isLogin ?
                                "Don't have an account? " :
                                "Already have an account? "}
                            <a onClick={handleToggleForm}>
                                {isLogin ? 'Register now' : 'Login'}
                            </a>
                        </p>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Auth;