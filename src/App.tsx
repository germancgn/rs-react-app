import { Suspense } from 'react';
import EmissionDataContainer from './components/EmissionDataContainer';
import LoadingFallback from './components/LoadingFallback';

function App() {
  return (
    <>
      <div className="max-w-6xl m-auto">
        <Suspense
          fallback={<LoadingFallback title="Fetching emissions data" />}
        >
          <EmissionDataContainer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
