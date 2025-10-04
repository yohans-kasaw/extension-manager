import { create } from 'zustand'
import data from '../../data.json'
import { persist } from 'zustand/middleware'

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
    updateExtension(name: string, update: Partial<Extension>): void
    removeExtension(name: string): void
    fetchExtensions(): void
}

interface ThemeStore {
    theme: 'dark' | 'light'
    toggleTheme(): void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: 'dark',
            toggleTheme: () => {
                set(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light',
                }))
            },
        }),
        { name: 'theme' },
    ),
)

export const useExtensionsStore = create<ExtensionsStore>((set) => ({
    extensions: [],
    loading: false,
    error: null,
    updateExtension: (name, update) => {
        set(({ extensions }) => {
            return {
                extensions: extensions.map((v) => {
                    if (v.name == name) {
                        return { ...v, ...update }
                    }
                    return v
                }),
            }
        })
    },

    removeExtension: (name) => {
        set(({ extensions }) => {
            return { extensions: extensions.filter((v) => v.name !== name) }
        })
    },
    fetchExtensions: () => {
        set({ extensions: data, loading: false, error: null })
    },
}))
