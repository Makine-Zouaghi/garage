class NotFoundController {
    // méthodes appellées par le routeur
    index = (req, res) => {
        return res.status(404).json({
            status: 404,
            message: "Not found",
        });
    };
}
export default NotFoundController;
