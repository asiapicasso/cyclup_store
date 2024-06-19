import { Entity, Column } from "typeorm";
import { Address as MedusaAddress } from "@medusajs/medusa/dist/models/address";

@Entity()
export class Address extends MedusaAddress {
    @Column({ type: "boolean", nullable: true })
    delivery_info_residency: boolean;

    @Column({ type: "boolean", nullable: true })
    delivery_info_access: boolean;
}
