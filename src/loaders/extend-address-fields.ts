export default async function () {
    const imports = (await import(
        "@medusajs/medusa/dist/api/routes/store/customers/index"
    )) as any

    /* ou address. ou changer le StoreAddressFields */

    imports.allowedStoreCustomersFields = [
        ...imports.allowedStoreCustomersFields,
        "delivery_info_residency",
        "delivery_info_access",
    ]
    imports.defaultStoreCustomersFields = [
        ...imports.defaultStoreCustomersFields,
        "delivery_info_residency",
        "delivery_info_access",
    ]
}