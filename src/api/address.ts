const { Router } = require("express");
const middlewares = require("../../middlewares");

const route = Router();

module.exports = (app) => {
    app.use("/addresses", route);

    route.post(
        "/update/:id",
        middlewares.wrap(async (req, res) => {
            const { id } = req.params;
            const { delivery_info_residency, delivery_info_access } = req.body;

            const addressService = req.scope.resolve("addressService");

            try {
                const updatedAddress = await addressService.updateAddress(id, {
                    delivery_info_residency,
                    delivery_info_access,
                });
                res.status(200).json({ address: updatedAddress });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        })
    );

    return app;
};
