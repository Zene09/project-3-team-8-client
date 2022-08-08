import BlogIndex from "./blogs/BlogIndex"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)


	return (
		<>
			<h2
				style={{
					textAlign: 'center',
					fontFamily: 'Cinzel, serif'
				}}
			>
				Welcome, to Massive Multiblogger Online
			</h2>
			<BlogIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home