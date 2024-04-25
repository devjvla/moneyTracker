import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

/* GraphQL */
import { useMutation } from "@apollo/client";
import { userSignUp } from "../graphql/mutations/user.mutation";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignUpPage = () => {
	const [signUpData, setSignUpData] = useState({
		first_name: "",
		last_name: "",
		email_address: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value, type } = e.target;

		if (type === "radio") {
			setSignUpData((prevData) => ({
				...prevData,
				gender: value,
			}));
		} else {
			setSignUpData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};
	
	const [signUp, { loading }] = useMutation(userSignUp, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(signUpData);

		try {
			await signUp({
				variables: {
					input: signUpData
				}
			})
		} catch (error) {
			console.log("Client | Sign Up: ", error);
			toast.error(error.message);
		}
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center'>
					<div className='max-w-md w-full p-6'>
						<h1 className='text-3xl font-semibold mb-6 text-green-500 text-center'>moneyTracker</h1>
						<h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
							Create an account to start tracking your money!
						</h1>
						<form className='space-y-4' onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <InputField
                  label='First Name'
                  id='first_name'
                  name='first_name'
                  value={signUpData.first_name}
                  autoFocus={true}
                  onChange={handleChange}
                />
                <InputField
                  label='Last Name'
                  id='last_name'
                  name='last_name'
                  value={signUpData.last_name}
                  onChange={handleChange}
                />
              </div>

							<InputField
								label='Email Address'
								id='email_address'
								name='email_address'
								value={signUpData.email_address}
								onChange={handleChange}
							/>

							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={signUpData.password}
								onChange={handleChange}
							/>
              
              <SubmitButton text="Sign Up" isLoading={loading} />
						</form>
						<div className='mt-4 text-sm text-gray-600 text-center'>
							<p>
								Already have an account?{" "}
								<Link to='/signin' className='text-black hover:underline'>
									Sign in here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;