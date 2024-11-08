import React from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import {IUserData} from "../../models/IUser";
import {login, register} from "../../store/actionCreaotors/usesActionCreators";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {validationSchema} from '../../utils/validateSchema';

interface FormProps {
    isRegisterForm: boolean;
}

const PageForm: React.FC<FormProps> = ({ isRegisterForm }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: IUserData) => {
        if (isRegisterForm) {
            await dispatch(register(values));
        }
        await dispatch(login(values));

        navigate('/home');
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            maxWidth: 400,
                            margin: 'auto',
                            marginTop: '100px',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom>
                            {isRegisterForm ? 'Register' : 'Login'}
                        </Typography>
                        <Field
                            as={TextField}
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && <ErrorMessage name="username" />}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && <ErrorMessage name="password" />}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isRegisterForm ? 'Register' : 'Login'}
                        </Button>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography>
                                {isRegisterForm ? "Already have an account?" : "Don't have an account?"}
                            </Typography>
                            <Link to={isRegisterForm ? '/login' : '/register'}>
                                {isRegisterForm ? 'Please Login' : 'Please Register'}
                            </Link>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default PageForm;
