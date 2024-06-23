/* const addressRoutes = require("./address");

module.exports = (app) => {
    addressRoutes(app);
    // Autres routes...
}; */

// extend validator for custom fields on address while creating customer
import { registerOverriddenValidators } from "@medusajs/medusa";
import { StorePostCustomersCustomerAddressesReq as MedusaAdminPostAddressReq } from "@medusajs/medusa/dist/api/routes/store/customers/create-address";
import { IsBoolean } from "class-validator";

class StorePostCustomersCustomerAddressesReq extends MedusaAdminPostAddressReq {
    @IsBoolean()
    delivery_info_recidency: Boolean
    @IsBoolean()
    delivery_info_access: Boolean
}

registerOverriddenValidators(StorePostCustomersCustomerAddressesReq)
