import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useExtensionsStore } from './lib/store'

type activeFilter = 'all' | 'active' | 'inactive'

function App() {
    // eslint-disable-next-line
    const { extensions, fetchExtensions, updateExtension, removeExtension } =
        useExtensionsStore()

    const [currentActiveFilter, setCurrentActiveFilter] = useState<activeFilter>('all')
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
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {['all', 'active', 'inactive'].map((v) => (
                    <div key={v}>
                        <button
                            type="button"
                            onClick={() => {
                                setCurrentActiveFilter(v as activeFilter)
                            }}
                            style={{
                                backgroundColor:
                                    currentActiveFilter == v ? 'red' : '',
                            }}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                    </div>
                ))}
            </div>

            {filteredExtensions.map((v, i) => (
                <div key={v.name} style={{ paddingBottom: '20px' }}>
                    <img src={v.logo}></img>
                    <br></br>
                    {v.name}
                    <br></br>
                    {v.description}
                    <br></br>
                    {v.isActive ? 'active' : 'not active'}
                    <button
                        type="button"
                        onClick={() => {
                            removeExtension(i)
                        }}
                    >
                        remove
                    </button>
                    <input
                        type="checkbox"
                        checked={v.isActive}
                        onChange={(event) => {
                            updateExtension(i, {isActive: event.target.checked})
                        }}
                    />
                </div>
            ))}
            <br></br>
        </div>
    )
}

export default App
