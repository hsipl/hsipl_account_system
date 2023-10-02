

class publicController {
    homePage = async (req, res) => {
        try {
            res.send(
                '<a href="/auth/google">Authenticate with Google</a>'
            )

        }
        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }
}


module.exports = new publicController()