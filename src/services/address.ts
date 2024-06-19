import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { Address } from "../models/custom-address"; // Assurez-vous que le chemin est correct
import { MedusaError } from "@medusajs/utils";

class AddressService extends TransactionBaseService {
    constructor({ manager }) {
        super(arguments[0]);
        this.manager_ = manager;
    }

    async updateAddress(
        id: string,
        data: { delivery_info_residency: boolean; delivery_info_access: boolean }
    ): Promise<Address> {
        return this.atomicPhase_(async (manager: EntityManager) => {
            const addressRepo = manager.getRepository(Address);
            const address = await addressRepo.findOne({ where: { id } });

            if (!address) {
                throw new MedusaError(MedusaError.Types.NOT_FOUND, "Address not found");
            }

            address.delivery_info_residency = data.delivery_info_residency;
            address.delivery_info_access = data.delivery_info_access;

            return addressRepo.save(address);
        });
    }
}

export default AddressService;
