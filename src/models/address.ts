import {
    // alias the core entity to not cause a naming conflict
    Address as MedusaAddress,
} from "@medusajs/medusa"
import { Column, Entity } from "typeorm"

@Entity()
export class Address extends MedusaAddress {
    @Column()
    delivery_info_residency: boolean
    @Column()
    delivery_info_access: boolean
}