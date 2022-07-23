import create from 'zustand'

const useUserStore = create((set) => ({
    userId: '',
}))

export default useUserStore
