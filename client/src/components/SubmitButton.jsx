const SubmitButton = ({ text = "Submit", isLoading }) => {
  return (
    <button
      type='submit'
      className='w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={isLoading}
    >
      { isLoading ? "Loading..." : text }
    </button>
  )
}

export default SubmitButton;