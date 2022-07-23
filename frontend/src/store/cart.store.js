import create from 'zustand'
import axios from 'axios'

const useCartStore = create((set) => ({
    quantity: 0,
    addToCart: async (url, body) => {
        const { data } = await axios.post(url, body)
        return data.data
    },
}))

export default useCartStore
