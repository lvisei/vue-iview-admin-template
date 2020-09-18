export const generateColumns = (columns, field, model, preview) => {
  const _columns = columns.map(column => {
    const isCustomize = column.customize
    const hasChild = column.children
    if (!isCustomize && !hasChild) return column

    if (hasChild) {
      column.children = generateColumns(column.children, field, model, preview)
    } else {
      if (preview) {
        column.render = getColumnPreviewRender(model, field, column)
      } else {
        column.render = getColumnRender(model, field, column)
      }
    }

    // delete column.customize
    return column
  })

  return _columns
}

const getColumnPreviewRender = (model, field, column) => {
  const { key, customize } = column
  const { type } = customize
  const render = (h, { row, column, index }) => {
    if (type === 'number' && row[key] === 9999999) {
      return h('p', '\\')
    } else {
      return h('span', row[key])
    }
  }

  return render
}

const getColumnRender = (model, field, column) => {
  const { key, customize } = column
  const { type, props, validate, keys } = customize
  const render = (h, { row, column, index }) => {
    let _row = model[index]
    if (type === 'number') {
      if (row[key] === 9999999) return h('p', '\\')

      return h(
        'FormItem',
        { props: { label: '', prop: `${field}.${index}.${key}`, rules: validate, labelwidth: 0 } },
        [
          h('InputNumber', {
            props: { ...props, value: row[key] },
            style: { width: '100%' },
            on: { input: val => (_row[key] = val) }
          })
        ]
      )
    } else {
      return h(
        'FormItem',
        { props: { label: '', prop: `${field}.${index}.${key}`, rules: validate, labelwidth: 0 } },
        [
          type === 'text'
            ? h('Input', {
                props: { ...props, value: row[key] },
                on: { input: val => (_row[key] = val.trim()) }
              })
            : type === 'sum-number'
            ? h('p', [
                (_row[key] = formatNumberAccuracy(
                  keys.map(key => _row[key]).reduce((a, b) => a + b)
                ))
              ])
            : type === 'subtract-number'
            ? h('p', [
                (_row[key] = formatNumberAccuracy(
                  keys.map(key => _row[key]).reduce((a, b) => a - b)
                ))
              ])
            : h('p')
        ]
      )
    }
  }

  return render
}

export const formatNumberAccuracy = (number, length = 4) => {
  return Number.isInteger(number) ? number : Number(number.toFixed(4))
}
