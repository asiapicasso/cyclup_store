// src/custom-routes.js
const { Router } = require('express');
const { Address } = require('@medusajs/medusa/dist/models/address');

const router = Router();

router.post('/update-address', async (req, res) => {
    const { addressId, delivery_info_recidency, delivery_info_access } = req.body;

    try {
        // Met à jour l'adresse avec les nouvelles valeurs
        await Address.update(
            { delivery_info_recidency, delivery_info_access },
            { where: { id: addressId } }
        );
        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
