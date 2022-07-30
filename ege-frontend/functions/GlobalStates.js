import { createContext } from "react";

const ActiveProfileContext = createContext(null)
const TranscriptCacheContext = createContext(null);
const GradesCacheContext = createContext(null);
const WeeklyScheduleCacheContext = createContext(null);
const RetriveFunctionContext = createContext(() => { });

const ContextProvider = ({ activeProfileState, transcriptCacheState, gradesCacheState, weeklyScheduleCacheState, RetriveFunction, children }) => {
    return (
        <ActiveProfileContext.Provider value={activeProfileState}>
            <TranscriptCacheContext.Provider value={transcriptCacheState}>
                <GradesCacheContext.Provider value={gradesCacheState}>
                    <WeeklyScheduleCacheContext.Provider value={weeklyScheduleCacheState}>
                        <RetriveFunctionContext.Provider value={RetriveFunction}>

                            {children}
                        </RetriveFunctionContext.Provider>
                    </WeeklyScheduleCacheContext.Provider>
                </GradesCacheContext.Provider>
            </TranscriptCacheContext.Provider>
        </ActiveProfileContext.Provider>
    )
}

export {
    ActiveProfileContext,
    TranscriptCacheContext,
    GradesCacheContext,
    WeeklyScheduleCacheContext,
    RetriveFunctionContext,
    ContextProvider
};