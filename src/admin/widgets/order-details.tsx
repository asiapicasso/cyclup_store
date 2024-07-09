import type {
    OrderDetailsWidgetProps, WidgetConfig
} from "@medusajs/admin"


const OrderWidget = ({
    order,
}: OrderDetailsWidgetProps) => {
    return (
        <div className="gap-y-base flex h-full flex-col">
            <div className="rounded-rounded bg-grey-0 border-grey-20 flex w-full flex-col overflow-hidden border h-auto min-h-0">
                <div className="flex grow flex-col">
                    <div className="px-xlarge py-large">
                        <div className="flex items-start justify-between">
                            <h1 className="inter-xlarge-semibold text-grey-90 active:text-violet-90 flex cursor-pointer items-center gap-x-2" >Shipping Informations</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col grow">
                    <div className="px-xlarge">
                        <div className="mt-6">
                            <div className="flex space-x-6 divide-x">
                                <div className="flex flex-col">
                                    <div className="inter-small-regular text-grey-50 mb-1"> Customer
                                        <div className="text-grey-90 active:text-violet-90 flex cursor-pointer items-center gap-x-1">
                                            <div className="inter-small-regular flex flex-col">{order.shipping_address.first_name} {order.shipping_address.last_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col pl-6">
                                    <div className="inter-small-regular text-grey-50 mb-1"> Address
                                        <div className="text-grey-90 active:text-violet-90 flex cursor-pointer items-center gap-x-1">
                                            <div className="inter-small-regular flex flex-col">
                                                {order.shipping_address.address_1}, {order.shipping_address.address_2}
                                                <br />
                                                {order.shipping_address.postal_code} {order.shipping_address.city}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col pl-6">
                                    <div className="inter-small-regular text-grey-50 mb-1"> Delivery Info
                                        <div className="text-grey-90 active:text-violet-90 flex cursor-pointer items-center gap-x-1">
                                            <div className="inter-small-regular flex flex-col">
                                                Residency : {order.shipping_address.delivery_info_residency}
                                                <br />
                                                Access : {order.shipping_address.delivery_info_access}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> </div>
                <div className="min-h-12"> </div>
            </div>
            <div className="min-h-6"> </div>
        </div>



    )
}

export const config: WidgetConfig = {
    zone: "order.details.before",
}

export default OrderWidget

