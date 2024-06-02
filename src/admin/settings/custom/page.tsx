import type { SettingConfig, SettingProps } from "@medusajs/admin";
import { Button } from "@medusajs/ui";


const CustomSettingPage = ({
    notify,
}: SettingProps) => {

    const handleClick = () => {
        notify.success("Success", "You change the status of your online store. Don't forget to click once again to open it.")
    }

    /* https://docs.medusajs.com/ui/components/alert
    
    if currentStoreStatus = true {
        export function AlertDemo() {
  return <Alert variant="success">You are viewing Medusa docs.</Alert>
}

    } else {
        export function AlertDemo() {
  return <Alert variant="warning">You are viewing Medusa docs.</Alert>
}
    }
    */

    return (
        <div>
            <h1><b>Store Status Setting Page</b></h1>

            <Button
                variant="secondary"
                size="base"
                onClick={handleClick}
            >Validate changing status by click here.</Button>

            {/* <h1>Current Store Status is </h1> {currentStoreStatus}*/}
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