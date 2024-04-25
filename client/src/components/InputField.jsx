const InputField = ({ label, id, name, type = "text", onChange, value, autoFocus = false }) => {
	return (
		<div>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<input
				className='mt-1 p-2 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300'
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				autoFocus={autoFocus}
			/>
		</div>
	);
};

export default InputField;