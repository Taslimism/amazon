import axios from 'axios'
import { Button } from '@mantine/core'

const hostname = window.location.hostname
const orderUrl =
    hostname === 'localhost'
        ? `http://localhost:5001/api/order/`
        : `https://b-okstore.herokuapp.com/api/order/`

const loadRazorPay = () => {
    return new Promise((resolve) => {
        let script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.getElementById('root').appendChild(script)
    })
}

const PaymentButton = (props) => {
    const token = localStorage.getItem('etoken')
    const user_id = localStorage.getItem('euserid')

    const onSuccess = async (rzp_data, orderId) => {
        try {
            await axios.put(
                `${orderUrl}${orderId}`,
                {
                    rzp_data: rzp_data,
                    user_id: user_id,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            window.location = '/profile'
        } catch (err) {
            console.log(err)
        }
    }

    async function initiatePayment() {
        const res = await loadRazorPay()
        if (!res) {
            alert('Are you online?')
            return
        }

        await axios
            .post(
                `${orderUrl}`,
                { user_id: `${user_id}` },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(({ data }) => {
                const orderID = data.rzpOrderId
                const options = {
                    key: 'rzp_test_fLfxyjOtQ0SrZW',
                    amount: data.amount,
                    currency: data.currency,
                    order_id: data.rzpOrderId,
                    name: 'bookshelf',
                    image: 'https://b-ookstore.web.app/images/icon-bookshelf.png',
                    description: 'Buy books of your favorite authors',
                    theme: {
                        color: '#010f29',
                    },
                    // modal: {
                    //     ondismiss: paymentHandlers.onDismiss || (() => { }),
                    //     escape: false,
                    // },
                    // handler: response => {
                    //     paymentHandlers.onSuccess &&
                    //         paymentHandlers.onSuccess({
                    //             ...response,
                    //             id: res.orderId,
                    //             amount: res.amount,
                    //             currency: res.currency,
                    //         });
                    // },
                    handler: function (response) {
                        onSuccess(
                            {
                                razorpay_payment_id:
                                    response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            orderID
                        )
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                    },
                }
                const rzp1 = new window.Razorpay(options)
                rzp1.open()
            })
    }

    return (
        <Button color="red" onClick={initiatePayment}>
            {props.text}
        </Button>
    )
}

export default PaymentButton
