const domain = () => {
    if(process.env.ENVIRONMENT === "dev") {
        return "http://localhost:4000"
    } else if (process.env.ENVIRONMENT === "production") {
        return "https://app.hypcycle.com"
    }
}

export default domain