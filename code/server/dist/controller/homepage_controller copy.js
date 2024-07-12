class HomepageController {
    // méthodes appellées par le routeur
    index = (req, res) => {
        return res.send("homepage controller");
    };
}
export default HomepageController;
