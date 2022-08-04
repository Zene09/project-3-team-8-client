import BlogIndex from "./blogs/BlogIndex"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)


	return (
		<>
			<h2 
				style={{
					textAlign: 'center',
					fontFamily: 'Times New Roman'
				}}
			> 
				Welcome to MMO & Co.
			</h2>
			<BlogIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
