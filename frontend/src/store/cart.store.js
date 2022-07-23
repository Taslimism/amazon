import create from 'zustand'
import axios from 'axios'

const useCartStore = create((set) => ({
    quantity: 0,
    cart: [],
    addToCart: async (url, body) => {
        const {
            data: { data },
        } = await axios.post(url, body)
        set({ quantity: data.totalQuantity })
        return data
    },
    getCartItems: async (url) => {
        const {
            data: { data },
        } = await axios.get(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('etoken')}`,
            },
        })
        set({ cart: [...data.cart] })
        return data.cart
    },
    updateCart: async (url, body) => {
        const {
            data: { data },
        } = await axios.put(url, body)
        // set({ cart: [...data.cart] })
        set({ quantity: data.quantity })
        return data
    },
    deleteCart: async (url) => {
        const { data } = await axios.delete(url)
        set((state) => ({ quantity: state.quantity - 1 }))
        console.log(data)
        return data
    },
    clearCart: () => {
        set({ quantity: 0 })
    },
}))

export default useCartStore
