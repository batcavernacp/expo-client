import React from 'react'
import { RelayEnvironmentProvider } from 'relay-hooks'
import { environment } from '~/environment'
import { StoreProvider } from '~/reducer'
import Router from '~/Router'
import { store } from '~/store/store'
import { setNavigation } from '~/useNavigation'
import { ErrorBoundary } from '~/ErrorBoundary'

export default function Home () {
  return (
    <ErrorBoundary>
      <RelayEnvironmentProvider environment={environment}>
        <StoreProvider store={store}>
          <Router ref={setNavigation} />
        </StoreProvider>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  )
}
