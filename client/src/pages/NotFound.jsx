const NotFound = () => {
	return (
		<section>
			<div className=' text-white'>
				<div className='flex h-screen'>
					<div className='m-auto text-center'>
						<p className='font-bold sm:text-5xl text-base'>
							OOPS! PAGE NOT FOUND
						</p>
            <div className="my-8">
              <img src='/404.gif' alt='404' />
            </div>
						<a href='/' className="underline hover:text-green-500 duration-300">Take me home</a>
					</div>
				</div>
			</div>
		</section>
	);
};
export default NotFound;