import type { SettingConfig, SettingProps } from "@medusajs/admin";
import { Button } from "@medusajs/ui";


const CustomSettingPage = ({
    notify,
}: SettingProps) => {

    const handleClick = () => {
        notify.success("Success", "You close the online store. Don't forget to click to open it.")
    }

    return (
        <div>
            <h1><b>Store Status Setting Page</b></h1>
            <Button
                variant="secondary"
                size="base"
                onClick={handleClick}
            >Validate changing status by click here.</Button>
            <p>Current status is : /flagOfTheStoreStatus/</p>
        </div>
    )
}

export const config: SettingConfig = {
    card: {
        label: "Close the online store",
        description: "Manage your store status",
    },
}


export default CustomSettingPage