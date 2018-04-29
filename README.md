# MaterialR Snackbar

**@materialr/snackbar**

[![Build Status](https://travis-ci.org/materialr/snackbar.svg?branch=master)](https://travis-ci.org/materialr/snackbar)
[![Coverage Status](https://coveralls.io/repos/github/materialr/snackbar/badge.svg?branch=master)](https://coveralls.io/github/materialr/snackbar?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/7c84369b-cd9d-4daa-bbea-eafb8c459373/badge)](https://nodesecurity.io/orgs/materialr/projects/7c84369b-cd9d-4daa-bbea-eafb8c459373)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material snackbar implementation for React

## Installation

```sh
$ npm install --save @materialr/snackbar
```

## Demo

A full demo is available on the [MaterialR website](https://materialr.github.io/components/snackbar)
showcasing all variants.

## Components

### Default export

```js
import Snackbar from '@materialr/snackbar';
```

**Props**

| Prop                      | Type   | Required | Default   | Description                                                            |
| ------------------------- | ------ | -------- | --------- | ---------------------------------------------------------------------- |
| `actionHandler`           | func   | No       | undefined | The action handler for the action button                               |
| `actionText`              | string | No       | undefined | The text to display on the action button                               |
| `alignStart`              | bool   | No       | false     | Whether the snackbar should align to the start of the screen           |
| `className`               | string | No       | undefined | Additional classNames to add                                           |
| `multiline`               | bool   | No       | false     | Whether the message to display should be displayed over multiple lines |
| `multilineActionOnBottom` | bool   | No       | false     | Whether the action button should go below the multiline text           |
| `onHide`                  | func   | No       | undefined | An action handler for when the message hides                           |
| `onShow`                  | func   | No       | undefined | An action handler for when the message shows                           |
| `timeout`                 | number | No       | 2750      | The time before the message hides (in milliseconds)                    |
