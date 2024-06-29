import { useCart } from "medusa-react";

const Cart = () => {
    // ...

    const { updateCart } = useCart()

    const addShippingAddress = (address: {
        company: string,
        first_name: string,
        last_name: string,
        address_1: string,
        address_2: string,
        city: string,
        country_code: string,
        province: string,
        postal_code: string,
        phone: string,
        delivery_info_residency: boolean,
        delivery_info_access: boolean,
    }) => {
        updateCart.mutate({
            shipping_address: {
                company: address.company,
                first_name: address.first_name,
                last_name: address.last_name,
                address_1: address.address_1,
                address_2: address.address_2,
                city: address.city,
                country_code: address.country_code,
                province: address.province,
                postal_code: address.postal_code,
                phone: address.phone,
                delivery_info_residency: address.delivery_info_residency,
                delivery_info_access: address.delivery_info_access,
            },
        });
    }


    // ...
}

export default Cart