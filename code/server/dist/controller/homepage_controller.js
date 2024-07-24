class HomepageController {
    // méthodes appellées par le routeur
    index = (req, res) => {
        return res.status(200).json({
            status: 200,
            message: "Garage API",
        });
    };
}
export default HomepageController;
