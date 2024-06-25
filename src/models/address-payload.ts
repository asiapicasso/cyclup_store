import {
    // alias the core entity to not cause a naming conflict
    AddressPayload as MedusaAddressPayload,
} from "@medusajs/medusa"
import { Column, Entity } from "typeorm"

@Entity()
export class AddressPayload extends MedusaAddressPayload {
    @Column()
    delivery_info_residency: boolean
    @Column()
    delivery_info_access: boolean
}