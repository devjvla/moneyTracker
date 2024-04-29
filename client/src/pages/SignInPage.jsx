import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

/* GraphQL */
import { useMutation } from "@apollo/client";
import { USER_SIGNIN } from "../graphql/mutations/user.mutation";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const LoginPage = () => {
	const [signInData, setSignInData] = useState({
		email_address: "dev.jvla@gmail.com",
		password: "123!@#qweQWE",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignInData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const [signIn, { loading }] = useMutation(USER_SIGNIN, {
		refetchQueries: ["GetAuthenticatedUser"],
	})

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(signInData);

		try {
			await signIn({ variables: { input: signInData }});
		} catch (error) {
			console.log("Client | Sign In: ", error);
			toast.error(error.message);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
					<div className='max-w-md w-full p-6'>
						<h1 className='text-3xl font-semibold mb-6 text-green-500 text-center'>moneyTracker</h1>
						<h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
							Welcome back! Log in to your account
						</h1>
						<form className='space-y-4' onSubmit={handleSubmit}>
							<InputField
								label='Email Address'
								id='email_address'
								name='email_address'
								value={signInData.email_address}
                autoFocus={true}
								onChange={handleChange}
							/>

							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={signInData.password}
								onChange={handleChange}
							/>
              
              <SubmitButton text="Sign In" isLoading={loading} />
						</form>
						<div className='mt-4 text-sm text-gray-600 text-center'>
							<p>
								{"Don't"} have an account?{" "}
								<Link to='/signup' className='text-black hover:underline'>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;