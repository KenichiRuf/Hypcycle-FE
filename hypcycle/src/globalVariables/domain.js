const domain = () => {
    if(process.env.ENVIRONMENT === "dev") {
        return "http://localhost:4000"
    } else if (process.env.ENVIRONMENT === "production") {
        return "https://hypcycle.herokuapp.com/"
    }
}

export default domain