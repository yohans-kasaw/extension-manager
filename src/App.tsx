import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useExtensionsStore, useThemeStore } from '@/lib/store'
import logoWhite from '@/assets/images/logo-white.svg'
import logo from '@/assets/images/logo.svg'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
    Card,
    CardFooter,
    CardTitle,
    CardDescription,
    CardHeader,
} from '@/components/ui/card'
import { MoonIcon, SunIcon } from 'lucide-react'

type activeFilter = 'all' | 'active' | 'inactive'

function App() {
    // eslint-disable-next-line
    const { extensions, fetchExtensions, updateExtension, removeExtension } =
        useExtensionsStore()

    // eslint-disable-next-line
    const { theme, toggleTheme } = useThemeStore()

    const [currentActiveFilter, setCurrentActiveFilter] =
        useState<activeFilter>('all')
    const filteredExtensions = useMemo(() => {
        if (currentActiveFilter == 'all') return extensions
        return extensions.filter(
            (v) => v.isActive == (currentActiveFilter === 'active'),
        )
    }, [currentActiveFilter, extensions])

    useEffect(() => {
        fetchExtensions()
    }, [fetchExtensions])

    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(theme)
    }, [theme])

    return (
        <div className={'w-3/4 m-auto max-w-[100rem] pt-4'}>
            <Card className="my-1 p-2">
                <CardHeader className="flex justify-between m-1 p-1">
                    <div>
                        <img
                            src={theme == 'dark' ? logoWhite : logo}
                            width="160rem"
                            style={{ fill: 'white', stroke: 'none' }}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-xl"
                        onClick={() => {
                            toggleTheme()
                        }}
                    >
                        {theme == 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </CardHeader>
            </Card>
            <div className="flex  justify-center gap-6 sm:justify-between flex-wrap py-8">
                <div className="text-2xl font-bold">
                    Extensions List
                </div>
                <div className="flex gap-2">
                    {['all', 'active', 'inactive'].map((v) => (
                        <div key={v}>
                            <Button
                                variant="outline"
                                className={`rounded-4xl ${currentActiveFilter === v ? (theme === 'light' ? 'active-button text-white' : 'active-button text-black') : ''}`}
                                onClick={() => {
                                    setCurrentActiveFilter(v as activeFilter)
                                }}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExtensions.map((v) => (
                    <Card key={v.name} className="min-w-[20rem]">
                        <CardHeader className="flex">
                            <img src={v.logo} width="50rem"></img>
                            <div className="pl-2">
                                <CardTitle className='text-xl'>{v.name}</CardTitle>
                                <CardDescription className="pt-2 text-lg">
                                    {v.description}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-between pt-4">
                            <Button
                                className="rounded-4xl"
                                variant="outline"
                                onClick={() => {
                                    removeExtension(v.name)
                                }}
                            >
                                Remove
                            </Button>
                            <Switch
                                checked={v.isActive}
                                onCheckedChange={(isActive) => {
                                    setTimeout(()=>{

                                    updateExtension(v.name, { isActive })
                                    },100)
                                }}
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <br></br>
        </div>
    )
}

export default App
