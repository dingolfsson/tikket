import React from 'react';
import { Route } from 'react-router-dom'

export default ({ component1: Component1, component2: Component2, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Component1 {...props} />
        : <Component2 {...props} />}
    />
  )
}