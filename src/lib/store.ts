import { create } from 'zustand'
import data from '../../data.json'

interface Extension {
    logo: string
    name: string
    description: string
    isActive: boolean
}

interface ExtensionsStore {
    extensions: Extension[]
    loading: boolean
    error: string | null
    updateExtension(index: number, update: Partial<Extension>): void
    removeExtension(index: number): void
    fetchExtensions(): void
}

export const useExtensionsStore = create<ExtensionsStore>((set) => ({
    extensions: [],
    loading: false,
    error: null,
    updateExtension: (index, update) => {
        set(({ extensions }) => {
            if (index < 0 || index > extensions.length) {
                return {}
            }

            extensions[index] = { ...extensions[index], ...update }
            return { extensions }
        })
    },
    removeExtension: (index) => {
        set(({ extensions }) => {
            if (index < 0 || index > extensions.length) {
                return {}
            }

            extensions = extensions.filter((_, i) => i != index)
            return { extensions }
        })
    },
    fetchExtensions: () => {
        set({ extensions: data, loading: false, error: null })
    },
}))
