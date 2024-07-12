class NotFoundController {
    // méthodes appellées par le routeur
    index = (req, res) => {
        return res.send("not found -GET");
    };
}
export default NotFoundController;
