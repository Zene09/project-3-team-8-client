import BlogIndex from "./blogs/BlogIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)


	return (
		<>
			<h2>Welcome to MMO & Co.</h2>
			<BlogIndex />
		</>
	)
}

export default Home
