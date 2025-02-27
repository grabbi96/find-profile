import React, { useCallback } from 'react';
import { css, cx } from '@emotion/css';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Button, { ButtonType } from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';
import Input, { InputType } from '../../components/common/Input';
import { PostData } from '../../Utils/fetchData';
import { useRouter } from 'next/router';


export const SectionContainer = css`
    display: flex;
`;

export const FormSection = css`
    width: 821px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 60px 0;
`;

export const SocialBtnContainer = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 24px 0;
    margin: 35px 0;
`;

export const FormWrap = css`
    width: 488px;
    position: relative;
`;

export const Divider = css`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #3f4753;
    justify-content: center;
    background: #fff;
    padding: 10px 30px;
    &:before {
        height: 1px;
        background: #cfd1d4;
        content: '';
        width: 100%;
        position: absolute;
    }
`;

export const DividerText = css`
    background: white;
    display: inline-block;
    padding: 5px 20px;
    z-index: 99;
`;

export const RowGap = css`
    margin-top: 30px;
`;

export const FlexItem = css`
    display: flex;
`;

export const JustifyCenter = css`
    justify-content: center;
`;

export const CheckboxContainer = css`
    display: flex;
`;

const ColoredLink = css`
    color: #2255f7;
`;

export const ImageContainer = css`
    background: url(https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80);
    background-size: cover;
    background-repeat: no-repeat;
    width: calc(100% - 821px);
`;
const errorMessage = css`
color: #F04848;
padding-top: 4px;
padding-bottom: 4px;

`;


const SignupPage: React.FC<{}> = () => {
    const router = useRouter()

    const SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .trim().matches(/^\S*$/, "username must not contain space.")
            .required('UserName required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const createNewUser = useCallback(async (newUser: { userName: string, email: string, password: string }) => {
        try {
            const res: any = await PostData('/api/users/add', JSON.stringify(newUser))
            if (res?.error) throw res?.error
            console.log(res);
            alert("user created")
            router.push('/auth/verify-email?email=' + newUser?.email);

        } catch (e) {
            console.error(e);
            alert(JSON.stringify(e))
        }

    }, [])

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            acceptTerms: false,
        },
        validationSchema: SignupSchema,
        onSubmit: (val) => {
            console.log("submit val", val);
            createNewUser({ userName: val.userName, email: val.email, password: val.password })

        },
    });

    const { handleChange, errors, values } = formik;

    return (
        <div className={cx(SectionContainer)}>
            <div className={cx(FormSection)}>
                <div className={cx(FormWrap)}>
                    <SectionMetaInfo
                        label="Let's partner up"
                        description="Let's level up your digital profile, together."
                    />
                    <div className={cx(SocialBtnContainer)}>
                        <Button
                            type={ButtonType.SECONDARY}
                            label='Signup with Google'
                            icon='/images/auth/Google Logo.png'
                        />
                        <Button
                            type={ButtonType.SECONDARY}
                            label='Signup with Github'
                            icon='/images/auth/GitHub-Mark-ai 1.png'
                        />
                    </div>
                    <div className={cx(Divider)}>
                        <span className={cx(DividerText)}>or</span>
                    </div>
                    <div>
                        <FormikProvider value={formik}>
                            <Form>
                                <div className={cx(RowGap)}>
                                    <Input
                                        label='User Name'
                                        placeholder='User name'
                                        name='userName'
                                        value={values.userName}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        errorMessage={errors.userName}
                                    />
                                </div>
                                <div className={cx(RowGap)}>
                                    <Input
                                        label='Email'
                                        placeholder='Enter your email'
                                        name='email'
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        errorMessage={errors.email}
                                    />
                                </div>
                                <div className={cx(RowGap)}>
                                    <Input
                                        label='Password'
                                        placeholder='Password'
                                        type={InputType.PASSWORD}
                                        name='password'
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </div>
                                <div className={cx([RowGap, FlexItem])}>
                                    <div className={cx([CheckboxContainer])}>
                                        <Input
                                            label='agree'
                                            type={InputType.CHECKBOX}
                                            name='acceptTerms'
                                            value={values.acceptTerms}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                        />
                                    </div>
                                    <label htmlFor='agreeToTerms'>
                                        I agree to the
                                        <span className={cx(ColoredLink)}>

                                            Terms and conditions
                                        </span>
                                        and <span className={cx(ColoredLink)}> Privacy policy</span>
                                    </label>

                                </div>
                                {errors.acceptTerms && <div className={cx(errorMessage)}>
                                    <span>{errors.acceptTerms}</span>
                                </div>}
                                <div className={cx([RowGap])}>
                                    <Button
                                        type={ButtonType.PRIMARY}
                                        label='Create your account'
                                        actionType='submit'
                                    />
                                </div>
                                <div className={cx([RowGap, FlexItem, JustifyCenter])}>
                                    <Button
                                        type={ButtonType.GHOST}
                                        label='Already a member?'
                                        labelWithLink='Login'
                                        actionType='button'
                                    />
                                </div>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </div>
            <div className={cx(ImageContainer)} />
        </div>
    );
};

export default SignupPage;
