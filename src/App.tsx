import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useExtensionsStore } from './lib/store'
import { Button } from '@/components/ui/button'
import { Switch } from './components/ui/switch'
import {
    Card,
    CardFooter,
    CardTitle,
    CardDescription,
    CardHeader,
} from '@/components/ui/card'

type activeFilter = 'all' | 'active' | 'inactive'

function App() {
    // eslint-disable-next-line
    const { extensions, fetchExtensions, updateExtension, removeExtension } =
        useExtensionsStore()

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

    return (
        <div className="w-3/4 m-auto max-w-[100rem]">
            <div className="flex justify-between flex-wrap px-16 py-4">
                <div className="text-amber-50">Extensions List</div>
                <div className="flex gap-2">
                    {['all', 'active', 'inactive'].map((v) => (
                        <div key={v}>
                            <Button
                                className="rounded-4xl"
                                onClick={() => {
                                    setCurrentActiveFilter(v as activeFilter)
                                }}
                                style={{
                                    backgroundColor:
                                        currentActiveFilter == v ? 'red' : '',
                                }}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {filteredExtensions.map((v, i) => (
                    <Card key={v.name} className="min-w-[30rem]">
                        <CardHeader className="flex">
                            <img src={v.logo} width="50rem"></img>
                            <div className="pl-2">
                                <CardTitle>{v.name}</CardTitle>
                                <CardDescription className="pt-2">
                                    {v.description}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-between pt-4">
                            <Button
                                className="rounded-4xl"
                                onClick={() => {
                                    removeExtension(i)
                                }}
                            >
                                remove
                            </Button>
                            <Switch
                                checked={v.isActive}
                                onCheckedChange={(isActive) => {
                                    updateExtension(i, { isActive })
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
