import translations from './translations'

function customTranslate(template, replacements) {
  replacements = replacements || {}

  // Translate
  template = translations[template] || template

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}'
  })
}

// Our custom translation module
// We need to use the array syntax that is used by bpmn-js internally
// 'value' tells bmpn-js to use the function instead of trying to instanciate it
const customTranslateModule = {
  translate: ['value', customTranslate]
}

export default customTranslateModule
