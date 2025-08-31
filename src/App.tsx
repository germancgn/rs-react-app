import { Profiler, Suspense } from 'react';
import EmissionDataContainer from './components/EmissionDataContainer';
import LoadingFallback from './components/LoadingFallback';

function App() {
  return (
    <>
      <div className="max-w-6xl m-auto">
        <Suspense
          fallback={<LoadingFallback title="Fetching emissions data" />}
        >
          <Profiler
            id="EmissionDataContainer"
            onRender={(
              id,
              phase,
              actualDuration,
              baseDuration,
              startTime,
              commitTime
            ) => {
              console.log({
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
              });
            }}
          >
            <EmissionDataContainer />
          </Profiler>
        </Suspense>
      </div>
    </>
  );
}

export default App;
