# gatsby-plugin-template

Load code with template, indent is preserved, only support Gatsby v2

## Install

`npm install --save gatsby-plugin-template`

## How to use

In your `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-template',
      options: {
        test: /\/src\/examples\/(?!index).*\.jsx?$/,
        template: `${__dirname}/example-template.js`,
        placeholder: '/*** placeholder ***/',
      },
    },
  ],
}
```

### Options

* `test` - _required_, regexp identifies which files should be transformed.
* `template` - _required_, template file path.
* `placeholder` - _required_, placeholder to be replaced.

## Example

1.  template

```javascript
import React from 'react'
import styled, { css } from 'styled-components'

/*** placeholder ***/
```

2.  code

```javascript
const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;

export default Button
`
```

3.  transformed

```javascript
import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

export default Button
```
