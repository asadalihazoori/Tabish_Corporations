import { Component } from 'react';

export default class SaleAPI extends Component {

    static createOrder(customer_id, products) {
        return fetch(`http://3.1.62.217:8069/getSaleOrder/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "params": {
                    "partner_id": customer_id,
                    "longitude": "33",
                    "latiitude": "73",
                    "user_id": 2,
                    "products": products
                    //  [{
                    //     "product_id": 1,
                    //     "qty": 10.00,
                    //     "price_unit": 50.50
                    // }, {
                    //     "product_id": 2,
                    //     "qty": 11.00,
                    //     "price_unit": 30.50
                    // }]
                }
            }),
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => {
                return error;

            });
    }
}